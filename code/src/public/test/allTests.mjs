import observableTests from '../dataModel/observable/observable.test.js';
import treeTests from '../dataModel/tree/tree.test.js';
import mainControllerTests from '../mainController.test.mjs';
import moduleTests from './e2e/moduleTest.mjs';
import selectionRegularFacetTests from './e2e/selectionRegularFacetTests.mjs';
import moveRegularFacetTests from './e2e/moveRegularFacetTests.mjs';
import orRegularFacetTests from './e2e/orRegularFacetTests.mjs';
import tableFacetTests from '../tableFacet/tableFacet.test.mjs';
import tableSelectionTests from './e2e/tableFacetTests.mjs';
import resetTests from './e2e/resetTests.mjs';
import stringsTests from '../util/strings.test.js';

const e2eTests = {
    'Module add/remove': moduleTests,
    'Selection (regular)': selectionRegularFacetTests,
    'Move Facet': moveRegularFacetTests,
    'OR-combine': orRegularFacetTests,
    'Table Facet': tableSelectionTests,
    'Reset functions': resetTests,
};

const unitTests = {
    observableTests,
    treeTests,
    stringsTests,
    mainControllerTests,
    tableFacetTests,
};

export { e2eTests, unitTests };
