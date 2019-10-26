const figlet = require('figlet');
const { showInstructions, highlight } = require('./instructions');
const { showSpaces } = require('./utils');

const DECENT_FONTS = [
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

const FONT = DECENT_FONTS[5];

const asyncPrintScreen = (text) => new Promise((resolve, reject) => {
  {
    figlet.text(`   ${text}`, {
      font: FONT,
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

const gradeNames = {
  1: 'I',
  2: 'IIm',
  3: 'IIIm',
  4: 'IV',
  5: 'V7',
  6: 'VIm',
  7: 'VIIø',
}

const printHUD = (key = 'F#', grade = '?', secDom) => {
  console.log(`Key: ${key}      Current chord: ${secDom ? 'V7 -> ' : ''}${gradeNames[grade] || '-'}`);
}

const printScreen = async (instrumentStatus, text, color) => {
  const { key, grade, secDom } = instrumentStatus;
  const data = await asyncPrintScreen(text);
  clearScreen();
  printHUD(key, grade, secDom);
  showSpaces(3);
  console.log(highlight(data, color));
  showSpaces(3);
  showInstructions();
}



module.exports = {
  clearScreen,
  printScreen
}