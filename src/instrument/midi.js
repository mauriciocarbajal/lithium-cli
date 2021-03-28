// midi wrapper
const easymidi = require('easymidi');

const DEFAULT_CHANNEL = 0;

class MIDIHandler {
    constructor() {
        this.output = new easymidi.Output('lithium-cli', true);
        this.playingNotes = [];
        this.chordNotes = [];
    }

    sendMIDI (midiEvent, midiParams) {
        this.output.send(midiEvent, midiParams);
    };

    sendNoteOff (note) {
        this.sendMIDI('noteoff', {
            note: note,
            velocity: 127,
            channel: DEFAULT_CHANNEL,
        });
    }

    sendNoteOn (note) {
        this.sendNoteOff(note);
        this.playingNotes.push(note);
        this.sendMIDI('noteon', {
            note: note,
            velocity: 75,
            channel: DEFAULT_CHANNEL,
        });
    }

    sendNoteChordOn (note) {
        this.playingNotes.push(note);
        this.chordNotes.push(note);
        this.sendMIDI('noteon', {
            note: note,
            velocity: 64,
            channel: DEFAULT_CHANNEL,
        });
    }

    sendControlChange (value, controller = 7) {
        this.sendMIDI('cc', {
            controller,
            value,
            channel: DEFAULT_CHANNEL,
        });
    }
    
    sendPitchChange = (value) => {
        this.sendMIDI('pitch', {
            value,
            channel: DEFAULT_CHANNEL,
        });
    }

    releasePedal () {
        for (let i in this.playingNotes) {
            this.sendNoteOff(this.playingNotes[i]);
        }
        this.playingNotes = [];
    }

    releaseChordNotes () {
        for (let i in this.chordNotes) {
            this.sendNoteOff(this.chordNotes[i]);
        }
        this.chordNotes = [];
    }

    closeInstrument () {
        this.releasePedal();
        this.output.close();
    }
}

module.exports = MIDIHandler;