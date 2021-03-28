const {
  startInstrument,
  instrumentFeatures: {
    releasePedal,
    playChord,
    sendControlChange,
  },
  closeInstrument,
} = require('../../instrument');

startInstrument();

const MAX_ITERATIONS = 64 + 1;
const PAUSE_BETWEEN = 1000;

const pattern = [
  0,1,5,6,4,1,2,3
];

const LOOP_MODULE = 2;

for(let t = 0; t < MAX_ITERATIONS; t = t + 1) {
  if (t % LOOP_MODULE === 0) {
    setTimeout(() => {
      releasePedal();
      console.log('release sent', t % LOOP_MODULE);
    }, t * PAUSE_BETWEEN);
  } else {
    setTimeout(() => {
      playChord(pattern[t % LOOP_MODULE]);
      console.log('chord sent: ', t % LOOP_MODULE);
    }, t * PAUSE_BETWEEN);
  }
}

setTimeout(() => {
  releasePedal();
  closeInstrument();
}, MAX_ITERATIONS * PAUSE_BETWEEN);
