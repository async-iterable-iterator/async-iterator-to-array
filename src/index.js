/**
 * Spreads an asynchronous iterator inside a new array.
 *
 * TODO Could be abstracted further with asyncIteratorForEach.
 *
 * @param {AsyncIterator<any>} asyncIterator - the input iterator.
 * @returns {Promise<any[]>} A new array filled with the elements of the input iterator.
 */
export const asyncIteratorToArray = async (asyncIterator) => {
	const array = [];
	for (;;) {
		// eslint-disable-next-line no-await-in-loop
		const {done, value} = await asyncIterator.next();
		if (done) break;
		array.push(value);
	}

	return array;
};
