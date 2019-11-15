const {
  startInstrument,
  instrumentFeatures,
  instrumentFeatures: {
    getCurrentTonality,
    playChord,
    playSingleNote,
    releasePedal,
    sendControlChange,
    moveTonality,
  },
  closeInstrument,
} = require('../../instrument');
const { handleInstrument } = require('./handlers');
const { startLeap } = require('./index')

startInstrument();

startLeap(handleInstrument(instrumentFeatures));