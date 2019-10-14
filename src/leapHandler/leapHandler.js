const MAX_INVOKES = 60
const Y_THRESHOLD = 130
const Z_THRESHOLD = 75

let instrumentActive = false

const playFromHand = (handStatus, handType, processKeyPress) => {
    const { y, z, roll, pitch } = handStatus

    if (handType === 'left') {
        if (pitch === 'initial') {
            //processKeyPress('a', false, false)
        }
    } else {
        if (roll === 'initial') {
            if (y === 'initial') {
                processKeyPress('a', false, false)
            } else {
                processKeyPress('h', false, false)
            }
        } else if (roll === 'right') {
            if (y === 'initial') {
                processKeyPress('f', false, false)
            } else {
                processKeyPress('s', false, false)
            }
            
        } else if (roll === 'left') {
            if (y === 'initial') {
                processKeyPress('g', false, false)
            } else {
                processKeyPress('h', false, true)
            }
        }
    }
}

const handInitialStatus = {
    y: 'initial',
    z: 'initial',
    roll: 'initial',
    pitch: 'up'
}

const leftHandStatus = Object.assign({}, handInitialStatus)
const rightHandStatus = Object.assign({}, handInitialStatus)

let invokes = 0

const processHand = (hand, processKeyPress) => {
    if (hand) {
        const {
            palmPosition,
            palmNormal,
            type: handType,
        } = hand

        const [roll, yaw, pitch] = palmNormal.map(item => Math.round(item))

        const handStatus = handType === 'left' ? leftHandStatus : rightHandStatus

        const handStatusInitial = Object.assign({}, handStatus)

        // Update Y
        if (handStatus.y === 'initial' && palmPosition[1] > Y_THRESHOLD) {
            handStatus.y = 'top'
            // console.log(handType, 'hand up')
        } else if (handStatus.y === 'top' && palmPosition[1] < Y_THRESHOLD) {
            handStatus.y = 'initial'
            // console.log(handType, 'hand down')
        }

        // Update Z
        if (handStatus.z !== 'bottom' && palmPosition[2] > Z_THRESHOLD) {
            handStatus.z = 'bottom'
            // console.log(handType, 'to the bottom')
        } else if (handStatus.z !== 'front' && palmPosition[2] < -Z_THRESHOLD) {
            handStatus.z = 'front'
            // console.log(handType, 'to the front')
        } else if (handStatus.z !== 'initial' && (palmPosition[2] > -Z_THRESHOLD) && (palmPosition[2] < Z_THRESHOLD)) {
            handStatus.z = 'initial'
            // console.log(handType, 'to z initial')
        }

        // Update ROLL
        if (handStatus.roll !== 'left' && roll === 1) {
            handStatus.roll = 'left'
            // console.log(handType, 'ROLL left')
        } else if (handStatus.roll !== 'right' && roll === -1) {
            handStatus.roll = 'right'
            // console.log(handType, 'ROLL right')
        } else if (handStatus.roll !== 'initial' && roll === 0) {
            handStatus.roll = 'initial'
            // console.log(handType, 'ROLL initial')
        }

        // Update PITCH
        if (handStatus.pitch !== 'down' && pitch === 1) {
            handStatus.pitch = 'down'
            // console.log(handType, 'pitch down')
        } else if (handStatus.pitch !== 'up' && pitch === -1) {
            handStatus.pitch = 'up'
            // console.log(handType, 'pitch up')
        } else if (handStatus.pitch !== 'initial' && pitch === 0) {
            handStatus.pitch = 'initial'
            // console.log(handType, 'PITCH initial')
        }

        if (JSON.stringify(handStatus) !== JSON.stringify(handStatusInitial)) {
            if (handType === 'right') {
                playFromHand(handStatus, handType, processKeyPress)
            }
        }
    }
}

const leapHandler = (processKeyPress) => {
    return (leapFrame) => {
        const { hands } = leapFrame

        if (hands.length > 0) {
            instrumentActive = true
            let leftHand, rightHand
            leftHand = hands.filter(item => (item.type === 'left'))[0]
            rightHand = hands.filter(item => (item.type === 'right'))[0]
            invokes = invokes + 1
            if (invokes === MAX_INVOKES) {
                if (leftHand) processHand(leftHand, processKeyPress)
                if (rightHand) processHand(rightHand, processKeyPress)
                invokes = 0
            }
        } else {
            if (instrumentActive) {
                processKeyPress('space', false, false)
                instrumentActive = false
            }
        }
    }
}

module.exports = leapHandler
