import './facetServiceDoc.js';
import config from '../config.mjs';
import { Observable } from '../dataModel/observable/observable.js';

/**
 * Number of entries to be return when fetching data.
 * @type {number}
 */
const PAGE_SIZE = config.pagination.page_size;
const FIRST_PAGE = config.pagination.first_page;
const PORT = config.app.port;
const DOMAIN = config.app.domain;

const INIT_TABLE_URL = `/filter/table-entries?limit=${PAGE_SIZE}&page=${FIRST_PAGE}`;
const URL_FILTERED_FOCI = `${DOMAIN}:${PORT}/filter/facet-values?facet=`;

const loadingCount = Observable(0);

/**
 * Fetch {@Link PAGE_SIZE} entries fulfilling a filter from the database.
 * Also returns the total amount of entries for the given filter.
 * @param {Filter[]} filter
 * @param {string} url
 * @returns {Promise<FilteredDataResponse>}
 */
const getFilteredData = (filter, url) => {
    console.log('Calling remote: getFilteredData');
    console.log('filter', filter);

    loadingCount.setValue(loadingCount.getValue() + 1);

    const FETCH_URL = url != null ? `${DOMAIN}:${PORT}${url}` : `${DOMAIN}:${PORT}${INIT_TABLE_URL}`;

    return fetch(FETCH_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8',
        },
        body: JSON.stringify(filter),
    })
        .then(res => res.json())
        .then(d => ({
            data: d.entries,
            count: d.count,
            links: d.links,
            currentPage: d.page,
            lastPage: d.lastPage,
        }))
        .finally(_ => {
            loadingCount.setValue(loadingCount.getValue() - 1);
        });
};

/**
 *
 * @param {FacetDescription} facetDescription
 * @param {Filter[]} filter
 * @returns {Promise<FocusCount[]>}
 */
const getFilteredFoci = (facetDescription, filter) => {
    console.log('calling remote');
    console.log('getFilteredFoci filter', filter);

    const { groupType, grouping, sourceColumn } = facetDescription;
    loadingCount.setValue(loadingCount.getValue() + 1);

    return fetch(URL_FILTERED_FOCI + sourceColumn, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8',
        },
        body: JSON.stringify({
            filter,
            groupType,
            grouping,
        }),
    })
        .then(res => res.json())
        .finally(() => loadingCount.setValue(loadingCount.getValue() - 1));
};

/**
 * Factory for remote {@link FacetService} functions. Communicates with server.
 * @returns { FacetService }
 */
const facetServices = () => ({
    getFilteredFoci,
    getFilteredData,
});

export { facetServices, loadingCount };
