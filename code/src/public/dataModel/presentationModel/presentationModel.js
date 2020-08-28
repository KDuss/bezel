import { Observable } from '../observable/observable.js';

const VALUE = 'value';
const VALID = 'valid';
const SELECTED = 'selected';
const FOCUS = 'focus';
const COUNT = 'count';
const ID = 'id';
const ROW_DATA = 'row_data';
const NEXT_PAGE = 'next_page';
const CURRENT_PAGE = 'current_page';
const PREV_PAGE = 'previous_page';
const LAST_PAGE = 'last_page';
const PAGE_NO = 'page_number';

/**
 * @typedef ObservablesCollection
 * @property {function} getObs - Return or create an Observable with specific name
 * @property {function} hasObs - Check if Observable with specific name exists
 */

/**
 * Create a new ObservablesCollection.
 * @param {any} value - Default value
 * @returns {ObservablesCollection}
 */
const ObservablesCollection = value => {
    const observables = {};

    const hasObs = name => Object.prototype
        .hasOwnProperty.call(observables, name);

    const getObs = (name, initValue = null) => {
        if (!hasObs(name)) observables[name] = Observable(initValue);
        return observables[name];
    };

    getObs(VALUE, value); // initialize the value at least

    return {
        getObs, hasObs,
    };
};

export {
    ObservablesCollection,
    VALID, VALUE, SELECTED, FOCUS, COUNT, ID,
    ROW_DATA, NEXT_PAGE, CURRENT_PAGE, PREV_PAGE, LAST_PAGE, PAGE_NO,
};
