import Interface from './interface.mjs';

/**
 * Definition of concrete Interfaces
 * It declares all needed functions needed to be implemented to fulfil a working db-server-api
 */

/**
 * Interface for functions to provide for filter/ api
 *
 * @interface interfaceFilterDB
 */

/**
 * Filter data according to given filter and requested page number.
 *
 * @function
 * @name updateTableEntries
 * @param {Object[]} filter - Filter database has to process.
 * @param {number} limit - Max number of data elements that should be returned
 * @param {number} page - Page to load
 * @param {string} afterId - Last element returned in previous request
 * @param {*} sort - Not implemented yet, prepared for next developers
 * @returns {Object[]} Array of Objects where each object represents a row of the data table
 */

/**
 * Filters the data and counts hits for each facet value
 *
 * @function
 * @name nonRangeFacetFilter
 * @param {string} facet - Name of last Facet in entire query
 * @param {Object[]} filter
 * @return {Object[]} Array of objects with _id and count as keys. _id: represents name of facet value.
 */

/**
 * Filters the data and counts hits for each facet value
 *
 * @function
 * @name rangeFacetFilter
 * @param {number[] | string[]} ranges - Begin and end of range Array with two values [begin, end)).
 * @param {string} facet - Name of last Facet in entire query
 * @param {Object[]} filter
 * @return {Object[]} Array of objects with _id and count as keys. _id: represents name of facet value.
 */
const interfaceFilterDB = new Interface('AccessFilterDB', ['updateTableEntries',
    'nonRangeFacetFilter', 'rangeFacetFilter']);

/**
* Interface for functions to provide for /file-reader api
*
* @interface interfaceFilterDB
*/

/**
 * Creates an additional id field for each database entry in a type format that can be interpreted by the client.
 *
 * @function
 * @name createIds
 */
const interfaceReaderDB = new Interface('AccessReaderDB', ['createIds',
    'createColumnIndexes']);

export { interfaceFilterDB, interfaceReaderDB };
