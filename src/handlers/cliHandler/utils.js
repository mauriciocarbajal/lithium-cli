const printEmptyLines = (lines, ch = ' ') => {
  for(let i = 0; i < lines; i = i + 1) {
    console.log(`${ch}${ch}${ch}${ch}${ch}`)
  }
}

module.exports = { printEmptyLines };