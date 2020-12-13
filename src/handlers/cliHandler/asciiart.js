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
  const labelASCII = await asyncPrintScreen(`   ${label}`, defaultFont);
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



module.exports = {
  clearScreen,
  printScreen,
  asyncPrintScreen
}