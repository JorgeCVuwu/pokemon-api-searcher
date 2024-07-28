import { POKEAPI_PREFIX, POKEMON_KEY_IN_PROPERTY, POKEMON_LIST_KEY_IN_PROPERTY } from '../constants/constants.js'
import { getCommonElements } from '../utils/utils.js'

async function fetchData (fetchUrl) {
  try {
    const response = await fetch(fetchUrl)
    if (!response.ok) {
      throw new Error(`Error! status: ${response.status} ${fetchUrl}`)
    }
    const pokemonJson = await response.json() // bug con malamar al buscar por id (687), json invalido
    return pokemonJson
  } catch (error) {
    console.error('Fetch error: ', error, 'searching', fetchUrl)
    return false
  }
}

async function getPokemonByName (name) {
  const foundedPokemon = []
  const fetchUrl = `${POKEAPI_PREFIX}pokemon/${name.toLowerCase()}`
  const response = await fetchData(fetchUrl)
  if (response) {
    foundedPokemon.push(response)
  }
  return foundedPokemon
}

async function getPokemonSpeciesForms (fetchUrl) {
  const speciesJson = await fetchData(fetchUrl)

  const foundedSpecies = {}
  for (const species of speciesJson.varieties) {
    foundedSpecies[species.pokemon.name] = species.pokemon.url
  }

  return foundedSpecies
}

async function getPokemonByFilters () {
  const foundedPokemon = []
  const form = document.getElementById('pokemon-search')
  const inputs = form.querySelectorAll('input, select')

  const notFetchedInputs = ['check-pokemon-forms']

  const allFetchedPokemon = []

  for (const input of inputs) {
    if (input.value !== '' && !notFetchedInputs.includes(input.id)) {
      const fetchUrl = `${POKEAPI_PREFIX}${input.name}/${input.value}`
      const filterResponse = await fetchData(fetchUrl)
      if (filterResponse) {
        const pokemonList = {}
        const responseType = filterResponse[POKEMON_LIST_KEY_IN_PROPERTY[input.name]]
        for (const pokemon of responseType) {
          const pokemonData = pokemon?.[POKEMON_KEY_IN_PROPERTY?.[input.name]] ?? pokemon

          const pokemonUrl = pokemonData.url
          let pokemonUrlAssignment = { [pokemonData.name]: pokemonUrl }
          if (pokemonUrl.includes('pokemon-species/')) {
            pokemonUrlAssignment = await getPokemonSpeciesForms(pokemonUrl)
          }
          Object.assign(pokemonList, pokemonUrlAssignment)
        }
        allFetchedPokemon.push(pokemonList)
      }
    }
  }

  const obtainedPokemonObj = getCommonElements(allFetchedPokemon)
  if (obtainedPokemonObj) {
    for (const key in obtainedPokemonObj) {
      const pokemonUrl = obtainedPokemonObj[key]
      const pokemonJson = await fetchData(pokemonUrl)
      const considerSpecialForms = document.getElementById('check-pokemon-forms').checked
      if (pokemonJson && (pokemonJson.is_default || considerSpecialForms)) {
        foundedPokemon.push(pokemonJson)
      }
    }
  }
  return foundedPokemon
}

export { fetchData, getPokemonByName, getPokemonByFilters }
