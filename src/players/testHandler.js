const {
  startInstrument,
  getChords,
  playChord,
  releasePedal,
  closeInstrument,
} = require('../instrument');

const {
  invert,
  addTension,
 } = require('../utils/alter');

startInstrument();
releasePedal();

const MAX_ITERATIONS = 64 + 1;
const PAUSE_BETWEEN = 1000;

for(let t = 0; t < MAX_ITERATIONS; t = t + 1) {
  if (t % 8 === 0) {
    setTimeout(() => {
      releasePedal();
    }, t * PAUSE_BETWEEN);
  } else {
    setTimeout(() => {
      const table = getChords();

      const g = (t % 8);
      const c = table.chords[1];
      
      playChord(addTension(c, '13'));  
    }, t * PAUSE_BETWEEN);
  }
}

setTimeout(() => {
  releasePedal();
  closeInstrument();
}, MAX_ITERATIONS * PAUSE_BETWEEN);
