import { Observable, ObservableList } from '../dataModel/observable/observable.js';

/**
 * Controller for a facet container.
 * @typedef {BezelContainer} FacetContainer
 * @property {function(RegularFacet):void} addFacet
 * @property {function(function(RegularFacet):void):void} onFacetAdd
 * @property {function(RegularFacet):void} removeFacet
 * @property {function(function(RegularFacet):void):void} onFacetRemove
 * @property {function(Filter[]):void} update
 * @property {function():Filter} getFilter
 * @property {function(RegularFacet):boolean} contains
 * @property {function():boolean} isEmpty
 * @property {function(function(number):void):void} onContainerCountChange
 */

/**
 * Create {@link FacetContainer}.
 * @returns {FacetContainer}
 */
const FacetContainer = () => {
    /** List of all facets currently active in this container. */
    const facets = ObservableList([]);

    /** Sum of all entries available in this container. */
    const containerCount = Observable(0);

    /**
     * Add facet to container.
     * @param {RegularFacet} facet
     */
    const addFacet = facet => facets.add(facet);

    /**
     * Remove facet from container.
     * @param {RegularFacet} facet
     */
    const removeFacet = facet => {
        facet.reset();
        facets.del(facet);
    };

    /**
     * Get the combined filter for all facets in this container.
     * @returns {Filter}
     */
    const getFilter = () => {
        const facetFilters = facets.list
            .map(f => f.getFilter())
            .filter(ff => Object.keys(ff).length !== 0);

        console.log('Container filter:', facetFilters);

        if (facetFilters.length === 0) {
            return {};
        }
        return facetFilters.reduce((acc, ff) => {
            [acc.or[Object.keys(ff)[0]]] = Object.values(ff);
            return acc;
        }, { or: {} });
    };

    /**
     * Update all facets within the container.
     * @param {Filter[]} filter
     */
    const update = filter => {
        console.log('container update filter', filter);
        facets.forEachAfter(-1, f => {
            f.update(filter)
                .then(count => {
                    if (count !== -1) containerCount.setValue(count);
                });
        });
    };

    /**
     * Check whether a facet is present in this container.
     * @param {RegularFacet} facet
     * @returns {boolean}
     */
    const contains = facet => facets.includes(facet);

    /**
     * Check whether the container is empty.
     * @returns {boolean}
     */
    const isEmpty = () => facets.isEmpty();

    return {
        addFacet,
        onFacetAdd: facets.onAdd,
        removeFacet,
        onFacetRemove: facets.onDel,
        update,
        getFilter,
        contains,
        isEmpty,
        onContainerCountChange: containerCount.onChange,
    };
};

export default FacetContainer;
