// TODO: use the first inversion always
// Then if required, create a sample 7 chords using the invert function from utils/alter

const diatonicChords = (note) => ({
    ionian: [
        note - 12 - 12,
        note,
        note + 4,
        note + 7,
    ],
    dorian: [
        note - 10 - 12,
        note + 2,
        note + 5,
        note + 9,
    ],
    phrygian: [
        note - 8 - 12,
        note + 4,
        note + 7,
        (note + 11),
    ],
    lydian: [
        note - 7 - 12,
        note,
        note + 5,
        note + 9,
    ],
    mixolydian: [
        note - 5 - 12,
        note - 5 + 12,
        note - 1,
        note + 2,
    ],
    eolian: [
        note - 15 - 12,
        note - 3,
        note,
        note + 4,
    ],
    locrian: [
        note - 13 - 12,
        note - 1,
        note + 2,
        note + 5,
    ],
    dorianb5: [
        note - 10 - 12,
        note + 2,
        note + 5,
        note + 8,
    ],
    lydianminor: [
        note - 7 - 12,
        note,
        note + 5,
        note + 8,
    ],
})

const secDomChords = (note) => ({
    ionian: [
        note - 5 - 12,
        note - 1,
        note + 2,
        note + 5,
    ],
    dorian: [
        note - 15 - 12,
        note - 3,
        note + 1, // new note
        note + 4,
    ],
    phrygian: [
        note - 13 - 12,
        note - 1,
        note + 3, // new note
        note + 6, // new note
    ],
    lydian: [
        note - 12 - 12,
        note,
        note + 4,
        note + 7,
        note + 10, // new note
    ],
    mixolydian: [
        note - 10 - 12,
        note + 2,
        note + 6, // new note
        note + 9,
    ],
    eolian: [
        note - 8 - 12,
        note + 4,
        note + 8, // new note
        (note + 11) - 12,
    ],
    locrian: [
        note - 13 - 12,
        note - 1,
        note + 2,
        note + 5,
    ],
})

module.exports = {
    diatonicChords,
    secDomChords,
}