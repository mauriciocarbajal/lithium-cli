const figlet = require('figlet');
const { showInstructions, highlight } = require('./instructions');
const { showSpaces } = require('./utils');

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

const FONT = decentFonts[5];

const asyncPrintScreen = (text, font = FONT) => new Promise((resolve, reject) => {
  {
    figlet.text(`${text}`, {
      font,
      horizontalLayout: 'full',
      verticalLayout: 'full',
      kerning: 'fitted',
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
  console.log(`Key: ${highlight(key, 3)}      Current chord: ${highlight(gradeName, 3)}`);
}

const printScreen = async (instrumentStatus, label, color) => {
  const { key, grade, secDom } = instrumentStatus;
  const displayGrade = `${secDom ? 'V7 -> ' : ''}${grade}`
  const labelASCII = await asyncPrintScreen(`   ${label}`, decentFonts[5]);
  const gradeASCII = await asyncPrintScreen(displayGrade, decentFonts[4]);
  
  clearScreen();

  // HUD
  printHUD(key, displayGrade);
  
  // MAIN
  showSpaces(3);
  // console.log(highlight(gradeASCII, 3));
  console.log(highlight(labelASCII, color));
  showSpaces(3);
  
  // INSTRUCTIONS
  const keys1ASCII = await asyncPrintScreen('1234567', decentFonts[3]);
  const keys2ASCII = await asyncPrintScreen('qwertyu', decentFonts[3]);
  const keys3ASCII = await asyncPrintScreen('S', decentFonts[3]);

  console.log(highlight(keys1ASCII, 0));
  console.log('')
  console.log(highlight('Diatonic chords', 0));
  console.log('')
  console.log(highlight(keys2ASCII, 1));
  console.log('')
  console.log(highlight('Subdominant minor function chords', 1));
  console.log('')
  console.log(highlight(keys3ASCII, 2));
  console.log('')
  console.log(highlight('Hold shift to play a V7 secondary dominant chord', 2));
  //showInstructions();
}



module.exports = {
  clearScreen,
  printScreen
}