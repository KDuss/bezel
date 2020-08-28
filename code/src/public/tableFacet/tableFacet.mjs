import {
    FOCUS, ID,
    ObservablesCollection,
    ROW_DATA,
    SELECTED,
    NEXT_PAGE,
    CURRENT_PAGE,
    LAST_PAGE,
    PREV_PAGE,
    PAGE_NO,
} from '../dataModel/presentationModel/presentationModel.js';
import { Observable, ObservableList } from '../dataModel/observable/observable.js';
import { generateId } from '../util/util.mjs';
import filterAccepts from '../util/filterUtil.mjs';
import config from '../config.mjs';

/**
 * Presentation model for a single table entry
 * @typedef {ObservablesCollection} TableFacetTarget
 * <p>The following are the Observables available in this ObservablesCollection:</p>
 * <p>ID - Unique identifier</p>
 * <p>FOCUS - Id value from data source</p>
 * <p>ROW_DATA - All columns for this entry</p>
 * <p>SELECTED - Selection status</p>
 * <p>PREV_PAGE - Previous page for lazy loading</p>
 * <p>CURRENT_PAGE - Current page for lazy loading</p>
 * <p>NEXT_PAGE - Next page for lazy loading</p>
 * <p>LAST_PAGE - Last page for lazy loading</p>
 * <p>PAGE_NO - Page number for lazy loading</p>
 */

/**
 * Controller for a table facet.
 * @typedef {Facet} TableFacet
 * @property {ObservableList} state - List of {@link ObservablesCollection} containing information about data set entries
 * @property {ObservablesCollection} countState
 * @property {ObservablesCollection} paginationState
 * @property {function(string):void} lazyLoading - Load more entries from service
 * @property {function(Filter[]):void} update
 * @property {function(ObservablesCollection):void} makeSelection
 * @property {function():Object.<string, FacetSelection>} getFilter
 * @property {function():void} reset
 * @property {function(function(ObservablesCollection):void):void} onRowRemove
 * @property {function(function(number):void):void} onSelectionChange
 */

/**
 * Create {@link TableFacet}.
 * @param {FacetService} service
 * @return {TableFacet}
 */
const TableFacet = service => {
    const state = ObservableList([]);
    const countState = ObservablesCollection(0);
    const paginationState = ObservablesCollection(0);
    let selection = [];
    const selectionCount = Observable(0);
    let cachedFilter = [];
    let updating = false;

    /**
     * Returns the filter object for this facet.
     * @returns  {Object.<string, FacetSelection>}
     */
    const getFilter = _ => {
        if (selection.length === 0) return {};
        const selectionIds = selection.map(s => s.id);
        return {
            [config.app.idColumnName]:
                { foci: selectionIds, groupType: 'none', grouping: [] },
        };
    };

    /**
     * Set attributes for pagination
     * @param {Object} links - Shortcut url links for next request
     * @param {Number} lastPage
     * @param {Number} currentPage
     */
    const setPaginationAttr = (links, lastPage, currentPage) => {
        if (links) {
            paginationState.getObs(NEXT_PAGE).setValue(links.next);
            paginationState.getObs(CURRENT_PAGE).setValue(links.current);
            paginationState.getObs(PREV_PAGE).setValue(links.prev);
        }
        paginationState.getObs(LAST_PAGE).setValue(lastPage);
        paginationState.getObs(PAGE_NO).setValue(currentPage);
    };

    /**
     * @param {Object[]} data
     */
    const setRowData = data => {
        data.forEach(item => {
            const option = ObservablesCollection(0);
            option.getObs(ID).setValue(generateId());
            option.getObs(FOCUS).setValue(item.id);
            option.getObs(ROW_DATA).setValue(item);
            state.add(option);

            // Keep selection if the same is shown
            const selectionIds = selection.map(s => s.id);
            if (selectionIds.includes(option.getObs(FOCUS).getValue())) {
                option.getObs(SELECTED).setValue('yes');
            } else {
                option.getObs(SELECTED).setValue('no');
            }
        });
    };

    /**
     * Trigger fetching next data bucket for table
     * @param {string} pageLink - URL to get next entries to load
     */
    const lazyLoading = async pageLink => {
        if (updating) {
            console.log('lazy loading disabled');
            return;
        }
        const {
            data,
            links,
            currentPage,
            lastPage,
        } = await service.getFilteredData(cachedFilter, pageLink);

        setPaginationAttr(links, lastPage, currentPage);
        setRowData(data);
    };

    /**
     * Update the values of the facet based on the given filter.
     * @param {Filter[]} filter - Describes the selection set in all preceding facets and modules
     */
    const update = async filter => {
        console.log('Updating table facet');
        console.time('Retrieving table entries.');
        updating = true;
        cachedFilter = filter;

        const {
            data,
            count,
            links,
            currentPage,
            lastPage,
        } = await service.getFilteredData(filter);
        console.timeEnd('Retrieving table entries.');

        // Check if data still needs to be updated
        if (cachedFilter !== filter) {
            console.log('Ignore old request');
        } else {
            setPaginationAttr(links, lastPage, currentPage);
            countState.getObs('count').setValue(count);

            while (!state.isEmpty()) {
                state.del(state.get(0));
            }

            // Check if selections still fulfill filter
            selection = selection.filter(row => {
                if (!filterAccepts(row, filter)) {
                    selectionCount.setValue(selectionCount.getValue() - 1);
                    return false;
                }
                return true;
            });

            setRowData(data);
        }
        updating = false;
    };

    /**
     * Select a row of the table.
     * @param {TableFacetTarget} target
     */
    const makeSelection = target => {
        if (updating) return;

        const currentStatus = target.getObs(SELECTED).getValue();

        if (currentStatus === 'yes') {
            selection = selection
                .filter(s => s.id !== target.getObs(FOCUS).getValue());
            selectionCount.setValue(selectionCount.getValue() - 1);
        } else {
            selection = [...selection, target.getObs(ROW_DATA).getValue()];
            selectionCount.setValue(selectionCount.getValue() + 1);
        }

        target.getObs(SELECTED)
            .setValue(currentStatus === 'yes' ? 'no' : 'yes');
    };

    const reset = _ => {
        state.forEachAfter(-1, row => row.getObs(SELECTED).setValue('no'));
        selection = [];
        selectionCount.setValue(0);
    };

    return {
        state,
        countState,
        paginationState,
        lazyLoading,
        update,
        makeSelection,
        getFilter,
        reset,
        onRowRemove: state.onDel,
        onSelectionChange: selectionCount.onChange,
    };
};

export default TableFacet;
