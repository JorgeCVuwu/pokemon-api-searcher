import { createPokemonCard } from './components/create-response.js'

async function createSample () {
  const response = await fetch('./../mocks/ditto.json')
  const sampleJson = await response.json()
  const sampleCard = createPokemonCard(sampleJson)
  document.body.append(sampleCard)
}

function handleClick (event) {
  const target = event.target
  const pokemonAudioButton = target.closest('.pokemon-audio-button')
  if (!pokemonAudioButton) return

  const pokemonAudio = pokemonAudioButton.nextElementSibling
  pokemonAudio.play()
}

createSample()
document.addEventListener('click', handleClick)
