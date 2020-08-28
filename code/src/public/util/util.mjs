const generateId = _ => Math.random()
    .toString(36)
    .substr(2, 9);

/**
 * @typedef {'and'|'or'} Operation
 */

const OPERATION = {
    AND: 'and',
    OR: 'or',
};

const domElement = (type, ...classes) => {
    const newElement = document.createElement(type);
    if (classes.length !== 0) newElement.classList.add(...classes);
    return newElement;
};

/**
 * Adds delay to the execution of subsequent code.
 * Used for UI tests, because click events run asynchronously.
 * Usage in test: await sleep(10);
 * @param {number} millis - Duration of delay
 */
const sleep = millis => new Promise(
    res => setTimeout(_ => res(), millis),
);

const addThousandsSeparator = nr => nr.toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, '\'');

const doNothing = x => x;

export {
    generateId, addThousandsSeparator, domElement, OPERATION, sleep, doNothing,
};
