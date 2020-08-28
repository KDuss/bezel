import { Suite } from '../test/test.js';
import { padLeft, padRight } from './strings.js';

const stringsTests = Suite('interface-strings');

// extending the prototype of many objects
stringsTests.add('padLeft', assert => {
    assert.is(padLeft('a', 2), ' a');
    assert.is(padLeft('a', 1), 'a');
    assert.is(padLeft('a', 0), 'a');
});

stringsTests.add('padRight', assert => {
    assert.is(padRight('a', 2), 'a ');
    assert.is(padRight('a', 1), 'a');
    assert.is(padRight('a', 0), 'a');
});

export default stringsTests;
