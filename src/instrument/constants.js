// Keys layout
const KEY_I = 'w';
const KEY_II = 'q';
const KEY_III = 'e';
const KEY_IV = 'a';
const KEY_V = 's';
const KEY_VI = 'd';
const KEY_VII = 'f';

// Configs
const CURRENT_TONALITY = 'C';
const CHORD_DENSITY = 'triad' || 'tetrad' || 'power-chord';
const BASE_SCALE = 'diatonic' || 'melodic' || 'harmonic' || 'blues';
const VELOCITY = 'hard' || 'medium' || 'soft';
const CHORD_INVERSION = 'auto' || 'tonic' || 'third' || 'fifth' || 'seventh';
const TENSION_9 = 'no' || 'flat' || 'natural' || 'sharp';
const TENSION_11 = 'no' || 'flat' || 'natural' || 'sharp';
const TENSION_13 = 'no' || 'flat' || 'natural' || 'sharp';
const ADD_MODE_TENSIONS = 'yes' || 'no';

// Actions
const INCREASE_TONALITY = '+';
const DECREASE_TONALITY = '-';

const SET_POWER_CHORDS_MODE = 'p';
const SET_TRIAD_CHORDS_MODE = 'o';
const SET_TETRAD_CHORDS_MODE = 'i';

const SET_BLUES_MODE = 'b';
const SET_MINOR_SUB_DOM_MODE = 'v';
const SET_HARMONIC_SCALE_MODE = 'n';
const SET_MELODIC_SCALE_MODE = 'm';

// Modes
const SET_VELOCITY_1_MODE = 'h';
const SET_VELOCITY_2_MODE = 'j';
const SET_VELOCITY_3_MODE = 'k';

// Modifiers
const KEY_MODIFIER_1 = 'shift';   // switches to relative V7 of chord
const KEY_MODIFIER_2 = 'ctrl';   // switches to relative IIm of chord


// IDEA: chrome extension for parsing chords from the internet into keyboard letters
// User is able to play song chords easily using the keyboard, and singalong!

