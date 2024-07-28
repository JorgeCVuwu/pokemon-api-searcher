function toPascalCaseWithSpaces (str) {
  return str
    .toLowerCase()
    .split('-')
    .map(part => part.charAt(0).toUpperCase() + part.slice(1))
    .join(' ')
}

function appendPokemonName (pokemonJson, pokemonDiv) {
  const pokemonName = document.createElement('p')
  pokemonName.classList.add('pokemon-name')
  pokemonName.textContent = toPascalCaseWithSpaces(pokemonJson.name)

  pokemonDiv.append(pokemonName)
}

function appendPokemonImg (pokemonJson, pokemonDiv) {
  const pokemonImg = document.createElement('img')
  pokemonImg.classList.add('pokemon-img')
  pokemonImg.src = pokemonJson?.sprites?.front_default ?? ''

  pokemonDiv.append(pokemonImg)
}

function appendPokemonDexNumber (pokemonJson, pokemonDiv) {
  const pokemonDexNumber = document.createElement('p')
  pokemonDexNumber.classList.add('pokemon-dex-number')
  const dexNumber = pokemonJson.id
  pokemonDexNumber.textContent = `#${dexNumber}`

  pokemonDiv.append(pokemonDexNumber)
}

function appendPokemonTypes (pokemonJson, pokemonDiv) {
  const pokemonTypes = document.createElement('p')
  pokemonTypes.classList.add('pokemon-types')
  const typesArray = pokemonJson.types
  if (typesArray) {
    const typesToText = typesArray.map(type => type.type.name).join(', ')
    pokemonTypes.textContent = `Types: ${typesToText}`
  }

  pokemonDiv.append(pokemonTypes)
}

function appendPokemonCry (pokemonJson, pokemonDiv) {
  const pokemonAudioContainer = document.createElement('div')
  const audioIcon = document.createElement('img')
  const audioButton = document.createElement('button')

  audioIcon.src = '../../media/speaker_icon.svg'
  audioIcon.classList.add('audio-icon')
  audioButton.classList.add('pokemon-audio-button')

  const audio = document.createElement('audio')
  audio.src = pokemonJson.cries.latest

  audioButton.append(audioIcon)
  pokemonAudioContainer.append(audioButton)
  pokemonAudioContainer.append(audio)

  pokemonDiv.append(pokemonAudioContainer)
}

function createPokemonCard (pokemonJson) {
  const pokemonDiv = document.createElement('div')
  pokemonDiv.id = 'pokemon-card'
  pokemonDiv.classList.add('pokemon-card')

  appendPokemonName(pokemonJson, pokemonDiv)
  appendPokemonCry(pokemonJson, pokemonDiv)
  appendPokemonDexNumber(pokemonJson, pokemonDiv)
  appendPokemonImg(pokemonJson, pokemonDiv)
  appendPokemonTypes(pokemonJson, pokemonDiv)

  return pokemonDiv
}

function createNotPokemonMessage () {
  const errorMessage = document.createElement('p')
  errorMessage.classList.add('no-pokemon-found')
  errorMessage.textContent = 'No se pudo encontrar el Pokémon solicitado.'
  return errorMessage
}

export { createPokemonCard, createNotPokemonMessage }
