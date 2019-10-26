const {
  CONTROL_MODULATION,
  CONTROL_PORTAMENTO,
  CONTROL_VOLUME,
  CONTROL_BALANCE,
 } = require('../../instrument/constants')

const mapToControl = (sendControlChange, value, range, attribute) => {
  const { MIN, MAX } = range;

  let midiValue = Math.round(((value - MIN) / (MAX - MIN)) * 128);
  
  if (midiValue < 0) midiValue = 0;
  if (midiValue > 127) midiValue = 127;

  sendControlChange(midiValue, attribute)
}

const mapToPitch = (sendPitchChange, value, range) => {
  const { MIN, MAX } = range;

  let midiValue = Math.round(((value - MIN) / (MAX - MIN)) * 16384);
  
  if (midiValue < 0) midiValue = 0;
  if (midiValue > 16384) midiValue = 16384;

  const DETUNE_FACTOR = 4;
  sendPitchChange(((DETUNE_FACTOR - 1) * 8192 + midiValue) / DETUNE_FACTOR)
}

const handState = {
  roll: 0,
  yaw: 0,
  pitch: 0,
}

const detectHandRotation = (current, playChord) => {
  const moves = ['roll', 'yaw', 'pitch'];
  moves.forEach(move => {
    if (!handState[move] && current[move] < 0) {
      console.log('<', move);
      if (move === 'roll') playChord(5, false);

    } else if (!handState[move] && current[move] > 0) {
      console.log('>', move);
      if (move === 'roll') playChord(4, false);

    } else if (handState[move] && !current[move]) {
      console.log('=', move);
      if (move === 'roll') playChord(1, false);
    }
    handState[move] = current[move];
  })
}

const handleInstrument = (instrumentFeatures) => ((hand) => {
  if (hand) {
      const {
          palmPosition,
          palmNormal,
          type: handType,
      } = hand;

      const [ x, y, z ] =  palmPosition;
      
      const { sendControlChange, sendPitchChange } = instrumentFeatures;
      mapToControl(sendControlChange, -palmNormal[0], { MIN: -1, MAX: 1 }, CONTROL_BALANCE);
      mapToControl(sendControlChange, y, { MIN: 30, MAX: 500}, CONTROL_VOLUME);
      // mapToPitch(sendPitchChange, -palmNormal[2], { MIN: -1, MAX: 1 });

  } else {
    // sendControlChange(0)
  }
})

module.exports = {
  handleInstrument,
}
