function getCommonElements (list) {
  return list.reduce((acc, currentList) => {
    return Object.keys(acc).reduce((commonAcc, key) => {
      if (Object.prototype.hasOwnProperty.call(currentList, key)) {
        commonAcc[key] = acc[key]
      }
      return commonAcc
    }, {})
  }, list[0])
}

export { getCommonElements }
