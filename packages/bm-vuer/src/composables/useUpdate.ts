
export default function useUpdate() {
  const prepareDeleteItemsTagsQuery = (arr) => {

  }
  const normalizeTags = (tags) => {

  }

  const updateTaxonomyItem = async(obj, targetTx, userId) => {

  }

  const updateCollectionItem = async(obj, userId) => {

  }
  const clearCollectionItemTags = async(itemObj) => {

  }

  const updateCollectionItemTags = async(itemObj, tags) => {

  }

  // TODO
  const updateTags = async(tagsToInsert, itemObj) => {

  }

  const updateCollectionItemWithTags = async(itemObj) => {

  }

  const getUniqueTags = (tags) => {

  }

  const prepareTagsBeforeSend = async(userId, tagsToInsert) => {

  }

  const mapTagsBeforeSend = (dataTags, dataToSend) => {

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
