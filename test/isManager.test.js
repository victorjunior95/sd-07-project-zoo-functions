const assert = require('assert');
const zoo = require('../src/zoo');

describe('Implemente a função isManager', () => {
  it('Testa se o id passado é de um gerente', () => {
    let actual = zoo.isManager('9e7d4524-363c-416a-8759-8aa7e50c0992');
    let expected = false;
    assert.deepEqual(actual, expected);

    actual = zoo.isManager('0e7b460e-acf4-4e17-bcb3-ee472265db83');
    expected = true;
    assert.deepEqual(actual, expected);
  });
});
