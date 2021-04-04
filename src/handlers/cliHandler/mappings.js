const keyboardLayout = require('keyboard-layout');
// >   ¡!#$%/&*()_+
// IOPº¨"     KLÑ:      NM¿?Ç     

const mappings_ALL = {
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
  '<': { grade: 1, secDom: true, subMin: true },
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
}

const mappings_EN = {
  // mod numbers:
  '!': { grade: 1, secDom: true },
  '@': { grade: 2, secDom: true },
  '#': { grade: 3, secDom: true },
  '$': { grade: 4, secDom: true },
  '%': { grade: 5, secDom: true },
  '^': { grade: 6, secDom: true },
  '&': { grade: 7 },
  '*': { grade: 1, secDom: true },
  // actions:
  '+': { mute: true },
  '-': { pedal: true },
  '<': { semitone: -1 },
  '>': { semitone: 1 },
  'space': { release: true },
  '=': { arpeggio: true },
  '/': { staccato: true },
  // notes:
  ';': { note: 16 },
  ':': { note: 16 },
  '\'': { note: 17 },
  '"': { note: 17 },
  ']': { note: 18 },
  '}': { note: 18 },
  '\\': { note: 19 },
  '\|': { note: 19 },
}

const mappings_ES = {
  // mod numbers:
  '¡': { grade: 1, secDom: true },
  '!': { grade: 2, secDom: true },
  '#': { grade: 3, secDom: true },
  '$': { grade: 4, secDom: true },
  '%': { grade: 5, secDom: true },
  '/': { grade: 6, secDom: true },
  '&': { grade: 7 },
  '*': { grade: 1, secDom: true },
  // actions:
  '=': { mute: true },
  '-': { pedal: true },
  '¿': { semitone: -1 },
  '?': { semitone: 1 },
  'space': { release: true },
  '<': { arpeggio: true },
  'ç': { staccato: true },
  // notes:
  'ñ': { note: 16 },
  'Ñ': { note: 16 },
  ';': { note: 17 },
  ':': { note: 17 },
  '\`': { note: 18 },
  '¨': { note: 18 },
  '\'': { note: 19 },
  '"': { note: 19 },
}

const mappingsByLanguage = {
  'en': mappings_EN,
  'es': mappings_ES,
}

const mappings = (key) => {
  const lang = keyboardLayout.getCurrentKeyboardLanguage();

  if (!key.name && lang !== 'en' && lang !== 'es') {
    console.log('⚠️  Sorry! Only EN or ES keyboard layout are supported right now.');
  }

  const layout = {
    ...mappings_ALL,
    ...mappingsByLanguage[lang],
  };
  
  return layout[key.name] || layout[key.sequence] || {};
}

module.exports = { mappings }