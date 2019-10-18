const figlet = require('figlet');
const { showInstructions } = require('./instructions');
const { showSpaces } = require('./utils');


const DECENT_FONTS = [
  'Doom',
  'Crazy',
  'Doh',
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
const FONT = DECENT_FONTS[0];
 
const clearScreen = () => {
  process.stdout.write('\u001B[2J\u001B[0;0f');
}

const printHUD = () => {
  console.log(`Tonality: C      Current chord: Dm7      Current grade: IIm`)
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
  console.log(data);
  showSpaces(3);
  showInstructions();
}

const printChord = (text) => {
  figlet.text(text, {
    font: FONT,
    horizontalLayout: 'default',
    verticalLayout: 'default'
  }, printCallback);
}

module.exports = {
  clearScreen,
  printChord
}