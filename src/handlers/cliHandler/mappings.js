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
  'z': { grade: 1, subMin: true },
  'x': { grade: 2, subMin: true },
  'c': { grade: 3, subMin: true },
  'v': { grade: 4, subMin: true },
  'b': { grade: 5, subMin: true },
  'n': { grade: 6, subMin: true },
  'm': { grade: 7, subMin: true },
}

const modSecondRow = {
  'Z': { grade: 1, secDom: true, subMin: true },
  'X': { grade: 2, secDom: true, subMin: true },
  'C': { grade: 3, secDom: true, subMin: true },
  'V': { grade: 4, secDom: true, subMin: true },
  'B': { grade: 5, secDom: true, subMin: true },
  'N': { grade: 6, secDom: true, subMin: true },
  'M': { grade: 7, subMin: true },
  '<': { grade: 1, secDom: true, subMin: true },
}

const singleNotes = {
  'a': { note: 0 },
  'w': { note: 1 },
  's': { note: 2 },
  'e': { note: 3 },
  'd': { note: 4 },
  'f': { note: 5 },
  't': { note: 6 },
  'g': { note: 7 },
  'y': { note: 8 },
  'h': { note: 9 },
  'u': { note: 10 },
  'j': { note: 11 },
  'k': { note: 12 },
  'o': { note: 13 },
  'l': { note: 14 },
  'p': { note: 15 },
  ';': { note: 16 },
  '\'': { note: 17 },
  ']': { note: 18 },
}

const extraActions = {
  '+': { mute: true },
  '-': { pedal: true },
  ',': { semitone: -1 },
  '.': { semitone: 1 },
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