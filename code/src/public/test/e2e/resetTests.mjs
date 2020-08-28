import { Suite } from '../test.js';
import { sleep } from '../../util/util.mjs';
import config from '../../config.mjs';

const resetTests = Suite('Reset function');

resetTests.add('For application, module and facet', async assert => {
    // Add modules
    const activatedModulesDiv = document
        .querySelector('.module-drop-area');

    const regularFacetAdd = document.querySelector('#m1');
    const tableFacetAdd = document.querySelector('#m2');

    regularFacetAdd.click();
    await sleep(config.testing.click_delay);
    tableFacetAdd.click();
    await sleep(config.testing.click_delay);
    tableFacetAdd.click();
    await sleep(config.testing.click_delay);

    assert.is(activatedModulesDiv.children.length, 4);

    // Add facet and make selection
    const addButton1 = document.querySelector('.m1 .f1 .and-btn');
    addButton1.click();
    await sleep(config.testing.click_delay);
    const facet1 = document.querySelector('.facet');

    facet1.querySelector('.tree-leaf label').click();
    await sleep(config.testing.click_delay);

    const table1 = activatedModulesDiv.children[1];
    const table2 = activatedModulesDiv.children[2];
    const table1Count = table1.querySelector('.count');
    const table2Count = table2.querySelector('.count');
    assert.is(Number(table1Count.innerText), 3);
    assert.is(Number(table2Count.innerText), 3);

    // Make selection on first table
    table1.querySelector('tbody tr').click();
    await sleep(config.testing.click_delay);
    assert.is(Number(table1Count.innerText), 3);
    assert.is(Number(table2Count.innerText), 1);

    // Reset first table
    table1.querySelector('.reset-module-btn').click();
    await sleep(config.testing.click_delay);
    assert.is(Number(table2Count.innerText), 3);

    // Reset facet
    facet1.querySelector('.reset-facet-btn').click();
    await sleep(config.testing.click_delay);
    assert.is(Number(table1Count.innerText), 10);
    assert.is(Number(table2Count.innerText), 10);

    // Get the regular module
    const regularModule = activatedModulesDiv.children[0];
    const containers = regularModule
        .querySelector('.facet-drop-area').children;

    // 1 facet is active
    assert.is(containers.length, 2);
    assert.is(containers[0].querySelectorAll('.facet').length, 1);

    // Reset the regular module
    regularModule.querySelector('.reset-module-btn').click();
    await sleep(config.testing.click_delay);

    // 0 facets is active
    assert.is(containers.length, 1);

    // Reset entire application
    const resetAll = document.querySelector('.reset-all-btn');
    resetAll.click();
    await sleep(config.testing.click_delay);

    assert.is(activatedModulesDiv.children.length, 1);
});

export default resetTests;
