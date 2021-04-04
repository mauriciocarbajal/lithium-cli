const keyboardLayout = require('keyboard-layout');
// >   ¡!#$%/&*()_+
// IOPº¨"     KLÑ:      NM¿?Ç     

const mappings_fixed = {
  // chords:
  '1': { grade: 1 },
  '2': { grade: 2 },
  '3': { grade: 3 },
  '4': { grade: 4 },
  '5': { grade: 5 },
  '6': { grade: 6 },
  '7': { grade: 7 },
  '8': { grade: 1 },
  'z': { grade: 1, subMin: true },
  'x': { grade: 2, subMin: true },
  'c': { grade: 3, subMin: true },
  'v': { grade: 4, subMin: true },
  'b': { grade: 5, subMin: true },
  'n': { grade: 6, subMin: true },
  'm': { grade: 7, subMin: true },
  'Z': { grade: 1, secDom: true, subMin: true },
  'X': { grade: 2, secDom: true, subMin: true },
  'C': { grade: 3, secDom: true, subMin: true },
  'V': { grade: 4, secDom: true, subMin: true },
  'B': { grade: 5, secDom: true, subMin: true },
  'N': { grade: 6, secDom: true, subMin: true },
  'M': { grade: 7, subMin: true },
  // notes:
  'q': { note: -1 },  // lol
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
  ' ': { release: true },
}

const keyboardMappings = keyboardLayout.getCurrentKeymap();
const shifted = (name) => (keyboardMappings[name]?.withShift || 'not-found')

const mappings_control = {
  // actions:
  '<': { semitone: -1 },
  '>': { semitone: 1 },
  'space': { release: true },
  '=': { arpeggio: true },
  '-': { staccato: true },
  // mod numbers:
  [shifted('Digit1')]: { grade: 1, secDom: true },
  [shifted('Digit2')]: { grade: 2, secDom: true },
  [shifted('Digit3')]: { grade: 3, secDom: true },
  [shifted('Digit4')]: { grade: 4, secDom: true },
  [shifted('Digit5')]: { grade: 5, secDom: true },
  [shifted('Digit6')]: { grade: 6, secDom: true },
  [shifted('Digit7')]: { grade: 7 },
  [shifted('Digit8')]: { grade: 1, secDom: true },
};

const mappings_only_EN = {
  // notes:
  ';': { note: 16 },
  ':': { note: 16 },
  '\'': { note: 17 },
  '"': { note: 17 },
  ']': { note: 18 },
  '}': { note: 18 },
  '\\': { note: 19 },
  '\|': { note: 19 },
};

const layout = {
  ...mappings_fixed,
  ...mappings_control,
};

const mappings = (key) => {
  const lang = keyboardLayout.getCurrentKeyboardLanguage();
  const userMappings = {
    ...((lang === 'en') ? mappings_only_EN : {}),
    ...mappings_fixed,
    ...mappings_control,
  };

  return userMappings[key.sequence] || userMappings[key.name] || {};
}

module.exports = { mappings }