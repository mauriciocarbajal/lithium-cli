const figlet = require('figlet');
const { showInstructions } = require('./instructions');
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
 
const clearScreen = () => {
  process.stdout.write('\u001B[2J\u001B[0;0f');
}

const printHUD = (tonality = 'F#', chord = 'IIm') => {
  console.log(`Tonality: ${tonality}      Current chord: ${chord}`)
}

const printCallback = (err, data) => {
  if (err) {
      console.log('Something went wrong...');
      console.dir(err);
      return;
  }
  clearScreen();
  printHUD();
  showSpaces(3);
  console.log('\x1b[33m');
  console.log(data);
  console.log('\x1b[0m');
  showSpaces(3);
  showInstructions();
}

const printScreen = (text) => {
  figlet.text(text, {
    font: FONT,
    horizontalLayout: 'default',
    verticalLayout: 'default',
    kerning: 'fitted',
  }, printCallback);
}

module.exports = {
  clearScreen,
  printScreen
}