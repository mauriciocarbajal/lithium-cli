const figlet = require('figlet');
const { highlight } = require('./instructions');
const { printEmptyLines } = require('./utils');

const DEBUG = false;

const decentFonts = [
  'Doom',
  'Crazy',
  'Shimrod',
  'Small Keyboard',
  'Univers',
  'Big Money-nw',
  'Banner3',
  'ANSI Shadow',
  'Georgia11',
  'Big',
  'Standard'
];

const defaultFont = decentFonts[5];

const asyncPrintScreen = (text, font = defaultFont) => new Promise((resolve, reject) => {
  {
    figlet.text(`${text}`, {
      font,
    }, (err, data) => {
      if (err) {
        reject(err);
      }
      resolve(data);
    });
  }
})
 
const clearScreen = () => {
  process.stdout.write('\u001B[2J\u001B[0;0f');
}

const printScreen = async (instrumentStatus, label, color) => {
  if (DEBUG) {
    return;
  }
  clearScreen();
  
  // MAIN
  printEmptyLines(1);
  const labelASCII = await asyncPrintScreen(` ${label}`, defaultFont);
  console.log(highlight(labelASCII, color));
  
  // INSTRUCTIONS
  console.log(highlight('1234567890 row', 0), '\t---\tDiatonic chords');
  console.log(highlight('qwertyuiop row', 3), '\t---\tPiano black keys');
  console.log(highlight('asdfghjkl row', 3), '\t---\tPiano white keys');
  console.log(highlight('zxcvbnm row', 1), '\t---\tChords to be borrowed from minor mode');
  console.log('');

  console.log(highlight('shift', 2), '\t\t---\tHold shift to play a V7 secondary dominant chord');
  console.log(highlight('< >', 3), '\t\t---\tUse < and > to change key one semitone up/down');
  console.log(highlight('=', 3), '\t\t---\tPress = to play arpeggio chords');
  console.log(highlight('-', 3), '\t\t---\tPress - to toggle staccato mode');
  console.log('');

  console.log(highlight('space', 3), '\t\t---\tUse space to release the notes and reset');
  console.log('');
}

const noteName = {
  0: '1',
  1: 'b2',
  2: '2',
  3: '3m',
  4: '3',
  5: '4',
  6: '#4',
  7: '5',
  8: 'b6',
  9: '6',
  10: '7',
  11: '7M',
  12: '8',
  13: 'b9',
  14: '9',
  15: '#9',
  16: '10',
  17: '11',
  18: '#11',
  19: '12',
};

const getNotePadding = (note) => {
  const n = (note < 0)
    ? note + 12
    : (note > 19) ? (note % 12) : note;

  let result = ['   '];
  for(let i = 0; i < 20; i = i + 1) {
    if (i === n) {
      if ([0,4,7,11,12,16,19].includes(i)) {
        result.push(highlight(noteName[n], 4));
      } else if ([2,5,9,14,17].includes(i)) {
        result.push(highlight(noteName[n], 3));
      } else if ([3,8,10,15].includes(i)) {
        result.push(highlight(noteName[n], 1));
      } else {
        result.push(highlight(noteName[n], 5));
      }
    } else {
      result.push(' ');
    }
  }
  
  return result.join('');
}

module.exports = {
  clearScreen,
  printScreen,
  asyncPrintScreen,
  highlight,
  getNotePadding,
}

