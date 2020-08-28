import {
    COUNT,
    FOCUS, ID, ObservablesCollection, SELECTED,
} from '../dataModel/presentationModel/presentationModel.js';
import { generateId } from '../util/util.mjs';
import Tree from '../dataModel/tree/tree.mjs';

/**
 * Helper function to search directly on the tree data instead of the node.
 * @param {Tree} tree
 * @param {function} predicate
 * @returns {Node}
 */
const findInData = (tree, predicate) => tree.find(node => {
    const nodeData = node.getData();
    if (nodeData == null) return false;
    return predicate(nodeData);
});

const defaultFoci = new Map();

/**
 * Adds a new node for a focus to the tree and returns the node.
 * The values needed in the presentation model are set.
 * @param {Tree} tree
 * @param {Node} parent
 * @param {string} focus
 * @param {number} count
 * @returns {Node} - Added node
 */
const addSelectableNode = (tree, parent, focus, count = 0) => {
    const option = ObservablesCollection(0);
    option.getObs(ID).setValue(generateId()); // add a generated id to make the checkboxes identifiable
    option.getObs(SELECTED).setValue('no');
    option.getObs(FOCUS).setValue(focus);
    option.getObs(COUNT).setValue(count);
    return tree.addNode(option, parent);
};

const compareAlphabetically = prop => (a, b) => {
    if (a[prop] == null || b[prop] == null) return 0;
    // Use toUpperCase() to ignore character casing
    const focus1 = a[prop].toString().toUpperCase();
    const focus2 = b[prop].toString().toUpperCase();

    if (focus1 === focus2) return 0;
    return (focus1 > focus2) ? 1 : -1;
};

/**
 * Recursively sum up the observable COUNT of a node's children.
 * When passed the root node of a tree, it calculates the COUNT for all
 * non-leaf nodes.
 * @param {Node} node
 * @returns {number}
 */
const calculateSumFromChildren = node => {
    const children = node.getChildren();
    let sum = 0;
    children.forEach(child => {
        sum += (child.isLeafNode())
            ? child.getData().getObs(COUNT).getValue()
            : calculateSumFromChildren(child);
    });
    if (node.getData()) node.getData().getObs(COUNT).setValue(sum);
    return sum;
};

/**
 * Build tree structure for a grouped facet.
 * @param {Tree} tree
 * @param {Object[][]} grouping - Description of how the facet is grouped
 * @param {string} grouping.name
 * @param {string} grouping.foci - Foci belonging to the group
 */
const addGroupedNodes = (tree, grouping) => {
    grouping.forEach(level => {
        console.log('Level description', level);
        const sortedLevel = [...level].sort(compareAlphabetically('name'));
        sortedLevel.forEach(group => {
            let parent = findInData(tree, d => d
                .getObs(FOCUS).getValue() === group.name);
            if (parent == null) {
                // Add top-level node
                parent = addSelectableNode(tree, tree.getRoot(), group.name);
            }
            const sortedFoci = [...(group.foci)].sort();
            sortedFoci.forEach(focus => {
                addSelectableNode(tree, parent, focus);
            });
        });
    });
    // Node to collect all foci that are not mentioned in the group description
    addSelectableNode(tree, tree.getRoot(), 'unassigned');
};

const setFacetState = async (facetDescription, prevFoci, service) => {
    const tree = Tree(ObservablesCollection(0));
    const root = tree.getRoot();
    let foci = prevFoci;
    console.log('Setting state', foci);
    if (foci == null) {
        foci = await service
            .getFilteredFoci(facetDescription, []);
        defaultFoci.set(facetDescription, foci);
    }

    const { type, grouping, groupType } = facetDescription;

    if (type === 'hierarchical') {
        addGroupedNodes(tree, grouping);
    }

    const unassignedNode = findInData(tree, d => d
        .getObs(FOCUS).getValue() === 'unassigned');

    const sortedFoci = [...foci].sort(compareAlphabetically('_id'));

    sortedFoci.forEach(focus => {
        const existing = findInData(tree, d => d
            .getObs(FOCUS).getValue() === focus._id);

        if (existing == null
            && (grouping.length === 0 || groupType === 'range')) { // No grouping
            addSelectableNode(tree, root, focus._id, focus.count);
        } else if (existing == null) { // Focus not mentioned in group description
            addSelectableNode(tree, unassignedNode, focus._id, focus.count);
        } else {
            existing.getData().getObs(COUNT).setValue(focus.count);
        }
    });

    calculateSumFromChildren(root);

    return tree;
};

/**
 * Presentation model for a single facet value
 * @typedef {ObservablesCollection} RegularFacetTarget
 * <p>The following are the Observables available in this ObservablesCollection:</p>
 * <p>ID - Unique identifier</p>
 * <p>FOCUS - Facet value from the data source</p>
 * <p>COUNT - Number of occurrences of this focus in the data set</p>
 * <p>SELECTED - Selection status</p>
 */

/**
 * Controller for a regular hierarchical facet.
 * @typedef {Facet} RegularFacet
 * @property {string} id
 * @property {string} name
 * @property {string} groupType
 * @property {Tree} state - Manages the facet values (text, count and selection status)
 * @property {function(Filter[]):number} update
 * @property {function():void} reset
 * @property {function(ObservablesCollection):void} makeSelection
 * @property {function():Object.<string, FacetSelection>} getFilter
 * @property {function():RegularFacet} getNewInstance
 */

