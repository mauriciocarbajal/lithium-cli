const mappings = (key) => {
  switch(key.name) {
    case 'a': {
      return {
        text: `${ key.shift ? 'V7 -> I' : 'I'}`,
        grade: 1,
        secDom: key.shift,
      }
    }
    case 's': {
      return {
        text: `${ key.shift ? 'V7 -> IIm' : 'IIm'}`,
        grade: 2,
        secDom: key.shift,
      }
    }
    case 'd': {
      return {
        text: `${ key.shift ? 'V7 -> IIIm' : 'IIIm'}`,
        grade: 3,
        secDom: key.shift,
      }
    }
    case 'f': {
      return {
        text: `${ key.shift ? 'V7 -> IV' : 'IV'}`,
        grade: 4,
        secDom: key.shift,
      }
    }
    case 'g': {
      return {
        text: `${ key.shift ? 'V7 -> V7' : 'V7'}`,
        grade: 5,
        secDom: key.shift,
      }
    }
    case 'h': {
      return {
        text: `${ key.shift ? 'V7 -> VI' : 'VIm'}`,
        grade: 6,
        secDom: key.shift,
      }
    }
    case 'j': {
      return {
        text: `${ key.shift ? 'V7 -> VII' : 'VIIø'}`,
        grade: 7,
        secDom: key.shift,
      }
    }
    case 'k': {
      return {
        text: `${ key.shift ? 'V7 -> I' : 'I'}`,
        grade: 1,
        secDom: key.shift,
      }
    }
    case 'p': {
      return {
        text: 'up',
        secDom: key.shift,
        semitone: 1,
      }
    }
    case 'l': {
      return {
        text: 'down',
        secDom: key.shift,
        semitone: -1,
      }
    }
    case 'space': {
      return {
        text: 'release',
        secDom: key.shift,
        release: true,
      };
    }
    default: { 
      return {
        text: ' = ) ',
        secDom: key.shift,
        release: false,
      };
    }
  }
}

module.exports = { mappings }