/* eslint-disable @typescript-eslint/indent */
import { useQuery, createClient, defaultPlugins } from 'villus'

// import gqlMock from './gqlMock'       // items: gqlMock.data.cats,
import gql from 'graphql-tag'
import getAllItemsByCat from '@/gql/queries/getAllItemsByCat.gql'
import getItemsByTag from '@/gql/queries/getItemsByTag.gql'
import getItemsByCat from '@/gql/queries/getItemsByCat.gql'

import getItemsByPhrase from '@/gql/queries/getItemsByPhrase.gql'

function authPlugin({ opContext }) {
  const authToken
        = typeof window !== 'undefined' ? localStorage.authToken : null
  opContext.headers.Authorization = `Bearer ${authToken}`
}
const client = createClient({
  url: import.meta.env.VITE_GRAPHQL_ENDPOINT,
  cachePolicy: 'network-only',
  use: [authPlugin, ...defaultPlugins()],
})

const useItemsDB = () => {
  const filterItemsByCat = async(id: string, catName: string) => {
    // items by cat

    const { data } = await client.executeQuery({
      query: getItemsByCat,
      variables: {
        id,
      },
    })

    // log(error || data)

    const catItems = data.cats[0].items // currently single cat filter is supported
    const formattedItems = catItems.map((el: object) => {
      return { item: el }
    })
    const item = {
      name: catName,
      id: new Date().getTime(),
      items_cats: formattedItems,
    }

    const output = [item]
    return output
  }

  const filterItemsByTag = async(id: string, tagName: string) => {
    //  items by tag
    const { data } = await client.executeQuery({
      query: getItemsByTag,
      variables: {
        id,
      },
    })
    const tags = data.tags

    const tagItems = tags[0].items_tags // currently single tag filter is supported
    const item = {
      name: tagName,
      id: new Date().getTime(),
      items_cats: tagItems, // cat items insted of tag items to macth local obj
    }

    const output = [item]
    return output
  }
  const prepareSortQuery = (key: string) => {
    const map = {
      'date-asc': '{updated_at: asc}',
      'date-desc': '{updated_at: desc}',
      'name-asc': '{name: asc}',
      'name-desc': '{name: desc}',
    }
    const order = map[key]

    const queryString = `
              query getItemsByOrder {
              items(order_by:${order}) {
                id
                name
                slug
                updated_at
                url
                user {
                  id
                }
                items_tags {
                  tag {
                    id
                    name
                    slug
                  }
                }
              }
            }
      `

    const query = gql`
            ${queryString}
        `

    return query
  }

  const sortByOrder = async(order: string) => {
    // sort by order

    const { data } = await client.executeQuery({
      query: prepareSortQuery(order),
    })
    // TODO
    if (data) {
      const tempId = new Date().getTime()
      const items = data.items.map((el: object) => {
        return { item: el }
      })

      const item: object = {
        name: order,
        id: tempId,
        items_cats: items,
      }
      const output = [item]
      return output
    }
  }

  const sortByPhrase = async(phrase: string) => {
    // search by phrase
    if (!phrase) {
      const { data } = await useQuery({
        query: getAllItemsByCat,
      })

      itemsDB.value = data.value.cats
      isLoading.value = false
    }

    const queryName = `%${phrase}%`
    const { data } = await client.executeQuery({
      query: getItemsByPhrase,
      variables: { phrase: queryName },
    })

    const tempId = new Date().getTime()
    const items = data.items.map((el: object) => {
      return { item: el }
    })

    const item = {
      name: phrase,
      id: tempId,
      items_cats: items,
    }
    const output = [item]
    return output
  }
  const getItems = async() => {
    const { data } = await client.executeQuery({
      query: getAllItemsByCat,
    })
    const output = data.cats
    return output
    // isLoading.value = false
  }

  return {
    filterItemsByCat,
    filterItemsByTag,
    getItems,
    sortByOrder,
    sortByPhrase,
  }
}

export default useItemsDB
