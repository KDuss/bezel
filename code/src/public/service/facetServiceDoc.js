/**
 * Service response to request for filtered data entries.
 *
 * @typedef {Object} FilteredDataResponse
 * @property {Object[]} data - Entries in data source (all columns)
 * @property {number} count - Number of entries
 * @property {Object} links - Links for fetching previous, current and next page of entries
 * @property {number} currentPage
 * @property {number} lastPage
 */

/**
 * @typedef {Object} FocusCount
 * @property {string} _id - Focus text
 * @property {number} count - Number of times the focus occurs
 */

/**
 * Interface for service.
 *
 * @typedef {Object} FacetService
 * @property {function(Filter[], string): Promise<FilteredDataResponse>} getFilteredData
 * @property {function(FacetDescription, Filter[]): Promise<FocusCount[]>} getFilteredFoci
 */
