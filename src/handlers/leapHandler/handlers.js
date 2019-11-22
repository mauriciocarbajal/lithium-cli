const {
  CONTROL_MODULATION,
  CONTROL_PORTAMENTO,
  CONTROL_VOLUME,
  CONTROL_BALANCE,
 } = require('../../instrument/constants');

 const HEIGHT_THRESHOLD = 50;

const mapToControl = (sendControlChange, value, range, attribute) => {
  const { MIN, MAX } = range;

  let midiValue = Math.round(
    ((value - MIN) / (MAX - MIN)) * 128
  );
  
  if (midiValue < 0) midiValue = 0;
  if (midiValue > 127) midiValue = 127;

  sendControlChange((midiValue), attribute)
}

const mapToPitch = (sendPitchChange, value, range) => {
  const { MIN, MAX } = range;

  let midiValue = Math.round(((value - MIN) / (MAX - MIN)) * 16384);
  
  if (midiValue < 0) midiValue = 0;
  if (midiValue > 16384) midiValue = 16384;

  const DETUNE_FACTOR = 4;
  sendPitchChange(((DETUNE_FACTOR - 1) * 8192 + midiValue) / DETUNE_FACTOR)
}

const playModifiers = (instrumentFeatures) => ((hand) => {
  if (hand) {
      const {
          palmPosition,
          palmNormal,
          type: handType,
      } = hand;

      const [ x, y, z ] =  palmPosition;
      
      const { sendControlChange, sendPitchChange } = instrumentFeatures;
      mapToControl(sendControlChange, -palmNormal[0], { MIN: -1, MAX: 1 }, CONTROL_MODULATION);
      mapToControl(sendControlChange, y, { MIN: 50, MAX: 400}, CONTROL_VOLUME);
      // mapToPitch(sendPitchChange, -palmNormal[2], { MIN: -1, MAX: 1 });

  } else {
    // sendControlChange(0)
  }
})

let lastPlayed = '0000';
let leftHandAllows = true;

const handleInstrument = (instrumentFeatures) => ((hand) => {
  if (hand) {
    // Get hand data
    const {
      palmPosition,
      palmNormal,
      type: handType,
    } = hand;
    const [ x, y, z ] =  palmPosition;
    
    const { sendControlChange, playChord, releasePedal } = instrumentFeatures;

    let willPlayChord = 0;
    let willPlayMod1 = (Math.round(-palmNormal[2]) === 1);
    let willPlayMod2 = (Math.round(-palmNormal[0]) === 1);
    
    if (handType === 'right') {
      if (y < 200) {
        if (z > 0) {
          willPlayChord = 1;
        } else {
          willPlayChord = 4;
        }
      } else {
        if (z > 0) {
          willPlayChord = 6;
        } else {
          willPlayChord = 2;
        }
      }
    } else {
      // LEFT HAND
      if (y < HEIGHT_THRESHOLD) {
        releasePedal();
        lastPlayed = '0000';
        leftHandAllows = true;
      } else {
        mapToControl(sendControlChange, y, { MIN: HEIGHT_THRESHOLD, MAX: 400}, CONTROL_VOLUME);
        leftHandAllows = (Math.round(palmNormal[2]) !== -1);
        console.log('LEFT HAND ALLOWS', (Math.round(palmNormal[2]) !== -1), Math.round(palmNormal[2]));
      }
    }

    const willPlay = `${willPlayChord}${Number(willPlayMod1)}${Number(willPlayMod2)}${Number(leftHandAllows)}`

    if ((willPlay !== lastPlayed) && willPlayChord) {
      console.log({
        willPlay,
        lastPlayed,
        leftHandAllows,
      });

      if (leftHandAllows) {
        playChord(willPlayChord, willPlayMod1, willPlayMod2);
      }
      
      lastPlayed = willPlay;
    }

  } else {
    const { sendControlChange, releasePedal } = instrumentFeatures;
    releasePedal();
    sendControlChange(0, CONTROL_VOLUME);
    leftHandAllows = true;
  }
})

module.exports = {
  playModifiers,
  handleInstrument,
}
