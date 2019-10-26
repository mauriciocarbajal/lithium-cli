const tonalityNames = {
  0: 'C',
  1: 'Db',
  2: 'D',
  3: 'Eb',
  4: 'E',
  5: 'F',
  6: 'Gb',
  7: 'G',
  8: 'Ab',
  9: 'A',
  10: 'Bb',
  11: 'B',
}

const chordNames = {
  'C': ['C', 'Dm', 'Em', 'F', 'G7', 'Am', 'Bmb5'],
  'Db': ['Db', 'Ebm', 'Fm', 'Gb', 'Ab7', 'Bbm', 'Cmb5'],
  'D': ['D', 'Em', 'F#m', 'G', 'A7', 'Bm', 'C#mb5'],
  'Eb': ['Eb', 'Fm', 'Gm', 'Ab', 'Bb7', 'Cm', 'Dmb5'],
  'E': ['E', 'F#m', 'G#m', 'A', 'B7', 'C#m', 'D#mb5'],
  'F': ['F', 'Gm', 'Am', 'Bb', 'C7', 'Dm', 'Emb5'],
  'Gb': ['Gb', 'Abm', 'Bbm', 'Cb', 'Db7', 'Ebm', 'Fmb5'],
  'G': ['G', 'Am', 'Bm', 'C', 'D7', 'Em', 'F#mb5'],
  'Ab': ['Ab', 'Bbm', 'Cm', 'Db', 'Eb7', 'Fm', 'Gmb5'],
  'A': ['A', 'Bm', 'C#m', 'D', 'E7', 'F#m', 'G#mb5'],
  'Bb': ['Bb', 'Cm', 'Dm', 'Eb', 'F7', 'Gm', 'Amb5'],
  'B': ['B', 'C#m', 'D#m', 'E', 'F#7', 'G#m', 'A#mb5'],
}

const gradeNames = {
  1: 'I',
  2: 'IIm',
  3: 'IIIm',
  4: 'IV',
  5: 'V7',
  6: 'VIm',
  7: 'VIIø',
}


const tonalityName = (index) => (tonalityNames[index]);

const getChordName = (tonalityName, grade) => {
  return chordNames[tonalityName] ? chordNames[tonalityName][grade - 1] : '???';
}

const getGradeName = (grade) => (gradeNames[grade] || '-')

module.exports = {
  tonalityName,
  getChordName,
  getGradeName,
}