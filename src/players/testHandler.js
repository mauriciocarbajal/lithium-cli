const {
  startInstrument,
  getChords,
  playChord,
  releasePedal,
  closeInstrument,
} = require('../instrument');

startInstrument();
releasePedal();

const MAX_ITERATIONS = 64 + 1;

for(let t = 0; t < MAX_ITERATIONS; t = t + 1) {
  if (t % 8 === 0) {
    setTimeout(() => {
      releasePedal();
    }, t * 500);
  } else {
    setTimeout(() => {
      const table = getChords();
      
      playChord(table.chords[t % 8]);  
    }, t * 500);
  }
}

setTimeout(() => {
  releasePedal();
  closeInstrument();
}, MAX_ITERATIONS * 1000);
