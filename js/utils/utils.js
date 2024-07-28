function getCommonElements (lists) {
  return lists[0].filter(url =>
    lists.every(list => list.includes(url))
  )
}

function sortPokemonUrlsById (list) {
  return list.sort((url1, url2) => url1.split('/').at(-2) - url2.split('/').at(-2))
}

export { getCommonElements, sortPokemonUrlsById }
