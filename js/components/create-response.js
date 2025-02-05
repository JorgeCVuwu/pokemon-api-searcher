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
  const typesArray = pokemonJson.types
  const typeContainer = document.createElement('div')
  typeContainer.classList.add('pokemon-type-container')
  for (const type of typesArray) {
    const typeImg = document.createElement('img')
    typeImg.classList.add('pokemon-type-img')
    const typeId = type.type.url.split('/').at(-2) // la id del tipo se encuentra dentro de la url del tipo (se evita hacer una busqueda adicional)
    typeImg.src = `../../media/types/sword-shield/${typeId}.png`
    typeContainer.append(typeImg)
  }

  pokemonDiv.append(typeContainer)
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

function createChargingGif () {
  const chargingGif = document.createElement('img')
  chargingGif.className = 'charging-gif'
  chargingGif.src = '../media/gifs/charging.gif'
  return chargingGif
}

export { createPokemonCard, createNotPokemonMessage, createChargingGif }
