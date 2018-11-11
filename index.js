const readline = require('readline');
const easymidi = require('easymidi');

const playChord = (output) => {
  // Send a MIDI message.
  output.send('noteon', {
    note: 64,
    velocity: 127,
    channel: 3
  });
  output.send('noteon', {
    note: 68,
    velocity: 127,
    channel: 3
  });
  output.send('noteon', {
    note: 71,
    velocity: 127,
    channel: 3
  });
}

const defineChord = (keyName, keyControl, keyShift) => {
  console.log({
    keyName,
    keyControl,
    keyShift,
  })
}

var output = new easymidi.Output('keys-harmony-output', true);

readline.emitKeypressEvents(process.stdin);

process.stdin.setRawMode(true);

process.stdin.on('keypress', (str, key) => {
  if (key.ctrl && key.name === 'c') {
    output.close();
    process.exit();
  } else {
    defineChord(key.name, key.ctrl, key.shift)
  }
});
console.log('Press any key...');




