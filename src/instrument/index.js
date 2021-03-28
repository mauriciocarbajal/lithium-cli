/**
 * This file implements the instrument itself
 * which is served to different handlers (leapHandler and cliHandler)
 * 
 * Handlers will pass the chord to be played
 * Example: play the V7 of the IIIm chord, with tensions
 * 
 */

const easymidi = require('easymidi');
const MIDIHandler = require('./midi');

const {
  diatonicChords,
  secDomChords,
} = require('./chords');

 const {
  tonalityName,
  getChordName,
  getGradeName,
 } = require('./utils')

const DEFAULT_CURRENT_KEY = 60;

let myMIDIHandler;
let currentKey = DEFAULT_CURRENT_KEY;
let melodyOffset = 12;

const startInstrument = () => {
  myMIDIHandler = new MIDIHandler();
}

const getChords = (currentKey = DEFAULT_CURRENT_KEY) => ({
  chords: [, ...Object.values(diatonicChords(currentKey))],
  secDomChords: [, ...Object.values(secDomChords(currentKey))],
});

let table = getChords(currentKey);

const getCurrentTonality = () => {
  return tonalityName(currentKey % 12)
}

const moveTonality = (n) => {
  currentKey = currentKey + n;
  table = getChords(currentKey);
}

const moveMelody = (offset) => {
  melodyOffset = offset;
}

const playSingleNote = (singleNote) => myMIDIHandler.sendNoteOn(currentKey + melodyOffset + singleNote);

const playChord = (grade, secDom, subMin, arpeggio = 0) => {
  let notes;
  let currentTable = table;
  let newGrade = grade;
  let chordKey = currentKey;
  let label;

  if (subMin) {
    // Sub min tonality chord
    chordKey = currentKey + 3;
    currentTable = getChords(chordKey);
    // newGrade = ((grade + 4) % 7) + 1;
  }
  
  if (secDom) {
    // Secondary dominant chord
    notes = currentTable.secDomChords[newGrade];

    // label... it's complicated...
    if (newGrade == 1) label = getChordName(tonalityName(chordKey % 12), 5);
    if (newGrade == 2) label = getChordName(tonalityName((chordKey+2) % 12), 5);
    if (newGrade == 3) label = getChordName(tonalityName((chordKey+4) % 12), 5);
    if (newGrade == 4) label = getChordName(tonalityName((chordKey+5) % 12), 5);
    if (newGrade == 5) label = getChordName(tonalityName((chordKey+7) % 12), 5);
    if (newGrade == 6) label = getChordName(tonalityName((chordKey+9) % 12), 5);
    if (newGrade == 7) label = getChordName(tonalityName((chordKey+11) % 12), 5);

  } else {
    // Diatonic chord
    notes = currentTable.chords[newGrade];
    label = getChordName(tonalityName(chordKey % 12), newGrade);
  }

  myMIDIHandler.releaseChordNotes();
  
  notes.forEach((note, ind) => {
    setTimeout(() => {
      myMIDIHandler.sendNoteChordOn(note);
    }, arpeggio ? ind * arpeggio * 50 : 0);
  });

  return {
    label,
    gradeName: getGradeName(newGrade),
  };
}

const sendControlChange = (...args) => myMIDIHandler.sendControlChange(...args);
const sendPitchChange = (...args) => myMIDIHandler.sendPitchChange(...args);
const releasePedal = (...args) => myMIDIHandler.releasePedal(...args);
const closeInstrument = (...args) => myMIDIHandler.closeInstrument(...args);

module.exports = {
  startInstrument,
  getChords,
  instrumentFeatures: {
    getCurrentTonality,
    playChord,
    playSingleNote,
    sendControlChange,
    sendPitchChange,
    releasePedal,
    moveTonality,
    moveMelody,
  },
  closeInstrument,
}
