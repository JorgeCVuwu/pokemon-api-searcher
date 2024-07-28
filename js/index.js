import { createPokemonCard, createNotPokemonMessage } from './components/create-response.js'
import { IGNORED_TYPES } from './constants/constants.js'
import { createSelector } from './components/create-form.js'
import { getPokemonByName, getPokemonByFilters } from './controllers/fetch.js'

async function insertSelectOptions () {
  createSelector('pokemon-type-1', IGNORED_TYPES)
  createSelector('pokemon-type-2', IGNORED_TYPES)
  createSelector('pokemon-generation')
}

async function searchPokemon (event) {
  event.preventDefault()

  const responseContainer = document.getElementById('response-container')
  if (responseContainer.innerHTML !== '') {
    responseContainer.replaceChildren()
  }

  const name = document.getElementById('pokemon-name').value
  let foundedPokemon

  if (name !== '') {
    foundedPokemon = await getPokemonByName(name)
  } else {
    foundedPokemon = await getPokemonByFilters()
  }

  if (foundedPokemon.length !== 0) {
    const responsePokemonContainer = document.createElement('div')
    responsePokemonContainer.id = 'pokemon-response-container'
    responsePokemonContainer.classList.add('pokemon-response-container')
    const responsePokemonTitle = document.createElement('h2')
    responsePokemonTitle.textContent = `${foundedPokemon.length} results found`
    responseContainer.append(responsePokemonTitle)
    for (const pokemon of foundedPokemon) {
      responsePokemonContainer.append(createPokemonCard(pokemon))
    }
    responseContainer.append(responsePokemonContainer)
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

function handleClick (event) {
  console.log('xd')
  const target = event.target
  const pokemonAudioButton = target.closest('.pokemon-audio-button')
  if (!pokemonAudioButton) return

  const pokemonAudio = pokemonAudioButton.nextElementSibling
  console.log('play')
  pokemonAudio.play()
}

document.addEventListener('click', handleClick)
document.addEventListener('input', blockOtherInputs)
document.addEventListener('submit', searchPokemon)
