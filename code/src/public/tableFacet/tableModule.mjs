import TableFacet from './tableFacet.mjs';

/**
 * Controller for a module of type table.
 * @typedef {BezelModule} TableModule
 * @param {string} name displayed in the title.
 * @param {FacetService} service
 * @param {string[]} columnsToIgnore
 * @property {string} name
 * @property {string} type
 * @property {TableFacet} facet
 * @property {string[]} columnsToIgnore
 * @property makeSelection
 * @property reset
 * @property update
 * @property getFilter
 * @property getNewInstance
 * @return {TableModule}
 */

/**
 * Create {@link TableModule}
 * @param {string} id
 * @param {string} name
 * @param {FacetService} service
 * @param {string[]} columnsToIgnore - Array of columns that are ignored
 * @returns {TableModule}
 */
const TableModule = (id, name, service, columnsToIgnore = []) => {
    const facet = TableFacet(service);

    /**
     * Relays to facet.
     * @param {TableFacet} f
     * @param {TableFacetTarget} target
     */
    const makeSelection = (f, target) => {
        f.makeSelection(target);
    };

    /**
     * Relays to facet.
     * @returns {Filter[]}
     */
    const getFilter = _ => {
        const moduleFilter = facet.getFilter();
        if (Object.keys(moduleFilter).length === 0) return [];
        return [{ or: moduleFilter }];
    };

    /**
     * Relays to facet.
     * @param {Filter[]} filter
     */
    const update = filter => {
        console.log('=====================');
        console.log('Updating: ', name);
        console.log('=====================');
        console.log('In facet: filter', filter);
        facet.update(filter);
    };

    const reset = _ => facet.reset();

    const getNewInstance = _ => TableModule(id, name,
        service, columnsToIgnore);

    return {
        id,
        name,
        type: 'table',
        facet,
        columnsToIgnore,
        makeSelection,
        reset,
        update,
        getFilter,
        getNewInstance,
    };
};

export default TableModule;
