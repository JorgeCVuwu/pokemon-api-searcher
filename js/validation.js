function validatePokemonForm () {
  const form = document.getElementById('pokemon-search')
  const inputValues = form.querySelectorAll('input, select')
  let emptyFilters = true
  for (const input of inputValues) {
    if (input.value && input.type !== 'checkbox') {
      emptyFilters = false
    }
  }
  if (emptyFilters) {
    return 'Por favor, ingrese algún filtro válido'
  }
  return true
}

export { validatePokemonForm }
