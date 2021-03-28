// midi wrapper
const easymidi = require('easymidi');

const DEFAULT_CHANNEL = 0;

class MIDIHandler {
    constructor() {
        this.output = new easymidi.Output('lithium-cli', true);
        this.melodyNotes = [];
        this.chordNotes = [];
        this.staccato = false;
    }

    toggleStaccato () {
        this.staccato = !this.staccato;
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
        if (this.staccato) {
            this.releaseMelodyNotes();
        }
        this.sendNoteOff(note);
        this.melodyNotes.push(note);
        this.sendMIDI('noteon', {
            note: note,
            velocity: this.staccato ? 80 : 75,
            channel: DEFAULT_CHANNEL,
        });
    }

    sendNoteChordOn (note) {
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
        const allNotes = [...this.chordNotes, ...this.melodyNotes];
        for (let i in allNotes) {
            this.sendNoteOff(allNotes[i]);
        }

        this.chordNotes = [];
        this.melodyNotes = [];
    }

    releaseChordNotes () {
        for (let i in this.chordNotes) {
            if (!this.melodyNotes.includes(i)) {
                this.sendNoteOff(this.chordNotes[i]);
            }
        }
        this.chordNotes = [];
    }

    releaseMelodyNotes () {
        for (let i in this.melodyNotes) {
            this.sendNoteOff(this.melodyNotes[i]);
        }
        this.melodyNotes = [];
    }

    closeInstrument () {
        this.releasePedal();
        this.output.close();
    }
}

module.exports = MIDIHandler;