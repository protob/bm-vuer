
import useUtils from '@/composables/useUtils'
import { toRaw } from 'vue'
import gql from 'graphql-tag'
import deleteItem from '@/gql/queries/delItem.gql'
import deleteCat from '@/gql/queries/delCats.gql'
import deleteTag from '@/gql/queries/delTags.gql'
import getItemsByCat from '@/gql/queries/getItemsByCat.gql'
import { useQuery, createClient, defaultPlugins } from 'villus'
const {
  log,

} = useUtils()

function authPlugin({ opContext }) {
  const authToken = typeof window !== 'undefined' ? localStorage.authToken : null
  opContext.headers.Authorization = `Bearer ${authToken}`
}
const client = createClient({
  url: import.meta.env.VITE_GRAPHQL_ENDPOINT,
  cachePolicy: 'network-only',
  use: [authPlugin, ...defaultPlugins()],
})

export default function useDelete() {
  const prepareDeleteItemsTagsQuery = (arr) => {
    const queryString = `mutation DeleteTags{delete_items_tags(where: {item_id:{_in: 
      ${JSON.stringify(arr)}}}) {affected_rows returning { tag_id}}}`

    const query = gql`
          ${queryString}
        `

    return query
  }
  const generateItemTagMap = async(itemData) => {
    const itemDataRaw = toRaw(itemData)
    const id = itemDataRaw.targetId
    const { data, error } = await client
      .executeQuery({
        query: getItemsByCat,
        variables: {
          id,
        },
      })
    if (error) {
      log(error)
      return false
    }

    // currently single cat filter is supported
    const tempItem = {
      name: itemDataRaw.name,
      items_cats: data.cats[0].items.map((el) => {
        return { item: el }
      }),
    }

    const ItemTagMapObj = {}
    tempItem.items_cats.forEach((item) => {
      const tags = item.item.items_tags
      if (tags) {
        ItemTagMapObj[item.item.id] = tags.map((el) => {
          return {
            id: el.tag.id,
          }
        })
      }
    })

    return ItemTagMapObj
  }
  // - CATEGORY
  const deleteCatWithAllItems = async(itemData) => {
    const ItemTagMapObj = await generateItemTagMap(itemData)
    return deleteCatItems(ItemTagMapObj, itemData)
  }

  const deleteCatTagsAndCat = async(itemData, itemsIds) => {
    const DELETE_BOOKMARKS_TAGS = prepareDeleteItemsTagsQuery(itemsIds)
    // it removes only mapping from item_tags table not tag itself
    const { data, error } = await client
      .executeMutation({
        query: DELETE_BOOKMARKS_TAGS,
      })

    log(error || data)
    return error || deleteSingleCat(itemData)
  }
  const deleteSingleCat = async(itemData) => {
    const id = itemData.targetId
    const { data, error } = await client
      .executeMutation({
        query: deleteCat,
        variables: {
          id,
        },
      })

    // TODO replace apollo  refetchQueries: ['getCats', 'getAllItemsByCat'],

    log(error || data)
    return data
  }
  const deleteCatItems = async(txItemTagsMap, itemData) => {
    const itemsIds = Object.keys(txItemTagsMap)
    const itemsIdsVals = Object.values(txItemTagsMap)
    const totalTagInCatLength = itemsIdsVals.map(el => el.length).reduce((a, b) => a + b, 0)

    return !totalTagInCatLength // if not have tags
      ? await deleteSingleCat(itemData)
      : await deleteCatTagsAndCat(itemData, itemsIds) // if have tahs
  }

  const deleteSingleTag = async(id) => {
    const { data, error } = await client.executeMutation({
      query: deleteTag,
      variables: {
        id,
      },
    })

    log(error || data)
    return data
  }
  const deleteSingleItem = async(id) => {
    const { data, error } = await client.executeMutation({
      query: deleteItem,
      variables: {
        id,
      },
    })

    log(error || data)

    return data
  }

  return { prepareDeleteItemsTagsQuery, generateItemTagMap, deleteCatWithAllItems, deleteCatTagsAndCat, deleteCatItems, deleteSingleCat, deleteSingleTag, deleteSingleItem, deleteItem }
}
