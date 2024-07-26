import { createPokemonCard, createNotPokemonMessage } from './components/create-response.js'
import { IGNORED_TYPES } from './constants/constants.js'
import { createSelector } from './components/create-form.js'
import { getPokemonByName, getPokemonByFilters } from './controllers/fetch.js'

async function createForm () {
  await createSelector('type', IGNORED_TYPES)
}

async function searchPokemon (event) {
  event.preventDefault()

  const responseContainer = document.getElementById('pokemon-response-container')
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
    for (const pokemon of foundedPokemon) {
      responseContainer.append(createPokemonCard(pokemon))
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

  for (const inputs of form.elements) {
    const notBlockedElements = ['pokemon-name', 'pokemon-submit']
    if (!notBlockedElements.includes(inputs.id)) {
      // Para hacer esto más eficiente, se puede guardar el input anterior, y ejecutar esto solo si antes no era ''
      inputs.disabled = name !== ''
      inputs.value = ''
    }
  }
}

createForm()

document.addEventListener('input', blockOtherInputs)
document.addEventListener('submit', searchPokemon)
