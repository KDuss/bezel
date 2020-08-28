/**
 * Object that describes the selection for a single facet.
 * @typedef {Object} FacetSelection
 * @property {string[]} foci - Selected facet values
 * @property {string} groupType - How the facet is grouped
 * @property {any[]} grouping - Group description
 */

/**
 * @typedef {Object} FacetDescription
 * @property {string} id
 * @property {string} name
 * @property {string} sourceColumn - Refers to a column in the data set
 * @property {string} type - Flat or hierarchical
 * @property {string} groupType - Range, value or none
 * @property {Object[]} grouping - Description of how elements are grouped
 * @example
 * {
    id: 'f2',
    name: 'Location',
    sourceColumn: 'Location',
    type: 'hierarchical',
    groupType: 'value',
    grouping: [[{
        name: 'France',
        foci: ['Paris', 'Montpellier', 'Lyon', 'Toulouse'],
    }, {
        name: 'Italy',
        foci: ['Milan', 'Rome'],
    }]],
}
 */

/**
 * Interface for a generic facet.
 * @typedef {Object} Facet
 * @property {function(Filter[]):void} update - Refresh data with updated filter
 * @property {function(ObservablesCollection):void} makeSelection - Select or unselect element in model
 * @property {function():Filter} getFilter - Get filter for current facet
 */

/**
 * Interface for a structure containing multiple facets.
 * @typedef {Object} BezelContainer
 * @property {function(Filter[]):void} update - Refresh all contained facets
 * @property {function():Filter} getFilter - Get filter all contained facets
 */

/**
 * @typedef {Object} BezelModule
 * @property {string} id
 * @property {string} name
 * @property {string} type
 * @property {function(ObservablesCollection):void} makeSelection
 * @property {function():void} reset
 * @property {function(Filter):void} update
 * @property {Filter[]} getFilter
 * @property {BezelModule} getNewInstance
 */

/**
 * Describes the filter set for a facet (or a combination of facets).
 * It has either the property 'or' or the property 'and'.
 * @typedef {Object} Filter
 * @property {Object.<string, FacetSelection>} [or] - Facets are combined with 'and'
 * @property {Object.<string, FacetSelection>} [and] - Facets are combined with 'or'
 * @example
 * {
        or:
            {
                Surface: {
                    foci: ['Grass'],
                    groupType: 'none',
                    grouping: []
                },
                WRank: {
                    foci: ['1-10'],
                    groupType: 'range',
                    grouping: [{
                        name: 'unassigned',
                        foci: [],
                    }, {
                        name: '1-10',
                        foci: [1, 11]
                    }]
                }
            }
    }
 */
