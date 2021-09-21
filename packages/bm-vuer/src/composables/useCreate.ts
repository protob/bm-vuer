
import useUtils from '@/composables/useUtils'
import addCat from '@/gql/queries/addCat.gql'
import addTag from '@/gql/queries/addTag.gql'
import addTags from '@/gql/queries/addTags.gql'

import { createClient, defaultPlugins } from 'villus'
import addItem from '@/gql/queries/addItem.gql'

function authPlugin({ opContext }) {
  const authToken = typeof window !== 'undefined' ? localStorage.authToken : null
  opContext.headers.Authorization = `Bearer ${authToken}`
}
const client = createClient({
  url: import.meta.env.VITE_GRAPHQL_ENDPOINT,
  cachePolicy: 'network-only',
  use: [authPlugin, ...defaultPlugins()],
})

// TODO IMPLEMENT AUTH

const userId = 'd506f8b6-c837-4c44-8fa5-c1b6de0e3d71'

const apollo = () => { return {} }
const {
  log,
  slugify,
  genUuidv4,

} = useUtils()
export default function useCreate() {
  const normalizeTags = (tags) => {
    if (typeof tags === 'object')
      tags = JSON.parse(JSON.stringify(tags))
    else
      tags = tags.trim().split(',')
    return tags.filter(n => n) // remove empty strings
  }

  // ADD
  // add or updatete teampny item
  const addTaxonomyItem = async(obj, targetTx) => {
    const name = obj.name
    const slug = slugify(name)

    const dataInput = {

      name,
      slug,
      user_id: userId,
    }

    const { data, error } = await client
      .executeMutation({
        query: targetTx === 'cat' ? addCat : addTag,
        variables: { ...dataInput },
      })

    log(error || data)
    return error ? false : data
  }

  const insertTagsBeforeCollectionItem = async(itemObj) => {
    // preparetags

    const tagsToInsert = itemObj.tags.map((el) => {
      return {
        name: el,
        slug: slugify(el),
        user_id: itemObj.user_id,
      }
    })

    return await insertTags(tagsToInsert, itemObj)
  }

  const insertCollectionItem = async(itemObj) => {
    const { data, error } = await client
      .executeMutation({
        query: addItem,
        variables: itemObj,
      })

    log(error || data)

    return error ? false : data
  }

  const addCollectionItemAndMaybeTags = async(obj, user_id) => {
    let tags = !obj.tags ? [] : obj.tags
    tags = normalizeTags(tags)
    const itemObj = {
      id: genUuidv4(),
      user_id,
      url: obj.url,
      slug: slugify(obj.name),
      name: obj.name,
      desc: obj.desc,
      cat_id: obj.cat_id,
      tags,
    }

    const itemObjToInsert
            = tags.length > 0
              ? await insertTagsBeforeCollectionItem(itemObj)
              : itemObj

    return await insertCollectionItem(itemObjToInsert)
  }

  // INSERT
  const insertTags = async(tagsToInsert, itemObj) => {
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
        item_id: itemObj.id,
        tag_id: item.id,
      }
    })
    itemObj.tags = tagsItemsMap
    return itemObj
  }

  return { normalizeTags, addTaxonomyItem, insertTagsBeforeCollectionItem, addCollectionItemAndMaybeTags, insertTags, insertCollectionItem }
}
