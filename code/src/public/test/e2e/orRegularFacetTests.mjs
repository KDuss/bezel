import { Suite } from '../test.js';
import { sleep } from '../../util/util.mjs';
import getFacetSum from './testUtil.mjs';
import config from '../../config.mjs';

const orRegularFacetTests = Suite('e2e: Combine facets with OR');

orRegularFacetTests.add('Combine facets with OR', async assert => {
    // Setup: add module, then add flat facet and hierarchical facet
    const regularFacet = document.querySelector('#m1');
    regularFacet.click();
    await sleep(config.testing.click_delay);

    document.querySelector('.f1 .and-btn').click();
    await sleep(config.testing.click_delay);
    document.querySelector('.f2 .and-btn').click();
    await sleep(config.testing.click_delay);

    // Add facet with OR to the first facet
    document.querySelector('.f3 .or-btn').click();
    await sleep(config.testing.click_delay);

    assert.is(getFacetSum('m1', 1), 10);

    // Make a selection
    const container1 = document.querySelector('.container');
    const container1Facets = container1.querySelectorAll('.facet');
    const f1Lis = container1Facets[0].querySelector('ul').children;
    const f2Lis = container1Facets[1].querySelector('ul').children;

    f1Lis[0].querySelector('label').click();
    await sleep(config.testing.click_delay);
    assert.is(getFacetSum('m1', 1), 3);

    f1Lis[2].querySelector('label').click();
    await sleep(config.testing.click_delay);
    assert.is(getFacetSum('m1', 1), 4);

    // Add selection to the second facet in the first container
    f2Lis[0].querySelector('input').click();
    await sleep(config.testing.click_delay);
    assert.is(getFacetSum('m1', 1), 5);
    assert.is(getFacetSum('m1', 0, 0), 10);
    assert.is(getFacetSum('m1', 0, 1), 10);

    // Reset
    const resetBtn = document.querySelector('.reset-all-btn');
    resetBtn.click();
    await sleep(config.testing.click_delay);

    // Setup 2: Add range facet and flat facet
    regularFacet.click();
    await sleep(config.testing.click_delay);

    document.querySelector('.f4 .and-btn').click();
    await sleep(config.testing.click_delay);
    document.querySelector('.f1 .and-btn').click();
    await sleep(config.testing.click_delay);

    // Add range facet with OR to the first facet
    document.querySelector('.f5 .or-btn').click();
    await sleep(config.testing.click_delay);

    // Make a selection
    const container1b = document.querySelector('.container');
    const container1Facetsb = container1b.querySelectorAll('.facet');
    const f1LisB = container1Facetsb[0].querySelector('ul').children;
    const f2LisB = container1Facetsb[1].querySelector('ul').children;

    f1LisB[1].querySelector('label').click();
    await sleep(config.testing.click_delay);
    assert.is(getFacetSum('m1', 1), 2);

    f1LisB[2].querySelector('label').click();
    await sleep(config.testing.click_delay);
    assert.is(getFacetSum('m1', 1), 7);

    // Add selection to the second facet in the first container
    f2LisB[3].querySelector('input').click();
    await sleep(config.testing.click_delay);
    assert.is(getFacetSum('m1', 1), 9);
    assert.is(getFacetSum('m1', 0, 0), 10);
    assert.is(getFacetSum('m1', 0, 1), 10);

    // Move first container to second position
    const facetContainers = document.querySelector('.facet-drop-area').children;
    facetContainers[0].querySelector('.move-right-btn').click();
    await sleep(config.testing.click_delay);
    assert.is(getFacetSum('m1', 0, 0), 10);
    assert.is(getFacetSum('m1', 1, 0), 10);
    assert.is(getFacetSum('m1', 1, 1), 10);

    // Select first option on first facet
    const flatFacet = facetContainers[0].querySelector('.facet');
    flatFacet.querySelector('.tree-leaf label').click();
    await sleep(config.testing.click_delay);
    assert.is(getFacetSum('m1', 0, 0), 10);
    assert.is(getFacetSum('m1', 1, 0), 3);
    assert.is(getFacetSum('m1', 1, 1), 3);

    // Reset
    resetBtn.click();
    await sleep(config.testing.click_delay);
});

export default orRegularFacetTests;
