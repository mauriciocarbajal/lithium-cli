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

const printHUD = (key = '-', gradeName = '-') => {
  console.log(`Key: ${highlight(key, 5)}      Current chord: ${highlight(gradeName, 5)}`);
}

const printScreen = async (instrumentStatus, label, color) => {
  if (DEBUG) {
    return;
  }
  clearScreen();

  // HUD
  const { key, grade, secDom } = instrumentStatus;
  const displayGrade = `${secDom ? 'V7 -> ' : ''}${grade}`
  printHUD(key, displayGrade);
  
  // MAIN
  printEmptyLines(1);
  const labelASCII = await asyncPrintScreen(` ${label}`, defaultFont);
  console.log(highlight(labelASCII, color));
  printEmptyLines(1);
  
  // INSTRUCTIONS
  console.log(highlight('|1|2|3|4|5|6|7|', 0));
  console.log(highlight('Diatonic chords', 4));
  console.log('')
  
  console.log(highlight('|q|w|e|r|t|y|u|', 1));
  console.log(highlight('Subdominant minor function chords', 4));
  console.log('')
  
  console.log(highlight('|shift|', 2));
  console.log(highlight('Hold shift to play a V7 secondary dominant chord', 4));
  console.log('')

  console.log(highlight('|o|p|=|0|', 3));
  console.log(highlight('Use o and p to change key one semitone up/down', 4));
  console.log(highlight('Use 0 to release the notes', 4));
  console.log(highlight('Use k to mute', 4));
  console.log('')
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
};

const getNotePadding = (note) => {
  const n = (note < 0)
    ? note + 12
    : (note > 18) ? (note % 12) : note;

  let result = [];
  for(let i = 0; i < 19; i = i + 1) {
    if (i === n) {
      if ([0,4,7,11,12,16].includes(i)) {
        result.push(highlight(noteName[n], 3));
      } else if ([2,5,9,14,17].includes(i)) {
        result.push(highlight(noteName[n], 2));
      } else if ([3,8,10,15].includes(i)) {
        result.push(highlight(noteName[n], 1));
      } else {
        result.push(highlight(noteName[n], 5));
      }
    } else {
      result.push('   ');
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

