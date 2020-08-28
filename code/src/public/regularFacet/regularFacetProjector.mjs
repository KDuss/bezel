import {
    addThousandsSeparator,
    domElement,
} from '../util/util.mjs';
import {
    COUNT, FOCUS, ID, SELECTED,
} from '../dataModel/presentationModel/presentationModel.js';

/**
 * Create a checkbox for a focus.
 * @param {ObservablesCollection} focusData
 * @param {HTMLLIElement} li - Parent list item
 * @returns {HTMLInputElement}
 */
const focusCheckbox = (focusData, li) => {
    const checkbox = domElement('input');
    checkbox.type = 'checkbox';
    focusData.getObs(ID)
        .onChange(v => (checkbox.id = `focus-${v}`));
    focusData.getObs(SELECTED)
        .onChange(v => {
            if (v === 'yes') {
                checkbox.checked = true;
                checkbox.indeterminate = false;
                li.classList.add('focus-selected');
            } else if (v === 'no') {
                checkbox.checked = false;
                checkbox.indeterminate = false;
                li.classList.remove('focus-selected');
            } else {
                checkbox.checked = false;
                checkbox.indeterminate = true;
                li.classList.remove('focus-selected');
            }
        });
    return checkbox;
};

/**
 * Creates and returns a remove and a reset button for the facet.
 * @param mainController
 * @param {RegularFacetModule} module
 * @param {RegularFacet} facet
 * @returns {[HTMLButtonElement, HTMLButtonElement]}
 */
const facetControlBtns = (mainController, module, facet) => {
    const removeBtn = domElement('button', 'remove-facet-btn');
    removeBtn.innerHTML = '';
    removeBtn.onclick = _ => mainController.deactivateFacet(module, facet);

    const resetBtn = domElement('button', 'reset-btn', 'reset-facet-btn');
    resetBtn.innerHTML = 'reset selection';
    resetBtn.onclick = _ => mainController.resetFacet(module, facet);

    return [removeBtn, resetBtn];
};

/**
 * Bind a single focus to a list item.
 * @param {MainController} mainController
 * @param {RegularFacetModule} module
 * @param {RegularFacet} facet
 * @param {ObservablesCollection} focusData
 * @param {boolean} isLeaf
 * @returns {HTMLLIElement}
 */
const focusListItem = (mainController, module, facet, focusData, isLeaf) => {
    const li = domElement('li');

    const checkbox = focusCheckbox(focusData, li);
    checkbox.onchange = _ => {
        mainController.makeSelection(module, facet, focusData);
    };

    const focus = domElement('span', 'focus');
    focusData.getObs(FOCUS)
        .onChange(v => (focus.innerText = v));
    const count = domElement('span', 'focus-count');
    focusData.getObs(COUNT)
        .onChange(v => (count.innerText = addThousandsSeparator(v)));

    if (isLeaf) {
        li.classList.add('tree-leaf');
        const label = domElement('label', 'focus-container');
        label.htmlFor = checkbox.id;
        label.append(focus, count);

        li.append(checkbox, label);
    } else {
        li.classList.add('tree-item');
        const expanderSpan = domElement('span', 'expander');
        expanderSpan.onclick = _ => li.classList.toggle('tree-item-open');
        expanderSpan.append(focus, count);

        li.append(checkbox, expanderSpan);
    }
    return li;
};

/**
 * Creates hierarchical list based on the structure of the facet state.
 * @param {MainController} mainController
 * @param {RegularFacetModule} module
 * @param {RegularFacet} facet
 * @returns {HTMLUListElement}
 */
const facetContent = (mainController, module, facet) => {
    const facetState = facet.state;
    const outerUl = domElement('ul', 'sublist');

    facetState.traverseTreeDown(facetState.getRoot(), node => {
        const focusData = node.getData();
        let ul = outerUl;

        if (node.getParent().getLevel() !== 0) {
            const parentData = node.getParent()
                .getData();
            const parentLi = ul
                .querySelector(`#focus-${parentData.getObs(ID)
                    .getValue()}`).parentNode;
            ul = parentLi.querySelector('ul');
            if (ul == null) {
                ul = domElement('ul', 'sublist');
                parentLi.append(ul);
            }
        }

        ul.append(focusListItem(mainController,
            module, facet, focusData, node.isLeafNode()));
    }, false);
    return outerUl;
};

/**
 * Projector for facet content.
 * @param {MainController} mainController
 * @param {RegularFacetModule} module
 * @param {FacetContainer} container
 * @param {RegularFacet} facet
 * @param {HTMLDivElement} root - Container wrapping 1 or multiple facets
 */
const facetProjector = (mainController, module, container, facet, root) => {
    const facetDiv = domElement('div', 'facet', facet.id);

    const facetTitle = domElement('span', 'facet-title');
    facetTitle.innerHTML = `${facet.name}`;

    // Add facet controls
    const facetHeader = domElement('div', 'facet-header');
    facetHeader.append(facetTitle,
        ...facetControlBtns(mainController, module, facet));

    const contentDiv = facetContent(mainController, module, facet);

    facetDiv.append(facetHeader, contentDiv);

    container.onFacetRemove((f, removeMe) => {
        if (f !== facet) return;

        const facetChoice = root.parentNode.parentNode
            .querySelector(`.${f.id}`);
        facetChoice.classList.remove('activated');
        facetChoice.draggable = true;

        root.removeChild(facetDiv);
        removeMe();
    });
    return facetDiv;
};

export default facetProjector;
