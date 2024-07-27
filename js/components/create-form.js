import { POKEAPI_PREFIX } from '../constants/constants.js'
import { fetchData } from '../controllers/fetch.js'

async function createSelector (id, filterArray) {
  const typeSelector = document.getElementById(id)
  const type = typeSelector.name // el name de un campo siempre será el tipo de dato al que se refiere en la API (convención)

  const fetchUrl = `${POKEAPI_PREFIX}/${type}`
  const typeJson = await fetchData(fetchUrl)

  const defaultOption = new Option(`Select ${type}...`, '', true, true)
  // defaultOption.disabled = true
  typeSelector.append(defaultOption)

  for (let i = 0; i < typeJson.results.length; i++) {
    const typeObject = typeJson.results[i]
    const typeName = typeObject.name
    if (!filterArray || !filterArray.includes(typeName)) {
      const typeOption = new Option(typeName, i + 1)
      typeSelector.append(typeOption)
    }
  }

  return typeSelector
}

export { createSelector }
