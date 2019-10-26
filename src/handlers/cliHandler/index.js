/**
 * This file contains the loop where lines are read from CLI
 * and the instrument is played
 * 
 * Some keypress events are mapped to chords, played by the instrument
 * which is included from "instrument"
 */

const readline = require('readline');
const { showInstructions } = require('./instructions');
const { printScreen, clearScreen } = require('./asciiart');
const { mappings } = require('./mappings');

const {
  startInstrument,
  instrumentFeatures,
  instrumentFeatures: {
    getCurrentTonality,
    playChord,
    releasePedal,
    sendControlChange,
    moveTonality,
  },
  closeInstrument,
} = require('../../instrument');

const { CONTROL_VOLUME } = require('../../instrument/constants')

const { startLeap } = require('../leapHandler/index');
const { handleInstrument } = require('../leapHandler/handlers');


// Initialize leap loop
var myArgs = process.argv.slice(2);
if (myArgs && myArgs[0] === "leap") {
  console.log('Leap initialized...')
  startLeap(handleInstrument(instrumentFeatures));
}

// Initialize CLI interface
readline.emitKeypressEvents(process.stdin);
process.stdin.setRawMode(true);

showInstructions();
startInstrument();

let instrumentStatus = {
  key: getCurrentTonality(),
  grade: '?',
}

// Splash screen
clearScreen();
printScreen(instrumentStatus, "NIMETHING", 0);

process.stdin.on('keypress', (str, key) => {
  if (key.ctrl && key.name === 'c') {
    closeInstrument();
    process.exit();
  } else {
    const mappedThing = mappings(key);

    if (mappedThing.grade) {
      const { grade, secDom, subMin } = mappedThing;
      const label = playChord(grade, secDom, subMin);
      instrumentStatus = {
        key: getCurrentTonality(),
        grade,
        secDom,
        subMin,
      }
      printScreen(instrumentStatus, label, subMin ? 1 : (secDom ? 2 : 0 ));

    } else if (mappedThing.semitone) {
      moveTonality(mappedThing.semitone);
      instrumentStatus = {
        ...instrumentStatus,
        key: getCurrentTonality(),
      }
      printScreen(instrumentStatus, getCurrentTonality(), 3);

    } else if (mappedThing.release) {
      releasePedal();
      printScreen(instrumentStatus, "release", 3);

    } else if (mappedThing.mute) {
      sendControlChange(0, CONTROL_VOLUME);
      printScreen(instrumentStatus, "mute", 3);
    }
  }
});
