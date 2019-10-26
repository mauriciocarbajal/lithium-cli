const red = "\x1b[31m"
const green = "\x1b[32m"
const yellow = "\x1b[33m"
const blue = "\x1b[34m"
const magenta = "\x1b[35m"
const cyan = "\x1b[36m"
const white = "\x1b[37m"
const defaultColor = "\x1b[0m"


const highlight = (text, color = 0) => {
  switch(color) {
    case 3:
      return (`${yellow}${text}${defaultColor}`);
    case 2:
        return (`${red}${text}${defaultColor}`);
    case 1:
      return (`${cyan}${text}${defaultColor}`);
    default:
      return (`${green}${text}${defaultColor}`);
  }
}

const showInstructions = () => {
  console.log('Instructions:')
  console.log(highlight('1 2 3 4 5 6 7 <- Diatonic chords'));
  console.log(highlight('q w e r t y u <- Subdominant minor chords', 1));
  console.log('');
  console.log(highlight('shift: V7 -> I', 2));
  console.log('');
  console.log(highlight('space: release notes', 3));
  console.log(highlight('p: modulate one semitone up', 3));
  console.log(highlight('l: modulate one semitone down', 3));
  console.log(highlight('m: mute', 3));
}

module.exports = { showInstructions, highlight };