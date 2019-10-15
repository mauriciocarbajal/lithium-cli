const {
  startInstrument,
  getChords,
  playChord,
  releasePedal,
  closeInstrument,
} = require('../instrument');

startInstrument();

for(let t = 1; t < 8; t = t + 1) {
  setTimeout(() => {
    const table = getChords();
    
    playChord(table.chords[t]);  
  }, t * 500);
}

setTimeout(() => {
  releasePedal();
  closeInstrument();
}, 6000);
