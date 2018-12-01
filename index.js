const readline = require('readline');
const easymidi = require('easymidi');

const { diatonicChords, secDomChords } = require('./src/chords');
const constants = require('./src/constants');

console.log('constants', constants)

const playChord = (output, notes = []) => {
  notes.forEach((note) => {
    output.send('noteon', {
      note: note,
      velocity: 127,
      channel: 3
    });
  });
}

let currentKey = 64
console.log('Key: C major')

let chords_C = diatonicChords(currentKey)
let domSecChords_C = secDomChords(currentKey)

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

const processKeyPress = (keyName, keyControl, keyShift) => {
  switch(keyName) { 
    case KEY_I: {
      console.log(`${ keyShift ? 'V7 -> I' : 'I'}`)
      const chord = keyShift ? domSecChords_C.ionian : chords_C.ionian;
      playChord(output, chord); 
      break; 
    }
    case KEY_II: {
      console.log(`${ keyShift ? 'V7 -> IIm' : 'IIm'}`)
      const chord = keyShift ? domSecChords_C.dorian : chords_C.dorian;
      playChord(output, chord); 
      break; 
    }
    case KEY_IImb5: {
      console.log(`${ keyShift ? 'V7 -> IIm' : 'IIm'}`)
      const chord = keyShift ? domSecChords_C.dorian : chords_C.dorianb5;
      playChord(output, chord); 
      break; 
    }
    case KEY_III: {
      console.log(`${ keyShift ? 'V7 -> IIIm' : 'IIIm'}`)
      const chord = keyShift ? domSecChords_C.phrygian : chords_C.phrygian;
      playChord(output, chord); 
      break; 
    }
    case KEY_IV: {
      console.log(`${ keyShift ? 'V7 -> IV' : 'IV'}`)
      const chord = keyShift ? domSecChords_C.lydian : chords_C.lydian;
      playChord(output, chord); 
      break; 
    }
    case KEY_IVm: {
      console.log(`${ keyShift ? 'V7 -> IV' : 'IVm'}`)
      const chord = keyShift ? domSecChords_C.lydian : chords_C.lydianminor;
      playChord(output, chord); 
      break; 
    }
    case KEY_V: {
      console.log(`${ keyShift ? 'V7 -> V7' : 'V7'}`)
      const chord = keyShift ? domSecChords_C.mixolydian : chords_C.mixolydian;
      playChord(output, chord); 
      break; 
    }
    case KEY_VI: {
      console.log(`${ keyShift ? 'V7 -> VIm' : 'VIm'}`)
      const chord = keyShift ? domSecChords_C.eolian : chords_C.eolian;
      playChord(output, chord); 
      break; 
    }
    case KEY_VII: {
      console.log(`${ keyShift ? 'VIImb5' : 'VIImb5'}`)
      const chord = keyShift ? domSecChords_C.locrian : chords_C.locrian;
      playChord(output, chord); 
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
    const c = processKeyPress(key.name, key.ctrl, key.shift)
  }
});

console.log('Press any key...');
