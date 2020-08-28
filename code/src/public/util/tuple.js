/**
 * @return function that waits for the selector or the ctor for the remaining args
 */
const TupleCtor = n => values => {
    if (n === 0) {
        return Object.seal(selector => selector(values));
    }
    return value => TupleCtor(n - 1)([...values, value]);
};

const Tuple = n => {
    if (n < 1) throw new Error('Tuple must have first argument n > 0');

    return [
        TupleCtor(n)([]),
        ...Array.from({ length: n }, (it, idx) => values => values[idx]),
    ];
};

export default Tuple;
