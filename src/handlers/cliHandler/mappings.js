const numbers = {
  '1': { grade: 1 },
  '2': { grade: 2 },
  '3': { grade: 3 },
  '4': { grade: 4 },
  '5': { grade: 5 },
  '6': { grade: 6 },
  '7': { grade: 7 },
  '8': { grade: 1 },
}

const modNumbers = {
  '!': { grade: 1, secDom: true },
  '@': { grade: 2, secDom: true },
  '#': { grade: 3, secDom: true },
  '$': { grade: 4, secDom: true },
  '%': { grade: 5, secDom: true },
  '^': { grade: 6, secDom: true },
  '&': { grade: 7 },
  '*': { grade: 1, secDom: true },
}

const secondRow = {
  'q': { grade: 1, subMin: true },
  'w': { grade: 2, subMin: true },
  'e': { grade: 3, subMin: true },
  'r': { grade: 4, subMin: true },
  't': { grade: 5, subMin: true },
  'y': { grade: 6, subMin: true },
  'u': { grade: 7, subMin: true },
  'i': { grade: 1, subMin: true },
}

const modSecondRow = {
  'Q': { grade: 1, secDom: true, subMin: true },
  'W': { grade: 2, secDom: true, subMin: true },
  'E': { grade: 3, secDom: true, subMin: true },
  'R': { grade: 4, secDom: true, subMin: true },
  'T': { grade: 5, secDom: true, subMin: true },
  'Y': { grade: 6, secDom: true, subMin: true },
  'U': { grade: 7, subMin: true },
  'I': { grade: 1, secDom: true, subMin: true },
}

const singleNotes = {
  'z': { note: 1 },
  's': { note: 2 },
  'x': { note: 3 },
  'c': { note: 4 },
  'f': { note: 5 },
  'v': { note: 6 },
  'g': { note: 7 },
  'b': { note: 8 },
  'n': { note: 9 },
  'j': { note: 10 },
  'm': { note: 11 },
  'k': { note: 12 },
  ',': { note: 13 },
  'l': { note: 14 },
  '.': { note: 15 },
  '/': { note: 16 },
}

const extraActions = {
  '\\': { mute: true },
  'o': { semitone: -1 },
  'p': { semitone: 1 },
  '0': { release: true },
  'space': { release: true },
}

const mapping = {
  ...numbers,
  ...modNumbers,
  ...secondRow,
  ...modSecondRow,
  ...singleNotes,
  ...extraActions,
}

const mappings = (key) => (mapping[key.sequence] || mapping[key.name] || {})

module.exports = { mappings }