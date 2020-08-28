import { ObservableList } from '../dataModel/observable/observable.js';
import FacetContainer from './facetContainer.mjs';
import { OPERATION } from '../util/util.mjs';

/**
 * Controller for a module with regular hierarchical facets.
 * @typedef {BezelModule} RegularFacetModule
 * @property {string} id
 * @property {string} name
 * @property {string} type
 * @property {ObservableList} allFacets - All facets available in this module
 * @property {function(RegularFacet):void} addFacet
 * @property {function(function(RegularFacet):void):void} onFacetAdd
 * @property {function(RegularFacet, number, Operation, Filter[]):void} activateFacet
 * @property {function(function(RegularFacet):void):void} onFacetActivateAnd
 * @property {function(RegularFacet, Filter[]):void} deactivateFacet
 * @property {function(function(FacetContainer):void):void} onContainerEmpty
 * @property {function(RegularFacet, ObservablesCollection, Filter[])} makeSelection
 * @property {function():void} reset - Reset all facets
 * @property {function(RegularFacet, Filter[]):void} resetFacetSelection - Reset single facet
 * @property {function(Filter[]):void} update
 * @property {function():Filter[]} getFilter
 * @property {function(FacetContainer, number, Filter[]):void} moveContainer
 * @property {function():RegularFacetModule} getNewInstance
 * @property {function(FacetContainer):number} indexOf
 * @property {function(string):RegularFacet} getFacetById
 */

/**
 * Create {@link RegularFacetModule}
 * @param {string} id
 * @param {string} name
 * @param {RegularFacet[]} facets
 * @returns {RegularFacetModule}
 */
