const readline = require('readline');
const midi = require('midi');

var output = new midi.output();
output.getPortCount();
output.getPortName(0);
output.openPort(0);

readline.emitKeypressEvents(process.stdin);

process.stdin.setRawMode(true);

process.stdin.on('keypress', (str, key) => {
  if (key.ctrl && key.name === 'c') {
    process.exit();
    // Close the port when done.
    output.closePort();
  } else {
    console.log(`You pressed the "${str}" key`);
    console.log();
    console.log(key);
    console.log();
    // Send a MIDI message.
    output.sendMessage([176,22,1]);
  }
});
console.log('Press any key...');




