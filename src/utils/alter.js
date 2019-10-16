const invert = (chord, invForm = 1) => {
  const [bass, a, b, c] = chord;
  
  if (invForm === 2) {
    return [bass, c - 12, a, b];

  } else if (invForm === 3) {
    return [bass, b - 12, c - 12, a];

  }

  return chord;
}

const addTension = (chord, tension) => {
  const [bass, a, b, c] = chord;

  if (tension === '9') {
    return [bass, a, b, c, a + 14];

  } else if (tension === 'b9') {
    return [bass, a, b, c, a + 13];

  } else if (tension === '#9') {
    return [bass, a, b, c, a + 15];

  } else if (tension === '11') {
    return [bass, a, b, c, a + 17];
  
  } else if (tension === '#11') {
    return [bass, a, b, c, a + 18]
  
  } else if (tension === 'b13') {
    return [bass, a, b, c, a + 20]

  } else if (tension === '13') {
    return [bass, a, b, c, a + 21]
  
  } else if (tension === '#13') {
    return [bass, a, b, c, a + 22]

  } else if (tension === 'sus2') {
    return [bass, a, a + 2, c]

  } else if (tension === 'sus4') {
    return [bass, a, a + 5, c]

  }
}

module.exports = {
  invert,
  addTension,
}