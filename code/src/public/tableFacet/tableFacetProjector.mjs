import { addThousandsSeparator, domElement } from '../util/util.mjs';
import {
    COUNT, ROW_DATA, SELECTED, NEXT_PAGE, LAST_PAGE, PAGE_NO,
} from '../dataModel/presentationModel/presentationModel.js';

/**
 * @param {HTMLDivElement} scrollElement
 */
const setSliderPosition = scrollElement => {
    const initPos = 0;
    scrollElement.scrollTo(initPos, initPos);
};

/**
 * @param {MainController} controller
 * @param {TableModule} module
 * @param {TableFacet} facet
 * @param {ObservablesCollection} item
 * @param {HTMLTableRowElement} row
 * @param {HTMLDivElement} scrollContainer
 */
const fillTableRow = (controller, module, facet, item,
                      row, scrollContainer) => {
    const rowData = item.getObs(ROW_DATA).getValue();

    const checkbox = domElement('input');
    checkbox.type = 'checkbox';

    item.getObs(SELECTED).onChange(newValue => {
        checkbox.checked = newValue === 'yes';
        if (newValue === 'yes') {
            row.classList.add('table-row-checked');
        } else {
            row.classList.remove('table-row-checked');
        }
    });

    row.onclick = _ => {
        controller.makeSelection(module, facet, item);
    };

    const checkContainer = domElement('td');
    checkContainer.append(checkbox);
    row.append(checkContainer);

    Object.keys(rowData)
        .filter(key => !module.columnsToIgnore.includes(key))
        .forEach(key => {
            const newCell = row.insertCell(-1);
            newCell.innerText = rowData[key];
        });

    facet.onRowRemove((el, removeMe) => {
        if (el.getObs(ROW_DATA).getValue() !== rowData) return;
        row.parentNode.removeChild(row);
        setSliderPosition(scrollContainer);
        removeMe();
    });
};

/**
 * @param {HTMLTableElement} root
 * @param {ObservablesCollection} item
 * @param {string[]} columnsToIgnore
 */
const printHeader = (item, root, columnsToIgnore) => {
    console.log('printing header');
    const header = root.createTHead();
    const headerRow = header.insertRow(0);

    headerRow.append(domElement('th'));
    const headerData = item.getObs(ROW_DATA)
        .getValue();
    const cells = Object.keys(headerData || {})
        .filter(key => !columnsToIgnore.includes(key))
        .map(key => {
            const cell = domElement('th');
            cell.innerHTML = `${key}`;
            return cell;
        });
    headerRow.append(...cells);
};

/**
 * Observes if scroller has reached the end of table and next data needs to be loaded
 * @param {TableFacet} facet - Facet scrolling has to be bound to
 * @param {HTMLDivElement} observable - Element to observe for scroll activity
 */
const enableLazyLoading = (facet, observable) => {
    let noPostReq = true;
    const smoothingOffset = 20;

    observable.onscroll = async () => {
        const lastPage = facet.paginationState
            .getObs(LAST_PAGE)
            .getValue();
        const currentPage = facet.paginationState
            .getObs(PAGE_NO)
            .getValue();

        if (observable.scrollTop + observable.clientHeight
            >= observable.scrollHeight - smoothingOffset
            && noPostReq
            && currentPage < lastPage) {
            const referenceNextPage = facet.paginationState
                .getObs(NEXT_PAGE)
                .getValue();

            noPostReq = false;
            await facet.lazyLoading(referenceNextPage);
            noPostReq = true;
            facet.paginationState
                .getObs(PAGE_NO)
                .setValue(currentPage + 1);
        }
    };
};

/**
 * @param {HTMLTableElement} root
 */
const clearTable = root => {
    root.innerHTML = '';
};
/**
 * Renders the filtered data.
 * @param {MainController} controller
 * @param {TableModule} module
 * @param {TableFacet} facet
 * @param {HTMLTableElement} root
 * @param {HTMLDivElement} scrollContainer
 */
const printTable = (controller, module, facet, root, scrollContainer) => {
    clearTable(root);

    const body = root.createTBody();
    facet.state.onAdd(item => {
        const header = root.querySelector('thead');
        if (!header) printHeader(item, root, module.columnsToIgnore);

        const row = body.insertRow();

        fillTableRow(controller, module, facet, item, row, scrollContainer);
    });
};

/**
 * @param {MainController} controller
 * @param {TableModule} module
 * @param {TableFacet} facet
 */
const dataTable = (controller, module, facet) => {
    const tableContainer = domElement('div', 'table-container');
    const table = domElement('table');
    table.classList.add('data-table');
    tableContainer.appendChild(table);

    printTable(controller, module, facet, table, tableContainer);
    enableLazyLoading(facet, tableContainer);

    return tableContainer;
};

/**
 * @param {TableFacet} facet
 */
const countView = facet => {
    const countViewContainer = domElement('div');
    countViewContainer.innerHTML = 'Selected <span class="selection-count">'
        + '</span> of <span class="count">'
        + '</span> entries';

    facet.countState.getObs(COUNT).onChange(count => {
        const countSpan = countViewContainer.querySelector('.count');
        if (count != null) countSpan.innerHTML = addThousandsSeparator(count);
    });
    facet.onSelectionChange(count => {
        const selectionCount = countViewContainer
            .querySelector('.selection-count');
        selectionCount.innerHTML = addThousandsSeparator(count);
    });

    return countViewContainer;
};

/**
 * Projector for table facet.
 * @param {MainController} controller
 * @param {TableModule} module
 * @param {HTMLDivElement} root
 */
const tableFacetProjector = (controller, module, root) => {
    const { facet } = module;

    const dataView = domElement('div');
    dataView.classList.add('data-view');
    dataView.append(countView(facet));
    dataView.append(dataTable(controller, module, facet));

    root.append(dataView);
};

export default tableFacetProjector;
