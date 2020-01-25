/**
 * This file contains the loop where lines are read from CLI
 * and the instrument is played
 * 
 * Some keypress events are mapped to chords, played by the instrument
 * which is included from "instrument"
 */

const readline = require('readline');
const { printScreen, clearScreen } = require('./asciiart');
const { mappings } = require('./mappings');


// LOOP RECORD
let startingTime = null;
let endingTime = null;
let hitsLog = [];

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

const { CONTROL_VOLUME } = require('../../instrument/constants')

const { startLeap } = require('../leapHandler/index');
const { playModifiers } = require('../leapHandler/handlers');


// Initialize leap loop
let leapOn = false;
var myArgs = process.argv.slice(2);
if (myArgs && myArgs[0] === "leap") {
  console.log('Leap initialized...')
  startLeap(playModifiers(instrumentFeatures));
  leapOn = true;
}

// Initialize CLI interface
readline.emitKeypressEvents(process.stdin);
process.stdin.setRawMode(true);

startInstrument();

let instrumentStatus = {
  key: getCurrentTonality(),
  grade: '?',
}

// Splash screen
clearScreen();
printScreen(instrumentStatus, "Hey!", 3);

let pedal = true;

let scheduleLoop = () => {
  endingTime = new Date().getTime() - startingTime;
  const empiricalOffset = 100;
  hitsLog.forEach((hit) => {
    for(let iter = 0; iter < 5; iter += 1) {
      setTimeout(() => (keyHandler(hit.str, hit.key, false)), iter * endingTime + hit.time - empiricalOffset);
    }
  })
  hitsLog = [];
}

const keyHandler = (str, key, record = true) => {
  if (key.ctrl && key.name === 'c') {
    closeInstrument();
    process.exit();
  } else if (key.ctrl && key.name === 'x') {
    startingTime = null;
    endingTime = null;
    hitsLog = [];
  } else {
    const mappedThing = mappings(key);

    if ((mappedThing.grade || mappedThing.note) && record) {
      // Record activity
      const currentTick = new Date().getTime();
      if (!startingTime) startingTime = currentTick;
      hitsLog.push({ str, key, time: currentTick - startingTime })
    }

    if (mappedThing.grade) {
      // CHORDS
      const { grade, secDom, subMin } = mappedThing;
      const { label, gradeName } = playChord(grade, secDom, subMin);
      instrumentStatus = {
        key: getCurrentTonality(),
        grade: gradeName,
        secDom,
        subMin,
      }
      printScreen(instrumentStatus, label, subMin ? 1 : (secDom ? 2 : 0 ));

    } else if (mappedThing.note) {
      // NOTE
      const { secDom, subMin } = instrumentStatus;
      const index = mappedThing.note;
      let scale = [0,2,4,5,7,9,11,12,14,16];
      if (subMin) {
        scale = [0,2,3,5,7,8,10,12,14,15];
      }

      const filterMode = false;
      if (!filterMode || scale.includes(index-1)) {
        if (!pedal) releasePedal();
        playSingleNote(index-4)
      }

    } else if (mappedThing.semitone) {
      // TRANSPOSE
      moveTonality(mappedThing.semitone);
      instrumentStatus = {
        ...instrumentStatus,
        key: getCurrentTonality(),
      }
      printScreen(instrumentStatus, getCurrentTonality(), 3);
    } else if (mappedThing.release) {
      // RELEASE
      releasePedal();
      //printScreen(instrumentStatus, "release", 3);
      printScreen(instrumentStatus, "loop", 3);
      scheduleLoop();

    } else if (mappedThing.pedal) {
      // RELEASE
      pedal = !pedal;
      printScreen(instrumentStatus, `Pedal ${pedal ? 'ON' : 'OFF'}`, 3);

    } else if (mappedThing.mute && leapOn) {
      // MUTE
      sendControlChange(0, CONTROL_VOLUME);
      printScreen(instrumentStatus, "mute", 3);
    }
  }
}

process.stdin.on('keypress', keyHandler);
