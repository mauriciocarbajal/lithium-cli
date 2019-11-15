const {
  CONTROL_MODULATION,
  CONTROL_PORTAMENTO,
  CONTROL_VOLUME,
  CONTROL_BALANCE,
 } = require('../../instrument/constants')

// const handState = {
//   roll: 0,
//   yaw: 0,
//   pitch: 0,
// }

// const detectHandRotation = (current, playChord) => {
//   const moves = ['roll', 'yaw', 'pitch'];
//   moves.forEach(move => {
//     if (!handState[move] && current[move] < 0) {
//       console.log('<', move);
//       if (move === 'roll') playChord(5, false);

//     } else if (!handState[move] && current[move] > 0) {
//       console.log('>', move);
//       if (move === 'roll') playChord(4, false);

//     } else if (handState[move] && !current[move]) {
//       console.log('=', move);
//       if (move === 'roll') playChord(1, false);
//     }
//     handState[move] = current[move];
//   })
// }

// function logSlider(position) {
//   // position will be between 0 and 100
//   var minp = 1;
//   var maxp = 127;

//   // The result should be between 100 an 10000000
//   var minv = Math.log(1);
//   var maxv = Math.log(127);

//   // calculate adjustment factor
//   var scale = (maxv-minv) / (maxp-minp);

//   return Math.exp(minv + scale*(position-minp));
// }

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

let handDetected = false;
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
    
    if (!handDetected) {
      handDetected = true;

      if (y < 50) {
        releasePedal();
      } else if (handType === 'right') {
        if (Math.round(-palmNormal[0]) === -1) {
          playChord(1, false, false);
        } else if (Math.round(-palmNormal[0]) === 0) {
          playChord(6, false, false);
        } else if (Math.round(-palmNormal[0]) === 1) {
          playChord(3, false, false);
        }
      } else {
        if (Math.round(-palmNormal[0]) === -1) {
          playChord(2, false, false);
        } else if (Math.round(-palmNormal[0]) === 0) {
          playChord(4, false, false);
        } else if (Math.round(-palmNormal[0]) === 1) {
          playChord(5, false, false);
        }
      }
      
    }

    mapToControl(sendControlChange, 400 - y, { MIN: 50, MAX: 400}, CONTROL_VOLUME);
    // mapToPitch(sendPitchChange, -palmNormal[2], { MIN: -1, MAX: 1 });

  } else {
    handDetected = false;
    // sendControlChange(0)
  }
})

module.exports = {
  playModifiers,
  handleInstrument,
}
