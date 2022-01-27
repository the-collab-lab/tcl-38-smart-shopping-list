import cleanData from './cleanData';

test('Apples! returns apples', () => {
  expect(cleanData('Apples!')).toBe('apples');
});

test('red pepper returns redpepper', () => {
  expect(cleanData('red pepper')).toBe('redpepper');
});

test('B&$(#&^EaNs)))) returns beans', () => {
  expect(cleanData('B&$(#&^EaNs))))')).toBe('beans');
});

test('SWEET  potato returns sweetpotato', () => {
  expect(cleanData('SWEET  potato')).toBe('sweetpotato');
});

test('tofu  returns tofu', () => {
  expect(cleanData(' tofu ')).toBe('tofu');
});
