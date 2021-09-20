
import { useQuery, createClient, defaultPlugins } from 'villus'

import getCats from '@/gql/queries/getCats.gql'
import getTags from '@/gql/queries/getTags.gql'
import gql from 'graphql-tag'

function authPlugin({ opContext }) {
  const authToken = typeof window !== 'undefined' ? localStorage.authToken : null
  opContext.headers.Authorization = `Bearer ${authToken}`
}

const client = createClient({
  url: import.meta.env.VITE_GRAPHQL_ENDPOINT,
  cachePolicy: 'network-only',
  use: [authPlugin, ...defaultPlugins()],
})

const useTaxonomies = () => {
  const getAllCats = async() => {
    const { data } = await client
      .executeQuery({
        query: getCats,
      })
    return data.cats
  }

  const getAllTags = async() => {
    const { data } = await client
      .executeQuery({
        query: getTags,
      })

    return data.tags
  }

  return {
    getAllTags,
    getAllCats,

  }
}

export default useTaxonomies