const RegularFacetModule = (id, name, facets) => {
    /** Active facet containers. */
    const facetContainers = ObservableList([]);

    /** All facets that can be activated in this module. */
    const allFacets = ObservableList(facets);

    /**
     * Make facet available to the user.
     * @param {RegularFacetModule} facet
     */
    const addFacet = facet => allFacets.add(facet);

    /**
     * Returns the position (location within the module) of the given container.
     * @param {FacetContainer} container
     * @returns {number}
     */
    const indexOf = container => facetContainers.indexOf(container);

    /**
     * Returns the container that contains the facet.
     * @param {RegularFacet} facet
     * @returns {FacetContainer}
     */
    const getContainer = facet => facetContainers.list
        .find(c => c.contains(facet));

    const getFilterBefore = (container, moduleFilter, include) => {
        const position = include
            ? facetContainers.indexOf(container) + 1
            : facetContainers.indexOf(container);

        return [...moduleFilter, ...(facetContainers.list
            .filter(c => facetContainers.indexOf(c) < position)
            .map(c => c.getFilter())
            .filter(f => Object.keys(f).length !== 0))];
    };

    const updateSubsequent = (container,
                              moduleFilter,
                              include,
                              until = facetContainers.count()) => {
        const filter = getFilterBefore(container, moduleFilter, !include);
        const position = include
            ? facetContainers.indexOf(container) - 1
            : facetContainers.indexOf(container);
        facetContainers.forEachAfter(position, c => {
            if (indexOf(c) <= until) {
                c.update(filter);
                const containerFilter = c.getFilter();
                if (Object.keys(containerFilter).length !== 0) {
                    filter.push(containerFilter);
                }
            }
        });
    };

    /**
     * Make the facet available for use.
     * @param {RegularFacet} facet
     * @param {number} position - Location within the module
     * @param {Operation} operation
     * @param {Filter[]} filter
     */
    const activateFacet = (facet, position, operation, filter) => {
        // Disallow adding an already added facet
        if (facetContainers.list.some(c => c.contains(facet))) return;

        let container = FacetContainer();

        if (operation === OPERATION.AND) {
            if (position === -1) {
                facetContainers.add(container);
            } else {
                facetContainers.addAt(position)(container);
            }

            container.addFacet(facet);
        } else if (operation === OPERATION.OR) {
            container = facetContainers.get(position);

            if (container == null || container.contains(facet)) return;
            facetContainers.get(position).addFacet(facet);
        }
        console.log('ON ACTIVATION:', filter);
        container.update(getFilterBefore(container, filter, false));
    };

    /**
     * Remove facet from current selection.
     * @param {RegularFacet} facet
     * @param {Filter[]} filter
     */
    const deactivateFacet = (facet, filter) => {
        const container = getContainer(facet);
        console.log('CONTAINER', container);
        if (container == null) return;
        let containerPosition = indexOf(container);
        console.log('POS', containerPosition);
        container.removeFacet(facet);

        if (container.isEmpty()) {
            facetContainers.del(container);
            containerPosition -= 1;
            if (facetContainers.count() === 0) return;
        }

        const nextContainer = facetContainers.get(containerPosition);
        if (nextContainer == null) {
            updateSubsequent(facetContainers.get(0), filter, true);
            return;
        }
        updateSubsequent(nextContainer, filter, false);
    };

    /**
     * Move a container to a different position (location within the module).
     * @param {FacetContainer} container
     * @param {number} targetPosition
     * @param {Filter[]} filter
     */
    const moveContainer = (container, targetPosition, filter) => {
        const currentPosition = indexOf(container);
        facetContainers.move(container, currentPosition, targetPosition);
        console.log('moved from', currentPosition, 'to', targetPosition);

        const updatePosition = Math.min(currentPosition, targetPosition);
        const updateUntilPosition = Math.max(currentPosition, targetPosition);
        updateSubsequent(facetContainers.get(updatePosition), filter,
            true, updateUntilPosition);
    };

    /**
     * Make a selection on the facet and update all subsequent facets within the module.
     * @param {RegularFacet} facet
     * @param {RegularFacetTarget} target
     * @param {Filter[]} filter
     */
    const makeSelection = (facet, target, filter) => {
        facet.makeSelection(target);
        updateSubsequent(getContainer(facet), filter, false);
    };

    /**
     * Returns the filter for all containers in this module.
     * @returns {Filter[]}
     */
    const getFilter = _ => {
        const moduleFilter = facetContainers.list
            .map(c => c.getFilter())
            .filter(filter => Object.keys(filter).length !== 0);
        console.log(`Module filter (${name}):`, moduleFilter);
        return moduleFilter;
    };

    /**
     * Updates all active containers.
     * @param {Filter[]} filter
     */
    const update = filter => {
        console.log('Updating module');
        console.log('module update filter', filter);
        facetContainers.forEachAfter(-1, c => {
            c.update(filter);
            const containerFilter = c.getFilter();
            if (Object.keys(containerFilter).length !== 0) {
                filter.push(containerFilter);
            }
        });
    };

    const reset = _ => {
        allFacets.list.map(f => deactivateFacet(f, []));
    };

    const resetFacetSelection = (facet, filter) => {
        facet.reset();
        updateSubsequent(getContainer(facet), filter, false);
    };

    /**
     * Return facet based on its id.
     * @param {string} searchId
     * @returns {RegularFacet}
     */
    const getFacetById = searchId => allFacets.list
        .find(f => f.id === searchId);

    const getNewInstance = async _ => {
        const promises = allFacets.list.map(facet => facet.getNewInstance());
        const newInstances = await Promise.all(promises);
        console.log('new instances', newInstances);
        return RegularFacetModule(id, name, newInstances);
    };

    return {
        id,
        name,
        type: 'regular',
        allFacets,

        addFacet,
        onFacetAdd: allFacets.onAdd,
        activateFacet,
        onFacetActivateAnd: facetContainers.onAdd,
        deactivateFacet,
        onContainerEmpty: facetContainers.onDel,

        makeSelection,
        reset,
        resetFacetSelection,
        update,
        getFilter,
        moveContainer,
        getNewInstance,

        indexOf,
        getFacetById,
    };
};

export default RegularFacetModule;
