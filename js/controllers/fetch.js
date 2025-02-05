import { POKEAPI_PREFIX, POKEMON_KEY_IN_PROPERTY, POKEMON_LIST_KEY_IN_PROPERTY } from '../constants/constants.js'
import { getCommonElements, sortPokemonUrlsById } from '../utils/utils.js'

function pushFilteringSpecialForms (pokemonList, url) {
  const considerSpecialForms = document.getElementById('check-pokemon-forms').checked
  const urlId = url.split('/').at(-2)
  // PokemonAPI convention: id > 10000 => pokemon special form
  if (considerSpecialForms || urlId < 10000) {
    pokemonList.push(url)
  }
}

async function fetchData (fetchUrl) {
  try {
    const response = await fetch(fetchUrl.toString())
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

async function getIndexedPokemon (sortedPokemonArray, searchedIndex, searchedPokemonNumber) {
  const pokemonList = []
  for (const pokemonUrl of sortedPokemonArray.slice(searchedIndex, searchedIndex + searchedPokemonNumber)) {
    const pokemonJson = await fetchData(pokemonUrl)
    pokemonList.push(pokemonJson)
  }
  return pokemonList
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

  const foundedSpecies = []
  if (speciesJson) {
    for (const species of speciesJson.varieties) {
      foundedSpecies.push(species.pokemon.url)
    }
  }
  return foundedSpecies
}

async function getPokemonByFilters (searchedNumber) {
  const foundedPokemon = []
  const form = document.getElementById('pokemon-search')
  const inputs = form.querySelectorAll('input, select')

  const notFetchedInputs = ['check-pokemon-forms']

  let allFetchedPokemon = []

  for (const input of inputs) {
    if (input.value !== '' && !notFetchedInputs.includes(input.id)) {
      const fetchUrl = `${POKEAPI_PREFIX}${input.name}/${input.value}`
      const filterResponse = await fetchData(fetchUrl)
      if (filterResponse) {
        const pokemonList = []
        const responseType = filterResponse[POKEMON_LIST_KEY_IN_PROPERTY[input.name]]
        for (const pokemon of responseType) {
          const pokemonData = pokemon?.[POKEMON_KEY_IN_PROPERTY?.[input.name]] ?? pokemon

          let pokemonUrl = [pokemonData.url]
          if (pokemonData.url.includes('pokemon-species/')) {
            pokemonUrl = await getPokemonSpeciesForms(pokemonData.url)
          }
          for (const url of pokemonUrl) {
            pushFilteringSpecialForms(pokemonList, url)
          }
        }
        allFetchedPokemon.push(pokemonList)
      } else {
        allFetchedPokemon = []
        break
      }
    }
  }

  const obtainedPokemonObj = getCommonElements(allFetchedPokemon)
  const sortedPokemonArray = sortPokemonUrlsById(obtainedPokemonObj)
  if (sortedPokemonArray) {
    for (let i = 0; i < Math.min(searchedNumber, sortedPokemonArray.length); i++) {
      const pokemonUrl = sortedPokemonArray[i]
      const pokemonJson = await fetchData(pokemonUrl)
      if (pokemonJson) {
        foundedPokemon.push(pokemonJson)
      }
    }
  }

  return { foundedPokemon, sortedPokemonArray }
}

export { fetchData, getPokemonByName, getPokemonByFilters, getIndexedPokemon }
