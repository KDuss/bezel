import { Suite } from '../test.js';
import { sleep } from '../../util/util.mjs';
import getFacetSum from './testUtil.mjs';
import config from '../../config.mjs';

const selectionRegularFacetTests = Suite('e2e: Selection on RegularFacet');

selectionRegularFacetTests.add('Select focus on RegularFacet', async assert => {
    // Add module
    const regularFacet = document.querySelector('#m1');
    regularFacet.click();
    await sleep(config.testing.click_delay);
    const facetDropArea = document.querySelector('.m1 .facet-drop-area');
    assert.is(facetDropArea.children.length, 1);

    // Add facet (flat)
    const addButton1 = document.querySelector('.m1 .f1 .and-btn');
    addButton1.click();
    await sleep(config.testing.click_delay);
    assert.is(facetDropArea.children.length, 2);
    assert.is(getFacetSum('m1', 0), 10);

    // Select first focus on first facet
    const focusItem1 = document.querySelector('li');
    const focusItem1Label = focusItem1.querySelector('label');
    const focusItem1Checkbox = focusItem1.querySelector('input');
    assert.true(!focusItem1Checkbox.checked);

    focusItem1Label.click();
    await sleep(config.testing.click_delay);
    assert.true(focusItem1Checkbox.checked);

    // Add second facet (hierarchical)
    const addButton2 = document.querySelector('.m1 .f2 .and-btn');
    addButton2.click();
    await sleep(config.testing.click_delay);
    assert.is(facetDropArea.children.length, 3);

    assert.is(getFacetSum('m1', 1), 3);

    // Add third facet (range)
    const addButton3 = document.querySelector('.m1 .f4 .and-btn');
    addButton3.click();
    await sleep(config.testing.click_delay);
    assert.is(facetDropArea.children.length, 4);

    // Total count on third facet
    assert.is(getFacetSum('m1', 2), 3);

    // Select entire group on second facet
    const focusItemGroup1 = facetDropArea.children[1]
        .querySelector('.sublist').children[2]; // group: unassigned
    const checkbox = focusItemGroup1.querySelector('input');
    checkbox.click();
    await sleep(config.testing.click_delay);

    // Group has 4 foci
    const focusItemGroup1Sublist = focusItemGroup1.querySelector('ul');
    assert.is(focusItemGroup1Sublist.children.length, 4);

    // All children are selected
    const checkedAll = Array.from(focusItemGroup1Sublist.children)
        .every(li => li.querySelector('input').checked);
    assert.true(checkedAll);

    // Total count on third facet (to verify selection)
    assert.is(getFacetSum('m1', 2), 2);

    // Remove selection of 1 group element
    const groupElement = focusItemGroup1Sublist.children[0]
        .querySelector('label');
    groupElement.click();
    await sleep(config.testing.click_delay);
    const groupElementCheckbox = focusItemGroup1Sublist.children[0]
        .querySelector('input');
    assert.true(!groupElementCheckbox.checked);

    // Parent is semi-selected
    const parentCheckbox = focusItemGroup1.querySelector('input');
    assert.true(!parentCheckbox.checked);
    assert.true(parentCheckbox.indeterminate);

    assert.is(getFacetSum('m1', 2), 1);

    // Reselect group element
    groupElement.click();
    await sleep(config.testing.click_delay);
    assert.true(parentCheckbox.checked);
    assert.true(!parentCheckbox.indeterminate);

    const resetBtn = document.querySelector('.reset-all-btn');
    resetBtn.click();
    await sleep(config.testing.click_delay);
});

export default selectionRegularFacetTests;
