/**
 * This file contains the loop where lines are read from CLI
 * and the instrument is played
 * 
 * Some keypress events are mapped to chords, played by the instrument
 * which is included from "instrument"
 */

const readline = require('readline');
const { getNotePadding } = require('./asciiart');
const { printScreen, clearScreen, highlight } = require('./asciiart');
const { mappings } = require('./mappings');


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
    toggleStaccato,
  },
  closeInstrument, 
} = require('../../instrument');

const { CONTROL_VOLUME } = require('../../instrument/constants')

const { startLeap } = require('../leapHandler/index');
const { playModifiers } = require('../leapHandler/handlers');


// Initialize leap loop
let leapOn = false;
let myArgs = process.argv.slice(2);
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

let arpeggio = 0;
let staccato = false;
// Splash screen
clearScreen();
printScreen(instrumentStatus, "lithium-cli", 4);

const keyHandler = (str, key) => {
  if (key.ctrl && key.name === 'c') {
    closeInstrument();
    process.exit();
  } else {
    const mappedThing = mappings(key);

    if (mappedThing.note !== undefined) {
      // NOTE
      const index = mappedThing.note;
      playSingleNote(index);
      console.log(getNotePadding(index));

    } else if (mappedThing.grade) {
      // CHORD
      const { grade, secDom, subMin } = mappedThing;
      const { label, gradeName } = playChord(grade, secDom, subMin, arpeggio);
      const displayGrade = `${secDom ? 'V7 -> ' : ''}${gradeName}`
      instrumentStatus = {
        key: getCurrentTonality(),
        grade: gradeName,
        secDom,
        subMin,
      }
      console.log(highlight(`🎹 ${label}`, subMin ? 1 : (secDom ? 2 : 7 )), `\t\t\t[${displayGrade}]`);

    } else if (mappedThing.semitone) {
      // TRANSPOSE
      moveTonality(mappedThing.semitone);
      instrumentStatus = {
        ...instrumentStatus,
        key: getCurrentTonality(),
      }
      // printScreen(instrumentStatus, getCurrentTonality(), 3);
      console.log(`${highlight(`< switched to `, 6)}${highlight(getCurrentTonality(), 4)}${highlight(` >`, 6)}`);

    } else if (mappedThing.release) {
      // RELEASE
      releasePedal();
      clearScreen();   
      
      printScreen(instrumentStatus, "lithium-cli", 1);

    } else if (mappedThing.arpeggio) {
      // ARPEGGIO
      arpeggio = (arpeggio === 4) ? 0 : arpeggio = arpeggio + 1;
      console.log(arpeggio ? `Arpeggio mode ON - Level ${arpeggio}` : 'Arpeggio mode OFF');

    } else if (mappedThing.staccato) {
      staccato = !staccato;
      toggleStaccato();
      console.log(`Melody set to staccato ${staccato ? 'ON' : 'OFF'}`);

    } else if (mappedThing.mute && leapOn) {
      // MUTE
      sendControlChange(0, CONTROL_VOLUME);
      printScreen(instrumentStatus, "mute", 3);
    }

  }
}

process.stdin.on('keypress', keyHandler);
