import { createPokemonCard } from './components/create-response.js'

async function createSample () {
  const response = await fetch('./../mocks/ditto.json')
  const sampleJson = await response.json()
  const sampleCard = createPokemonCard(sampleJson)
  document.body.append(sampleCard)
}

createSample()
