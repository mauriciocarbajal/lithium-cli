// midi wrapper
const easymidi = require('easymidi');

const DEFAULT_CHANNEL = 0;

class MIDIHandler {
    constructor() {
        this.output = new easymidi.Output('lithium-cli', true);
        this.playingNotes = [];
    }

    sendMIDI (midiEvent, midiParams) {
        if (midiEvent === 'noteon') {
            this.sendNoteOff(midiParams.note);
            this.playingNotes.push(midiParams.note);
        }
        
        this.output.send(midiEvent, midiParams);
    };

    sendNoteOff (note) {
        this.sendMIDI('noteoff', {
            note: note,
            velocity: 127,
            channel: DEFAULT_CHANNEL,
        });
    }

    sendNoteOn (note, velocity = 64) {
        this.sendMIDI('noteon', {
            note: note,
            velocity,
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
        console.log('this.playingNotes', this.playingNotes);
        for (let i in this.playingNotes) {
            this.sendNoteOff(this.playingNotes[i]);
        }
        this.playingNotes = [];
    }

    closeInstrument () {
        this.releasePedal();
        this.output.close();
    }
}

module.exports = MIDIHandler;