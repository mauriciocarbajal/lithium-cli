const highlight = (text) => (`\x1b[33m${text}\x1b[0m`)

const showInstructions = () => {
  console.log('Instructions:')
  console.log(`a: ${highlight('C')}               shift + a: ${highlight('G7')}`);
  console.log(`s: ${highlight('Dm')}              shift + s: ${highlight('A7')}`);
  console.log(`d: ${highlight('Em')}              shift + d: ${highlight('B7')}`);
  console.log(`f: ${highlight('F')}               shift + f: ${highlight('C7')}`);
  console.log(`g: ${highlight('G')}               shift + g: ${highlight('D7')}`);
  console.log(`h: ${highlight('Am')}              shift + h: ${highlight('E7')}`);
  console.log(`j: ${highlight('Bø')}              shift + j: ${highlight('Bø')}`);
  console.log('');
  console.log('');
  console.log('space: release notes');
  console.log('p: modulate one semitone up');
  console.log('l: modulate one semitone down');
}

module.exports = { showInstructions, highlight };