
import useUtils from '@/composables/useUtils'
import addTags from '@/gql/queries/addTags.gql'
import updateItemAndIgnoreTags from '@/gql/queries/updateItemAndIgnoreTags.gql'
import updateItemWithTags from '@/gql/queries/updateItemWithTags.gql'
import getTagsByUserId from '@/gql/queries/getTagsByUserId.gql'
import updateCat from '@/gql/queries/updateCat.gql'
import updateTag from '@/gql/queries/updateTag.gql'
import gql from 'graphql-tag'
import {  createClient, defaultPlugins } from 'villus'

function authPlugin({ opContext }) {
  const authToken = typeof window !== 'undefined' ? localStorage.authToken : null
  opContext.headers.Authorization = `Bearer ${authToken}`
}
const client = createClient({
  url: import.meta.env.VITE_GRAPHQL_ENDPOINT,
  cachePolicy: 'network-only',
  use: [authPlugin, ...defaultPlugins()],
})

const {
  log,
  slugify,
  genUuidv4,
} = useUtils()
export default function useUpdate() {
  const prepareDeleteItemsTagsQuery = (arr) => {
    const queryString = `mutation DeleteTags{delete_items_tags(where: {itemId:{_in: 
          ${JSON.stringify(arr)}}}) {affected_rows returning { tagId}}}`

    const query = gql`
          ${queryString}
        `

    return query
  }
  const normalizeTags = (tags) => {
    typeof tags === 'object'
      ? (tags = JSON.parse(JSON.stringify(tags)))
      : (tags = tags.trim().split(','))
    return tags.filter(n => n) // remove empty strings
  }

  // add or updatete teampny item
  const updateTaxonomyItem = async(obj, targetTx, userId) => {
    const name = obj.name
    const slug = slugify(name)
    const id = obj.id ? obj.id.trim() : genUuidv4()
    const user_id = userId

    const dataInput = {
      id,
      name,
      slug,
      user_id,

    }

    const { data, error } = await client
      .executeMutation({
        query: targetTx === 'cat' ? updateCat : updateTag,
        variables: { ...dataInput },
      })

    log(error || data)
    return error ? false : data
  }

  const updateCollectionItem = async(obj, userId) => {
    let tags = !obj.tags ? [] : obj.tags
    tags = normalizeTags(tags)
    const user_id = userId
    const itemObj = {
      itemId: obj.itemId,

      user_id,
      url: obj.url,
      slug: slugify(obj.name),
      name: obj.name,
      desc: obj.desc,
      catId: obj.catId,
    }

    const { data, error } = await client
      .executeMutation({
        query: updateItemAndIgnoreTags,
        variables: itemObj,
      })

    log(error || data)

    await clearCollectionItemTags(itemObj)

    if (tags.length > 0)
      await updateCollectionItemTags(itemObj, tags)

    return error ? false : data
  }
  const clearCollectionItemTags = async(itemObj) => {
    const itemsIds = [itemObj.itemId]

    const DELETE_BOOKMARKS_TAGS = prepareDeleteItemsTagsQuery(itemsIds)
    const { data, error } = await client
      .executeMutation({
        query: DELETE_BOOKMARKS_TAGS,

      })

    log(error || data)
    return error || data
  }

  const updateCollectionItemTags = async(itemObj, tags) => {
    const { userId } = itemObj
    const tagsToInsert = tags.map((el) => {
      return {
        name: el,
        slug: slugify(el),
        user_id: userId,

      }
    })

    const updatedData = await prepareTagsBeforeSend(
      userId,
      tagsToInsert,
    )

    const updatedItemObj = await updateTags(updatedData, itemObj)
    return await updateCollectionItemWithTags(updatedItemObj)
  }


  const updateTags = async(tagsToInsert, itemObj) => {
    const { data, error } = await client
      .executeMutation({
        query: addTags,
        variables: {
          objects: tagsToInsert,
        },
      })

    if (error) {
      log(error)
      return false
    }
    const tagsItemsMap = await data.insert_tags.returning.map((item) => {
      return {
        itemId: itemObj.itemId,
        tagId: item.Id,
      }
    })
    itemObj.tags = tagsItemsMap
    return itemObj
  }

  const updateCollectionItemWithTags = async(itemObj) => {
    const { data, error } = await client
      .executeMutation({
        query: updateItemWithTags,
        variables: itemObj,
      })

    log(error || data)
    return error ? false : data
  }

  const getUniqueTags = (tags) => {
    return tags.filter(
      (item, index, self) =>
        index === self.findIndex(elem => elem.slug === item.slug),
    )
  }

  const prepareTagsBeforeSend = async(userId, tagsToInsert) => {
    // only unique tag slugs
    const uniqueSlugsItemsArr = getUniqueTags(tagsToInsert)
    const slugsArr = uniqueSlugsItemsArr.map(item => item.slug)


    const { data, error } = await client
      .executeQuery({
        query: getTagsByUserId,
        variables: {
          userId,
          objects: [...slugsArr],
        },

      })

    if (error) {
      log(error)
      return false
    }

    const updatedData = uniqueSlugsItemsArr

    return data.tags.length
      ? mapTagsBeforeSend(data.tags, uniqueSlugsItemsArr, updatedData)
      : uniqueSlugsItemsArr.map(item => ({
        ...item,
        Id: genUuidv4(),
      }))
  }

  const mapTagsBeforeSend = (dataTags, dataToSend) => {
    const res = dataTags.filter(n => dataToSend.some(n2 => n.slug == n2.slug))

    // convert array of Objects into one Object
    const responseObj = Object.assign(
      {},
      ...res.map(item => ({ [item.slug]: item })),
    )

    return dataToSend.map(item => ({
      ...item,
      Id: responseObj[item.slug] ? responseObj[item.slug].Id : genUuidv4(),
    }))
  }

  return {
    prepareDeleteItemsTagsQuery,
    normalizeTags,
    updateTaxonomyItem,
    updateCollectionItem,
    clearCollectionItemTags,
    updateCollectionItemTags,
    updateTags,
    updateCollectionItemWithTags,
    getUniqueTags,
    prepareTagsBeforeSend,
    mapTagsBeforeSend,

  }
}
