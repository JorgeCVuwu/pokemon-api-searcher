const POKEAPI_PREFIX = 'https://pokeapi.co/api/v2/'
const IGNORED_TYPES = ['stellar', 'unknown']

const POKEMON_LIST_KEY_IN_PROPERTY = { type: 'pokemon', ability: 'pokemon', move: 'learned_by_pokemon' }
const POKEMON_KEY_IN_PROPERTY = { type: 'pokemon', ability: 'pokemon' }

export { POKEAPI_PREFIX, IGNORED_TYPES, POKEMON_LIST_KEY_IN_PROPERTY, POKEMON_KEY_IN_PROPERTY }
