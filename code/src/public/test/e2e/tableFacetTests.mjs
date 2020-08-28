import { Suite } from '../test.js';
import { sleep } from '../../util/util.mjs';
import config from '../../config.mjs';

const tableSelectionTests = Suite('Table Facet');

const NR_OF_LOCAL_ENTRIES = 10;

tableSelectionTests.add('Results/selection on table facets', async assert => {
    // Add table module
    const regularFacet = document.querySelector('#m2');
    regularFacet.click();
    await sleep(config.testing.click_delay);
    regularFacet.click();
    await sleep(config.testing.click_delay);
    const moduleDropArea = document.querySelector(' .module-drop-area');
    assert.is(moduleDropArea.children.length, 3);

    const firstTable = moduleDropArea.children[0];
    const secondTable = moduleDropArea.children[1];
    const firstTableCount = firstTable.querySelector('.count');
    const secondTableCount = secondTable.querySelector('.count');
    const firstTableSelectionCount = firstTable
        .querySelector('.selection-count');
    const secondTableSelectionCount = secondTable
        .querySelector('.selection-count');

    assert.is(Number(firstTableSelectionCount.innerText), 0);
    assert.is(Number(secondTableSelectionCount.innerText), 0);
    assert.is(Number(firstTableCount.innerText), 10);
    assert.is(Number(secondTableCount.innerText), 10);

    // Select rows in first table
    const rows = firstTable.querySelector('tbody').children;
    assert.is(rows.length, NR_OF_LOCAL_ENTRIES);
    rows[0].click();
    await sleep(config.testing.click_delay);

    assert.is(Number(firstTableSelectionCount.innerText), 1);
    assert.is(Number(secondTableSelectionCount.innerText), 0);
    assert.is(Number(firstTableCount.innerText), 10);
    assert.is(Number(secondTableCount.innerText), 1);

    // Click on all entries in the first table (therefore deselecting the first)
    Array.from(rows).map(row => row.click());
    await sleep(config.testing.click_delay);

    assert.is(Number(firstTableSelectionCount.innerText), 9);
    assert.is(Number(secondTableSelectionCount.innerText), 0);
    assert.is(Number(firstTableCount.innerText), 10);
    assert.is(Number(secondTableCount.innerText), 9);

    // Reset first table
    const resetFirstTableBtn = firstTable.querySelector('.reset-module-btn');
    resetFirstTableBtn.click();
    await sleep(config.testing.click_delay);

    assert.is(Number(firstTableSelectionCount.innerText), 0);
    assert.is(Number(secondTableSelectionCount.innerText), 0);
    assert.is(Number(firstTableCount.innerText), 10);
    assert.is(Number(secondTableCount.innerText), 10);

    // Select row on second table
    const rows2 = secondTable.querySelector('tbody').children;
    assert.is(rows2.length, NR_OF_LOCAL_ENTRIES);
    rows2[0].click();
    await sleep(config.testing.click_delay);

    assert.is(Number(firstTableSelectionCount.innerText), 0);
    assert.is(Number(secondTableSelectionCount.innerText), 1);
    assert.is(Number(firstTableCount.innerText), 10);
    assert.is(Number(secondTableCount.innerText), 10);

    // Select row on first table (different row than on table 2)
    rows[1].click();
    await sleep(config.testing.click_delay);

    // Selection of first row in second table is removed automatically
    assert.is(Number(firstTableSelectionCount.innerText), 1);
    assert.is(Number(secondTableSelectionCount.innerText), 0);
    assert.is(Number(firstTableCount.innerText), 10);
    assert.is(Number(secondTableCount.innerText), 1);

    // Select first row on first table (was selected on second)
    rows[0].click();
    await sleep(config.testing.click_delay);

    assert.is(Number(firstTableSelectionCount.innerText), 2);
    assert.is(Number(secondTableSelectionCount.innerText), 0);
    assert.is(Number(firstTableCount.innerText), 10);
    assert.is(Number(secondTableCount.innerText), 2);

    // Select both on second table
    rows2[0].click();
    rows2[1].click();
    await sleep(config.testing.click_delay);

    assert.is(Number(firstTableSelectionCount.innerText), 2);
    assert.is(Number(secondTableSelectionCount.innerText), 2);
    assert.is(Number(firstTableCount.innerText), 10);
    assert.is(Number(secondTableCount.innerText), 2);

    // Deselect both on first table
    rows[0].click();
    await sleep(config.testing.click_delay);
    rows[1].click();
    await sleep(config.testing.click_delay);

    assert.is(Number(firstTableSelectionCount.innerText), 0);
    assert.is(Number(secondTableSelectionCount.innerText), 1);
    assert.is(Number(firstTableCount.innerText), 10);
    assert.is(Number(secondTableCount.innerText), 10);

    // Reset
    const resetBtn = document.querySelector('.reset-all-btn');
    resetBtn.click();
    await sleep(config.testing.click_delay);
});

export default tableSelectionTests;
