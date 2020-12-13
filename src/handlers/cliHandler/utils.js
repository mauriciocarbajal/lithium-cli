const printEmptyLines = (lines, ch = ' ') => {
  for(let i = 0; i < lines; i = i + 1) {
    console.log(`${ch}${ch}${ch}${ch}${ch}`)
  }
}

const getNoteName = (note) => {
  const i = (note < 0)
    ? note + 12
    : (note > 18) ? (note % 12) : note;
  return ({
    0: '1',
    1: 'b2',
    2: '2',
    3: '3m',
    4: '3',
    5: '4',
    6: '#4',
    7: '5',
    8: 'b6',
    9: '6',
    10: '7',
    11: '7M',
    12: '8',
    13: 'b9',
    14: '9',
    15: '#9',
    16: '10',
    17: '11',
    18: '#11',
  })[i];
}

module.exports = { printEmptyLines, getNoteName };