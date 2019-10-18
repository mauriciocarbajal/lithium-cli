/**
 * This file contains the loop where lines are read from CLI
 * and the instrument is played
 * 
 * Some keypress events are mapped to chords, played by the instrument
 * which is included from "instrument"
 */

const readline = require('readline');
const { showInstructions } = require('./instructions');
const { printChord, clearScreen } = require('./asciiart');
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
    console.log('key', key)
    switch(key.name) {
      case 'a': {
        printChord(`${ key.shift ? 'V7 -> I' : 'I'}`)
        playChord(1, key.shift);
        break; 
      }
      case 's': {
        printChord(`${ key.shift ? 'V7 -> IIm' : 'IIm'}`)
        playChord(2, key.shift);
        break; 
      }
      case 'd': {
        printChord(`${ key.shift ? 'V7 -> IIIm' : 'IIIm'}`)
        playChord(3, key.shift);
        break; 
      }
      case 'f': {
        printChord(`${ key.shift ? 'V7 -> IV' : 'IV'}`)
        playChord(4, key.shift);
        break; 
      }
      case 'g': {
        printChord(`${ key.shift ? 'V7 -> V7' : 'V7'}`)
        playChord(5, key.shift);
        break; 
      }
      case 'h': {
        printChord(`${ key.shift ? 'V7 -> VI' : 'VIm'}`)
        playChord(6, key.shift);
        break; 
      }
      case 'j': {
        printChord(`${ key.shift ? 'V7 -> VII' : 'VIIø'}`)
        playChord(7, key.shift);
        break; 
      }
      case 'k': {
        printChord(`${ key.shift ? 'V7 -> I' : 'I'}`)
        playChord(1, key.shift);
        break; 
      }
      case 'up': {
        printChord('semitone up');
        moveTonality(1);
        break; 
      }
      case 'down': {
        printChord('semitone down');
        moveTonality(-1);
        break; 
      }
      case 'space': {
        printChord('release...');
        releasePedal();
        break; 
      }
      default: { 
         break; 
      } 
    }
  }
});
