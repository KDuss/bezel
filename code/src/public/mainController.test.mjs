import { Suite } from './test/test.js';
import MainController from './mainController.mjs';

const mainControllerTests = Suite('mainController');

/** Simulate behavior of a module */
const mockModule = id => {
    let nrOfUpdateCalls = 0;

    return {
        id,
        update: _ => (nrOfUpdateCalls += 1),
        getNrOfUpdateCalls: _ => nrOfUpdateCalls,
        getFilter: _ => [],
        reset: _ => (nrOfUpdateCalls = 0),
        deactivateFacet: _ => _,
        makeSelection: _ => _,
    };
};

mainControllerTests.add('Adding and activating/deactivating modules',
    assert => {
        const mainController = MainController();
        const m1 = mockModule('module1');
        const m2 = mockModule('module2');
        const m3 = mockModule('module3');
        const m4 = mockModule('module4');

        assert.is(mainController.availableModulesCount(), 0);

        // Add modules
        mainController.addModule(m1);
        mainController.addModule(m2);
        mainController.addModule(m3);
        mainController.addModule(m4);
        assert.is(mainController.availableModulesCount(), 4);

        // Illegal arguments are ignored
        mainController.addModule(null);
        mainController.addModule(undefined);
        assert.is(mainController.availableModulesCount(), 4);

        // Activate modules
        mainController.activateModule(m1);
        assert.is(m1.getNrOfUpdateCalls(), 1);
        mainController.activateModule(m2);
        assert.is(m1.getNrOfUpdateCalls(), 1);
        assert.is(m2.getNrOfUpdateCalls(), 1);
        mainController.activateModule(m3);

        // Check that activating the same module twice is not possible
        mainController.activateModule(m3);
        assert.is(mainController.activatedModulesCount(), 3);

        // Check that passing null or undefined doesn't add anything
        mainController.activateModule(null);
        mainController.activateModule(undefined);
        assert.is(mainController.activatedModulesCount(), 3);

        // Deactivate module
        mainController.deactivateModule(m3);
        assert.is(m3.getNrOfUpdateCalls(), 0); // Module is reset
        assert.is(mainController.activatedModulesCount(), 2);

        assert.is(m2.getNrOfUpdateCalls(), 1);
        mainController.deactivateModule(m1);
        assert.is(m2.getNrOfUpdateCalls(), 2);
        assert.is(mainController.activatedModulesCount(), 1);

        // Check that deactivating null or undefined does nothing
        mainController.deactivateModule(null);
        mainController.deactivateModule(undefined);
        assert.is(mainController.activatedModulesCount(), 1);

        // Check that deactivating module that is not activated does nothing
        mainController.deactivateModule(m4);
        assert.is(mainController.activatedModulesCount(), 1);
    });

mainControllerTests.add('Activating/deactivating facets',
    assert => {
        // Setup
        const mainController = MainController();
        const m1 = mockModule('module1');
        const m2 = mockModule('module2');
        const m3 = mockModule('module3');
        const m4 = mockModule('module4');
        const f1 = '';

        mainController.activateModule(m1);
        mainController.activateModule(m2);
        mainController.activateModule(m3);
        mainController.activateModule(m4);

        // Deactivating updates all subsequent modules (not including self)
        mainController.deactivateFacet(m4, f1); // doesn't update any module
        assert.is(m1.getNrOfUpdateCalls(), 1);
        assert.is(m2.getNrOfUpdateCalls(), 1);
        assert.is(m3.getNrOfUpdateCalls(), 1);
        assert.is(m4.getNrOfUpdateCalls(), 1);

        mainController.deactivateFacet(m3, f1); // updates m4
        assert.is(m1.getNrOfUpdateCalls(), 1);
        assert.is(m2.getNrOfUpdateCalls(), 1);
        assert.is(m3.getNrOfUpdateCalls(), 1);
        assert.is(m4.getNrOfUpdateCalls(), 2);

        mainController.deactivateFacet(m1, f1); // updates m2, m3, m4
        assert.is(m1.getNrOfUpdateCalls(), 1);
        assert.is(m2.getNrOfUpdateCalls(), 2);
        assert.is(m3.getNrOfUpdateCalls(), 2);
        assert.is(m4.getNrOfUpdateCalls(), 3);
    });

mainControllerTests.add('Make selection update',
    assert => {
        // Setup
        const mainController = MainController();
        const m1 = mockModule('module1');
        const m2 = mockModule('module2');
        const m3 = mockModule('module3');
        const f1 = '';

        mainController.activateModule(m1);
        mainController.activateModule(m2);
        mainController.activateModule(m3);

        // Make selection
        mainController.makeSelection(m1, f1, 'Selection'); // update m2, m3
        assert.is(m1.getNrOfUpdateCalls(), 1);
        assert.is(m2.getNrOfUpdateCalls(), 2);
        assert.is(m3.getNrOfUpdateCalls(), 2);

        mainController.makeSelection(m2, f1, 'Selection'); // update m3
        assert.is(m1.getNrOfUpdateCalls(), 1);
        assert.is(m2.getNrOfUpdateCalls(), 2);
        assert.is(m3.getNrOfUpdateCalls(), 3);

        mainController.makeSelection(m3, f1, 'Selection'); // no module updated
        assert.is(m1.getNrOfUpdateCalls(), 1);
        assert.is(m2.getNrOfUpdateCalls(), 2);
        assert.is(m3.getNrOfUpdateCalls(), 3);

        // Illegal arguments (nothing should happen)
        mainController.makeSelection(null, f1, 'Selection');
        mainController.makeSelection(undefined, f1, 'Selection');
        assert.is(m1.getNrOfUpdateCalls(), 1);
        assert.is(m2.getNrOfUpdateCalls(), 2);
        assert.is(m3.getNrOfUpdateCalls(), 3);
    });

export default mainControllerTests;
