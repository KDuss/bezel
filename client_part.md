### Client

#### Add New Module

1. Add a new package ``sampleFacet`` to [code/src/public](code/src/public).
2. Within the package, create the files ``sampleModule.mjs`` for the module controller and ``sampleModuleProjector.mjs`` for the view .
3. Implement the following interface for your new module.

```javascript
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
```

4. Add the ``sampleModuleProjector`` to ``specificModuleProjector`` in [specificModuleProjector.mjs](code/src/public/specificModuleProjector.mjs).

```javascript
if (module.type === 'table') {
    tableModuleProjector(mainController, module, moduleContainer);
} else if (module.type === 'sample') {
    sampleModuleProjector(mainController, module, moduleContainer);
}
```

5. In [init.mjs](code/src/public/init.mjs), initialize the new module and add it to the ``mainController``.

```javascript
const mainController = MainController();
const newModule = SampleModule(id, name, moduleSpecificParams);
mainController.addModule(newModule);
```

#### Add New Facet

1. Create the files ``sampleFacet.mjs`` for the facet controller and ``sampleFacetProjector.mjs`` for the view in the same package as the module in which the facet will be integrated.
2. Implement the following interface for your new facet.

```javascript
/**
 * Interface for a generic facet.
 * @typedef {Object} Facet
 * @property {function(Filter[]):void} update - Refresh data with updated filter
 * @property {function(ObservablesCollection):void} makeSelection - Select or unselect element in model
 * @property {function():Filter} getFilter - Get filter for current facet
 */
```

3. If the facet needs to be initialized before being added to the module

#### Change Facet Visualization

Replace the facet projector in the module projector. The following example shows how it can be done for the table facet, assuming that ``alternativeTableFacetProjector`` is implemented.

```javascript
const tableModuleProjector = (mainController, module, root) => {
    alternativeTableFacetProjector(mainController, module, root);

    mainController.onModuleDeactivate((m, removeMe) => {
        if (m !== module) return;
        root.parentNode.removeChild(root);
        removeMe();
    });
};
```

*Remark: You can also implement ``tableFacetProjector`` in a different location and simply change the import in [tableModuleProjector.mjs](code/src/public/tableFacet/tableModuleProjector.mjs).*

#### Add New Tests

1. Create new test suite.

```javascript
const sampleTests = Suite('Description of what is tested');
```

2. Add new test case.

```javascript
// For unit test
sampleUnitTests.add('Function that is being tested', assert => { /* Tests here */ });

// For end-to-end test
sampleE2ETests.add('Part that is being tested', async assert => { /* Tests here */ });
```

3. Add assertions.

```javascript
// Compare values
assert.is(actual, expected);

// Check truthiness
assert.true(testResult);
```

*Remark*: For end-to-end tests a delay might be required to wait for the update after an interaction before checking result.

```javascript
await sleep(timeInMillis);
```

4. Add test suite to the list of tests to be executed in [allTests.mjs](code/src/public/test/allTests.mjs).

```javascript
// For unit tests
const unitTests = {
    observableTests,
    sampleUnitTests,
};

// For e2e tests (the key is displayed on the button to start the test)
const e2eTests = {
    'Module add/remove': moduleTests,
    'Functionality under test': sampleE2Etests,
};
```
