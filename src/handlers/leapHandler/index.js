const Leap = require('leapjs');
/**
 * This file will implement the leapjs loop
 * and includes the instrument, which is played
 * when certain conditions are met
*/

const SKIPPED_FRAMES = 1
let invokes = 0

const startLeap = (handler) => {
  Leap.loop((leapFrame) => {
    const { hands } = leapFrame
  
    if (hands.length > 0) {
        let leftHand, rightHand
        leftHand = hands.filter(item => (item.type === 'left'))[0]
        rightHand = hands.filter(item => (item.type === 'right'))[0]
        invokes = invokes + 1
        if (invokes === SKIPPED_FRAMES) {
            if (leftHand) handler(leftHand)
            if (rightHand) handler(rightHand)
            invokes = 0
        }
    } else {
      handler()
    }
  });
}

module.exports = {
  startLeap,
}
