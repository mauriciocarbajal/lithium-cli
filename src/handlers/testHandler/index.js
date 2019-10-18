const {
  startInstrument,
  playChord,
  releasePedal,
  moveTonality,
  closeInstrument,
} = require('../../instrument');

startInstrument();

const MAX_ITERATIONS = 64 + 1;
const PAUSE_BETWEEN = 1000;

for(let t = 0; t < MAX_ITERATIONS; t = t + 1) {
  if (t % 8 === 0) {
    setTimeout(() => {
      releasePedal();
    }, t * PAUSE_BETWEEN);
  } else {
    setTimeout(() => {
      playChord(t % 8);
    }, t * PAUSE_BETWEEN);
  }
}

setTimeout(() => {
  releasePedal();
  closeInstrument();
}, MAX_ITERATIONS * PAUSE_BETWEEN);