/**
 * Create {@link RegularFacet}.
 * @param {FacetDescription} desc
 * @param {FacetService} service
 * @returns {RegularFacet}
 */
const RegularFacet = async (desc, service) => {
    /** Facet description */
    const {
        id, groupType, name, grouping, sourceColumn,
    } = desc;

    const initialize = async _ => setFacetState(desc,
        defaultFoci.get(desc), service);
    let updateOrder = [];

    const state = await initialize();

    /**
     * Returns the filter object for this facet.
     * @returns {Object.<string, FacetSelection>}
     */
    const getFilter = _ => {
        const selectedFoci = [];

        state.traverseTreeDown(state.getRoot(), node => {
            if (node.getData().getObs(SELECTED).getValue() === 'yes'
                && node.isLeafNode()) {
                const selectedFocus = node.getData().getObs(FOCUS).getValue();

                if (groupType === 'range') {
                    const selectedGroup = grouping
                        .find(group => group.name === selectedFocus);
                    selectedFoci.push(selectedGroup.foci);
                } else {
                    selectedFoci.push(selectedFocus);
                }
            }
        }, false);

        if (selectedFoci.length === 0) return {};

        return {
            [sourceColumn]: { foci: selectedFoci, groupType, grouping },
        };
    };

    /**
     * Update the state of the facet based on the set filter.
     * @param {Filter[]} filter
     */
    const update = async filter => {
        console.log('=====================');
        console.log('Updating: ', name);
        console.log('=====================');
        console.log('In facet: filter', filter);
        updateOrder = [filter, ...updateOrder];

        let foci;
        console.time(`Retrieve foci for regular facet: ${name}`);
        if (filter.length === 0) {
            foci = defaultFoci.get(desc);
        } else {
            foci = await service.getFilteredFoci(desc, filter.flat());
        }
        console.timeEnd(`Retrieve foci for regular facet: ${name}`);

        console.log('In facet: foci', foci);
        // After call to service, another query was made
        if (updateOrder.length === 0
            || (updateOrder[0] !== filter && updateOrder[0].length !== 0)) {
            console.log('Ignore old request');
            updateOrder = updateOrder.filter(f => f !== filter);
            return -1;
        }

        state.traverseTreeDown(state.getRoot(), node => {
            const nodeData = node.getData();
            const foundFocus = foci
                .find(f => f._id === nodeData.getObs(FOCUS).getValue());
            if (foundFocus) {
                nodeData.getObs(COUNT).setValue(foundFocus.count);
            } else {
                nodeData.getObs(COUNT).setValue(0);
            }
        }, false);

        updateOrder = [];
        // Recalculate count for upper levels
        calculateSumFromChildren(state.getRoot());
        return state.getRoot().getData().getObs(COUNT).getValue();
    };

    /**
     * Change the selection status of all children of the target node.
     * @param {Node} target
     * @param {'yes'|'no'} toSelect
     */
    const changeChildSelection = (target, toSelect) => {
        state.traverseTreeDown(target, node => {
            node.getData().getObs(SELECTED).setValue(toSelect);
        }, false);
    };

    /**
     * Change the selection of all ancestors in hierarchy.
     * Ensures that 'semi' is set correctly.
     * @param {Node} target
     * @param {'yes'|'no'} select
     */
    const changeAncestorSelection = (target, select) => {
        state.traverseTreeUp(target, ancestor => {
            if (ancestor.getData() == null) return;

            if (select === 'yes') {
                const allSelected = ancestor.getChildren()
                    .every(child => child
                        .getData().getObs(SELECTED).getValue() === 'yes');
                ancestor.getData().getObs(SELECTED)
                    .setValue(allSelected ? 'yes' : 'semi');
            } else {
                const anySelected = ancestor.getChildren()
                    .some(child => {
                        const selected = child.getData()
                            .getObs(SELECTED).getValue();
                        return selected === 'yes' || selected === 'semi';
                    });
                ancestor.getData().getObs(SELECTED)
                    .setValue(anySelected ? 'semi' : 'no');
            }
        }, false);
    };

    /**
     * Select a focus on the facet.
     * @param {RegularFacetTarget} target
     */
    const makeSelection = target => {
        console.log('selecting:', target);

        const targetNode = findInData(state, d => d.getObs(ID).getValue()
            === target.getObs(ID).getValue());

        const selectionStatus = target.getObs(SELECTED).getValue();
        const newSelectionStatus = (selectionStatus === 'yes') ? 'no' : 'yes';

        target.getObs(SELECTED).setValue(newSelectionStatus);

        changeChildSelection(targetNode, newSelectionStatus);
        changeAncestorSelection(targetNode, newSelectionStatus);
    };

    const reset = _ => {
        state.traverseTreeDown(state.getRoot(), node => {
            if (node.getData()) {
                node.getData().getObs(SELECTED).setValue('no');
            }
        }, true);
    };

    const getNewInstance = async _ => RegularFacet(desc, service);

    return {
        id,
        name,
        groupType,
        state,

        update,
        reset,
        makeSelection,
        getFilter,
        getNewInstance,
    };
};

export default RegularFacet;
