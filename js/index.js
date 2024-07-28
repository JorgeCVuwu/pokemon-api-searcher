import { createPokemonCard, createNotPokemonMessage } from './components/create-response.js'
import { IGNORED_TYPES } from './constants/constants.js'
import { createSelector } from './components/create-form.js'
import { getPokemonByName, getPokemonByFilters, getIndexedPokemon } from './controllers/fetch.js'

// global variables
// let pokemonFounded
const searchedPokemonNumber = 20
let searchedIndex
let sortedPokemonArray

function createExpandButton () {
  const expandPokemonSearchButton = document.createElement('button')
  expandPokemonSearchButton.textContent = 'Expand search'
  expandPokemonSearchButton.id = 'expand-pokemon-search'
  expandPokemonSearchButton.classList.add('expand-search-button')
  return expandPokemonSearchButton
}

async function insertSelectOptions () {
  createSelector('pokemon-type-1', IGNORED_TYPES)
  createSelector('pokemon-type-2', IGNORED_TYPES)
  createSelector('pokemon-generation')
}

async function searchPokemon (event) {
  event.preventDefault()

  searchedIndex = searchedPokemonNumber
  sortedPokemonArray = []
  const responseContainer = document.getElementById('response-container')
  responseContainer.classList.add('response-container')
  if (responseContainer.innerHTML !== '') {
    responseContainer.replaceChildren()
  }

  const name = document.getElementById('pokemon-name').value
  let foundedPokemon

  if (name !== '') {
    foundedPokemon = await getPokemonByName(name)
  } else {
    ({ foundedPokemon, sortedPokemonArray } = await getPokemonByFilters(searchedPokemonNumber))
  }

  if (foundedPokemon.length !== 0) {
    const responsePokemonContainer = document.createElement('div')
    responsePokemonContainer.id = 'pokemon-response-container'
    responsePokemonContainer.classList.add('pokemon-response-container')
    const responsePokemonTitle = document.createElement('h2')
    responsePokemonTitle.textContent = `${sortedPokemonArray.length} results found`
    responseContainer.append(responsePokemonTitle)
    for (const pokemon of foundedPokemon) {
      responsePokemonContainer.append(createPokemonCard(pokemon))
    }
    responseContainer.append(responsePokemonContainer)

    if (sortedPokemonArray && sortedPokemonArray.length > searchedPokemonNumber) {
      const expandPokemonSearchButton = createExpandButton()
      responseContainer.append(expandPokemonSearchButton)
    }
  } else {
    responseContainer.append(createNotPokemonMessage())
  }
}

function blockOtherInputs (event) {
  const target = event.target
  if (target.id !== 'pokemon-name') return

  const form = document.getElementById('pokemon-search')
  const name = document.getElementById('pokemon-name').value

  const notBlockedElements = ['pokemon-name', 'pokemon-submit']

  for (const inputs of form.elements) {
    if (!notBlockedElements.includes(inputs.id)) {
      // Para hacer esto más eficiente, se puede guardar el input anterior, y ejecutar esto solo si antes no era ''
      inputs.disabled = name !== ''
      inputs.value = ''
    }
  }
}

insertSelectOptions()

async function handleClick (event) {
  const target = event.target
  const pokemonAudioButton = target.closest('.pokemon-audio-button')
  if (pokemonAudioButton) {
    const pokemonAudio = pokemonAudioButton.nextElementSibling
    pokemonAudio.play()
    return
  }

  if (target.id === 'expand-pokemon-search') {
    const responsePokemonContainer = document.getElementById('pokemon-response-container')
    target.remove()
    const pokemonList = await getIndexedPokemon(sortedPokemonArray, searchedIndex, searchedPokemonNumber)
    for (const pokemon of pokemonList) {
      responsePokemonContainer.append(createPokemonCard(pokemon))
    }
    searchedIndex += 20
    if (sortedPokemonArray && sortedPokemonArray.length > searchedIndex) {
      const expandPokemonSearchButton = createExpandButton()
      const responseContainer = document.getElementById('response-container')
      responseContainer.append(expandPokemonSearchButton)
    } else {
      searchedIndex = 0
    }
  }
}

document.addEventListener('click', handleClick)
document.addEventListener('input', blockOtherInputs)
document.addEventListener('submit', searchPokemon)
