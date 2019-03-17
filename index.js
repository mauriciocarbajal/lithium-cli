const readline = require('readline');
const easymidi = require('easymidi');
const Leap = require('leapjs');

const { diatonicChords, secDomChords } = require('./src/chords');

Leap.loop(function(frame){
  if (frame.hands.length === 2) {
    const { hands: [ left, right ] } = frame
    console.log('left', left)
    console.log('right', right)
  }
});

// Keys layout
const KEY_I = 'a';
const KEY_II = 's';
const KEY_IImb5 = 'w';
const KEY_III = 'd';
const KEY_IV = 'f';
const KEY_IVm = 'r';
const KEY_V = 'g';
const KEY_VI = 'h';
const KEY_VII = 'j';

let currentKey = 64
console.log('Key: C major')

let chords_C = diatonicChords(currentKey)
let domSecChords_C = secDomChords(currentKey)

const releasePedal = (output) => {
  for (let i = 20; i < 90; i = i + 1) {
    output.send('noteoff', {
      note: i,
      velocity: 0,
      channel: 0
    });

    output.send('reset')
  }
};

const playChord = (output, notes = []) => {
  releasePedal(output)
  notes.forEach((note) => {
    output.send('noteon', {
      note: note,
      velocity: 127,
      channel: 0
    });
  });
}

const processKeyPress = (keyName, keyControl, keyShift) => {
  switch(keyName) { 
    case KEY_I: {
      console.log(`${ keyShift ? 'V7 -> I' : 'I'}`)
      const definedChord = keyShift ? domSecChords_C.ionian : chords_C.ionian;
      playChord(output, definedChord);
      break; 
    }
    case KEY_II: {
      console.log(`${ keyShift ? 'V7 -> IIm' : 'IIm'}`)
      const definedChord = keyShift ? domSecChords_C.dorian : chords_C.dorian;
      playChord(output, definedChord);
      break; 
    }
    case KEY_IImb5: {
      console.log(`${ keyShift ? 'V7 -> IIm' : 'IIm'}`)
      const definedChord = keyShift ? domSecChords_C.dorian : chords_C.dorianb5;
      playChord(output, definedChord);
      break; 
    }
    case KEY_III: {
      console.log(`${ keyShift ? 'V7 -> IIIm' : 'IIIm'}`)
      const definedChord = keyShift ? domSecChords_C.phrygian : chords_C.phrygian;
      playChord(output, definedChord);
      break; 
    }
    case KEY_IV: {
      console.log(`${ keyShift ? 'V7 -> IV' : 'IV'}`)
      const definedChord = keyShift ? domSecChords_C.lydian : chords_C.lydian;
      playChord(output, definedChord);
      break; 
    }
    case KEY_IVm: {
      console.log(`${ keyShift ? 'V7 -> IV' : 'IVm'}`)
      const definedChord = keyShift ? domSecChords_C.lydian : chords_C.lydianminor;
      playChord(output, definedChord);
      break; 
    }
    case KEY_V: {
      console.log(`${ keyShift ? 'V7 -> V7' : 'V7'}`)
      const definedChord = keyShift ? domSecChords_C.mixolydian : chords_C.mixolydian;
      playChord(output, definedChord);
      break; 
    }
    case KEY_VI: {
      console.log(`${ keyShift ? 'V7 -> VIm' : 'VIm'}`)
      const definedChord = keyShift ? domSecChords_C.eolian : chords_C.eolian;
      playChord(output, definedChord);
      break; 
    }
    case KEY_VII: {
      console.log(`${ keyShift ? 'VIImb5' : 'VIImb5'}`)
      const definedChord = keyShift ? domSecChords_C.locrian : chords_C.locrian;
      playChord(output, definedChord);
      break; 
    }
    case 'up': {
      console.log('semitone up!');
      currentKey = currentKey + 1;
      chords_C = diatonicChords(currentKey)
      domSecChords_C = secDomChords(currentKey)
      break; 
    }
    case 'down': {
      console.log('semitone down!');
      currentKey = currentKey - 1;
      chords_C = diatonicChords(currentKey)
      domSecChords_C = secDomChords(currentKey)
      break; 
    }
    case 'space': {
      console.log('send reset...')
      releasePedal(output);
      break; 
    }
    default: { 
       break; 
    } 
  }
}

var output = new easymidi.Output('keys-harmony-output', true);

readline.emitKeypressEvents(process.stdin);

process.stdin.setRawMode(true);

process.stdin.on('keypress', (str, key) => {
  if (key.ctrl && key.name === 'c') {
    output.close();
    process.exit();
  } else {
    processKeyPress(key.name, key.ctrl, key.shift)
  }
});

console.log('Press any key...');
