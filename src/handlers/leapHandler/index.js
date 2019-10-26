const Leap = require('leapjs');

/**
 * This file will implement the leapjs loop
 * and includes the instrument, which is played
 * when certain conditions are met
*/

const processHand = (hand) => {
    if (hand) {
        const {
            palmPosition,
            palmNormal,
            type: handType,
        } = hand

        console.log({
          handType,
          palmPosition,
          palmNormal,
        });
    }
}

Leap.loop((leapFrame) => {
  const { hands } = leapFrame

  if (hands.length > 0) {
      let leftHand, rightHand
      leftHand = hands.filter(item => (item.type === 'left'))[0]
      rightHand = hands.filter(item => (item.type === 'right'))[0]
      if (leftHand) processHand(leftHand)
      if (rightHand) processHand(rightHand)
  }
});
