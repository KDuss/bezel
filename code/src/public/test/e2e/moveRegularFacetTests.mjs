import { Suite } from '../test.js';
import { sleep } from '../../util/util.mjs';
import config from '../../config.mjs';
import getFacetSum from './testUtil.mjs';

const moveRegularFacetTests = Suite('e2e: Move facets');

moveRegularFacetTests.add('Change position of facets', async assert => {
    // Setup: add module, then add flat facet, hierarchical facet and range facet
    const regularFacet = document.querySelector('#m1');
    regularFacet.click();
    await sleep(config.testing.click_delay);

    document.querySelector('.f1 .and-btn').click();
    await sleep(config.testing.click_delay);
    document.querySelector('.f2 .and-btn').click();
    await sleep(config.testing.click_delay);
    document.querySelector('.f4 .and-btn').click();
    await sleep(config.testing.click_delay);

    // Make a selection
    const facets = document.querySelectorAll('.facet');
    const f1Lis = facets[0].querySelector('ul').children;
    const f2Lis = facets[1].querySelector('ul').children;
    const f3Lis = facets[2].querySelector('ul').children;
    f1Lis[1].querySelector('label').click();
    await sleep(config.testing.click_delay);
    f1Lis[3].querySelector('label').click();
    await sleep(config.testing.click_delay);
    f2Lis[2].querySelector('input').click();
    await sleep(config.testing.click_delay);
    f3Lis[2].querySelector('label').click();
    await sleep(config.testing.click_delay);

    assert.is(getFacetSum('m1', 0), 10);
    assert.is(getFacetSum('m1', 1), 6);
    assert.is(getFacetSum('m1', 2), 5);

    const facetContainers = document.querySelector('.facet-drop-area').children;

    // Move facet f1 right
    facetContainers[0].querySelector('.move-right-btn').click();
    await sleep(config.testing.click_delay);

    assert.is(getFacetSum('m1', 0), 10);
    assert.is(getFacetSum('m1', 1), 7);
    assert.is(getFacetSum('m1', 2), 5);

    // Move f1 right again
    facetContainers[1].querySelector('.move-right-btn').click();
    await sleep(config.testing.click_delay);

    assert.is(getFacetSum('m1', 0), 10);
    assert.is(getFacetSum('m1', 1), 7);
    assert.is(getFacetSum('m1', 2), 5);

    // Move f1 back
    facetContainers[2].querySelector('.move-left-btn').click();
    await sleep(config.testing.click_delay);

    assert.is(getFacetSum('m1', 0), 10);
    assert.is(getFacetSum('m1', 1), 7);
    assert.is(getFacetSum('m1', 2), 5);

    // Move f1 back
    facetContainers[1].querySelector('.move-left-btn').click();
    await sleep(config.testing.click_delay);

    assert.is(getFacetSum('m1', 0), 10);
    assert.is(getFacetSum('m1', 1), 6);
    assert.is(getFacetSum('m1', 2), 5);

    // Move f2 left
    facetContainers[1].querySelector('.move-left-btn').click();
    await sleep(config.testing.click_delay);

    assert.is(getFacetSum('m1', 0), 10);
    assert.is(getFacetSum('m1', 1), 7);
    assert.is(getFacetSum('m1', 2), 5);

    // Move f2 to the rightmost position
    facetContainers[0].querySelector('.move-right-btn').click();
    await sleep(config.testing.click_delay);
    facetContainers[1].querySelector('.move-right-btn').click();
    await sleep(config.testing.click_delay);

    assert.is(getFacetSum('m1', 0), 10);
    assert.is(getFacetSum('m1', 1), 6);
    assert.is(getFacetSum('m1', 2), 3);

    // Move f3 left
    facetContainers[1].querySelector('.move-left-btn').click();
    await sleep(config.testing.click_delay);

    assert.is(getFacetSum('m1', 0), 10);
    assert.is(getFacetSum('m1', 1), 5);
    assert.is(getFacetSum('m1', 2), 3);

    // Move f3 to the rightmost position (to return to initial state)
    facetContainers[0].querySelector('.move-right-btn').click();
    await sleep(config.testing.click_delay);
    facetContainers[1].querySelector('.move-right-btn').click();
    await sleep(config.testing.click_delay);

    assert.is(getFacetSum('m1', 0), 10);
    assert.is(getFacetSum('m1', 1), 6);
    assert.is(getFacetSum('m1', 2), 5);

    const resetBtn = document.querySelector('.reset-all-btn');
    resetBtn.click();
    await sleep(config.testing.click_delay);
});

export default moveRegularFacetTests;
