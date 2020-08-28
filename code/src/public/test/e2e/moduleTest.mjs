import { Suite } from '../test.js';
import { sleep } from '../../util/util.mjs';
import config from '../../config.mjs';

const moduleTests = Suite('e2e: modules');

moduleTests.add('adding/removing modules', async assert => {
    const activatedModulesDiv = document
        .querySelector('.module-drop-area');

    const regularFacetAdd = document.querySelector('#m1');
    const tableFacetAdd = document.querySelector('#m2');

    assert.is(activatedModulesDiv.children.length, 1);

    // Adding regular facet module
    regularFacetAdd.click();
    await sleep(config.testing.click_delay);
    assert.is(activatedModulesDiv.children.length, 2);

    // Adding second regular facet module
    regularFacetAdd.click();
    await sleep(config.testing.click_delay);
    assert.is(activatedModulesDiv.children.length, 3);

    // Adding table facet module
    tableFacetAdd.click();
    await sleep(config.testing.click_delay);
    assert.is(activatedModulesDiv.children.length, 4);

    const firstRegularFacetsModule = activatedModulesDiv.children[0];
    const removeFirstModuleButton = firstRegularFacetsModule
        .querySelector('.remove-module-btn');

    // Remove first module
    removeFirstModuleButton.click();
    await sleep(config.testing.click_delay);
    assert.is(activatedModulesDiv.children.length, 3);
    assert.is(activatedModulesDiv.contains(firstRegularFacetsModule), false);

    // Remove other two modules
    const removeButtons = activatedModulesDiv
        .querySelectorAll('.remove-module-btn');
    Array.from(removeButtons).forEach(btn => btn.click());
    await sleep(config.testing.click_delay);
    assert.is(activatedModulesDiv.children.length, 1);
});

export default moduleTests;
