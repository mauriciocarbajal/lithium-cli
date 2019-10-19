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
  playChord,
  releasePedal,
  moveTonality,
  closeInstrument,
} = require('../../instrument');

readline.emitKeypressEvents(process.stdin);

process.stdin.setRawMode(true);

showInstructions();
startInstrument();

process.stdin.on('keypress', (str, key) => {
  clearScreen();
  if (key.ctrl && key.name === 'c') {
    closeInstrument();
    process.exit();
  } else {
    const mappedThing = mappings(key);
    printScreen(mappedThing.text);

    if (mappedThing.grade) {
      // A chord...
      playChord(mappedThing.grade, mappedThing.secDom);

    } else if (mappedThing.semitone) {
      // Semitone up/down...
      moveTonality(mappedThing.semitone);

    } else if (mappedThing.release) {
      // Release pedal...
      releasePedal();
    }
  }
});
