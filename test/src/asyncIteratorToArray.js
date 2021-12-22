import test from 'ava';

import {asyncIteratorToArray} from '../../src/index.js';

test('works with sync iterator', async (t) => {
	const expected = [Math.random(), 3, 'x', {}, new Date()];
	const it = expected[Symbol.iterator]();
	const actual = await asyncIteratorToArray(it);
	t.deepEqual(actual, expected);
});

const asyncify = async function* (array) {
	// eslint-disable-next-line no-await-in-loop
	for (const x of array) yield await x;
};

const macro = async (t, expected) => {
	const asyncIterable = asyncify(expected);
	const asyncIterator = asyncIterable[Symbol.asyncIterator]();
	const actual = await asyncIteratorToArray(asyncIterator);
	t.deepEqual(actual, expected);
};

macro.title = (title, expected) => title ?? JSON.stringify(expected);

test(macro, [1, 2, 3]);
test(macro, [1, Math.random(), 3]);
test(macro, [1, Math.random(), 3]);
