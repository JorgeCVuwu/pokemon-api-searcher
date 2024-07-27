function toPascalCaseWithSpaces (str) {
  return str
    .toLowerCase()
    .split('-')
    .map(part => part.charAt(0).toUpperCase() + part.slice(1))
    .join(' ')
}

function createPokemonCard (pokemonJson) {
  const pokemonDiv = document.createElement('div')
  pokemonDiv.id = 'pokemon-card'
  pokemonDiv.classList.add('pokemon-card')

  const pokemonName = document.createElement('p')
  pokemonName.classList.add('pokemon-name')
  pokemonName.textContent = toPascalCaseWithSpaces(pokemonJson.name)

  const pokemonDexNumber = document.createElement('p')
  pokemonDexNumber.classList.add('pokemon-dex-number')
  const dexNumber = pokemonJson.id
  pokemonDexNumber.textContent = `#${dexNumber}`

  const pokemonImg = document.createElement('img')
  pokemonImg.classList.add('pokemon-img')
  pokemonImg.src = pokemonJson?.sprites?.front_default ?? ''

  const pokemonTypes = document.createElement('p')
  pokemonImg.classList.add('pokemon-types')
  const typesArray = pokemonJson.types
  if (typesArray) {
    const typesToText = typesArray.map(type => type.type.name).join(', ')
    pokemonTypes.textContent = `Types: ${typesToText}`
  }

  pokemonDiv.append(pokemonName, pokemonDexNumber, pokemonImg, pokemonTypes)

  return pokemonDiv
}

function createNotPokemonMessage () {
  const errorMessage = document.createElement('p')
  errorMessage.classList.add('no-pokemon-found')
  errorMessage.textContent = 'No se pudo encontrar el Pokémon solicitado.'
  return errorMessage
}

export { createPokemonCard, createNotPokemonMessage }
