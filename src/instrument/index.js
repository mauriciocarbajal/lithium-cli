/**
 * This file implements the instrument itself
 * which is served to different handlers (leapHandler and cliHandler)
 * 
 * Handlers will pass the chord to be played
 * Example: play the V7 of the IIIm chord, with tensions
 * 
 */

const easymidi = require('easymidi');

const {
  diatonicChords,
  secDomChords,
} = require('./chords');

const {
  invert,
  addTension,
 } = require('./alter');

const DEFAULT_CURRENT_KEY = 64;
const CHANNEL = 1;

var midiOutput;

const startInstrument = () => {
  midiOutput = new easymidi.Output('keys-harmony-output', true);
  releasePedal();
}

const getChords = (currentKey = DEFAULT_CURRENT_KEY) => {
  return {
    chords: [, ...Object.values(diatonicChords(currentKey))],
    secDomChords: [, ...Object.values(secDomChords(currentKey))],
  }
}

const releasePedal = () => {
  for (let i = 20; i < 90; i = i + 1) {
    midiOutput.send('noteoff', {
      note: i,
      velocity: 0,
      channel: CHANNEL,
    });

    midiOutput.send('reset')
  }
};


let currentKey = DEFAULT_CURRENT_KEY;
let table = getChords(currentKey);

const playChord = (grade, shift = false) => {
  const notes = shift ? table.secDomChords[grade] : table.chords[grade]
  releasePedal(midiOutput)
  notes.forEach((note) => {
    midiOutput.send('noteon', {
      note: note,
      velocity: 64,
      channel: CHANNEL,
    });
  });
}

const closeInstrument = () => {
  midiOutput.close();
}

const moveTonality = (n) => {
  currentKey = currentKey + n;
  table = getChords(currentKey);
}

const sendControlChange = (value, controller = 7) => {
  midiOutput.send('cc', {
    controller,
    value,
    channel: CHANNEL,
  })
}

const sendPitchChange = (value) => {
  midiOutput.send('pitch', {
    value,
    channel: CHANNEL,
  })
}

module.exports = {
  startInstrument,
  getChords,
  instrumentFeatures: {
    playChord,
    sendControlChange,
    sendPitchChange,
    releasePedal,
    moveTonality,
  },
  closeInstrument,
}
