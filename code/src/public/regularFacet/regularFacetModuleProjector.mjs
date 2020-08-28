import { domElement, OPERATION } from '../util/util.mjs';
import facetContainerProjector from './facetContainerProjector.mjs';
import config from '../config.mjs';

/**
 * Invisible buttons used to activate facets in testing.
 * @param {MainController} mainController
 * @param {RegularFacetModule} module
 * @param {RegularFacet} facet
 */
const choiceButtons = (mainController, module, facet) => {
    const andBtn = domElement('button', 'and-btn');
    andBtn.innerHTML = '';
    andBtn.onclick = _ => {
        mainController.activateFacet(module, facet, -1, OPERATION.AND);
    };

    const orBtn = domElement('button', 'or-btn');
    orBtn.innerHTML = '';
    orBtn.onclick = _ => {
        mainController.activateFacet(module, facet, 0, OPERATION.OR);
    };
    return [andBtn, orBtn];
};

const facetIcon = groupType => {
    const icon = domElement('img', 'facet-icon');
    switch (groupType) {
    case 'none':
        icon.src = `${config.app.resources}/flat-icon.png`;
        icon.alt = 'Flat facet';
        break;
    case 'value':
        icon.src = `${config.app.resources}/hierarchical-icon.png`;
        icon.alt = 'Hierarchical facet';
        break;
    case 'range':
        icon.src = `${config.app.resources}/range-icon.png`;
        icon.alt = 'Range facet';
        break;
    default:
        icon.src = `${config.app.resources}/placeholder.png`;
        icon.alt = 'No icon available';
    }
    return icon;
};

/**
 * Creates an element for a specific facet that is added to the overview of all facets in the legacy.
 * @param {MainController} mainController
 * @param {RegularFacetModule} module
 * @param {RegularFacet} facet
 * @returns {HTMLDivElement}
 */
const facetChoiceProjector = (mainController, module, facet) => {
    const choice = domElement('div', 'draggable', facet.id);
    choice.draggable = true;

    const nameSpan = domElement('span');
    nameSpan.innerText = `${facet.name}`;

    choice.append(facetIcon(facet.groupType),
        nameSpan, ...choiceButtons(mainController, module, facet));

    choice.ondragstart = event => {
        const payload = {
            id: facet.id,
            name: event.currentTarget.id,
            type: 'facet',
        };
        event.dataTransfer.setData('text/plain', JSON.stringify(payload));
        event.dataTransfer.setData('facet-drag', '');
        event.currentTarget.classList.add('dragging');
    };
    choice.ondragend = event => {
        event.currentTarget.classList.remove('dragging');
    };

    return choice;
};

/**
 * Projector display the selection of regular facets.
 * @param {MainController} mainController
 * @param {RegularFacetModule} module
 */
const facetSelectionProjector = (mainController, module) => {
    const selectionArea = domElement('div', 'facet-drag-container');

    module.allFacets.forEachAfter(-1, facet => {
        selectionArea
            .append(facetChoiceProjector(mainController, module, facet));
    });

    // Add choice for any facet added later
    module.onFacetAdd(facet => {
        selectionArea
            .append(facetChoiceProjector(mainController, module, facet));
    });

    return selectionArea;
};

/**
 * Handle drag events for the area where facets can be dropped.
 * @param {MainController} mainController
 * @param {RegularFacetModule} module
 * @param {HTMLDivElement} dropArea
 */
const initFacetDragAndDrop = (mainController, module, dropArea) => {
    dropArea.ondragover = event => {
        event.preventDefault();
        const { target } = event;
        const allowedToDropAnd = event.dataTransfer.types.includes('facet-drag')
            && (target.classList.contains('facet-drop-target')
                || target.classList.contains('facet-or-drop-target'));
        if (allowedToDropAnd) {
            target.classList.add('drop-target-hover');
        }
    };
    dropArea.ondragleave = event => {
        event.target.classList.remove('drop-target-hover');
    };
    dropArea.ondrop = event => {
        event.preventDefault();
        const { target } = event;
        target.classList.remove('drop-target-hover');

        try {
            const { id, type } = JSON.parse(
                event.dataTransfer.getData('text'),
            );
            if (type == null || type !== 'facet') return;
            const facet = module.getFacetById(id);
            if (facet == null) return;

            if (target.classList.contains('facet-drop-target')) {
                mainController
                    .activateFacet(module, facet, -1, OPERATION.AND); // add at the end
            } else if (target.classList.contains('facet-or-drop-target')) {
                const targetPos = Array
                    .from(target.parentNode.parentNode.children)
                    .indexOf(target.parentNode);
                mainController
                    .activateFacet(module, facet, targetPos, OPERATION.OR);
            }

            event.dataTransfer.clearData();
        } catch (e) {
            // Ignore if something other than a facet is dropped here
        }
    };
};

/**
 * Create element that serves as target when dragging {@link facetSelectionProjector} to activate a facet.
 * @param {MainController} mainController
 * @param {RegularFacetModule} module
 * @returns {HTMLDivElement}
 */
const initDropArea = (mainController, module) => {
    const dropArea = domElement('div', 'facet-drop-area');

    const dropTarget = domElement('div', 'drop-target', 'facet-drop-target');
    dropTarget.innerHTML = `<span class="logical-operator">&and;</span>
        <span class="drop-description">Drop facet here.</span>`;
    dropArea.append(dropTarget);

    initFacetDragAndDrop(mainController, module, dropArea);

    return dropArea;
};

/**
 * Projector specific to RegularFacetModule.
 * @param {MainController} mainController
 * @param {RegularFacetModule} module
 * @param {HTMLDivElement} root
 */
const regularFacetModuleProjector = (mainController, module, root) => {
    const selectionArea = facetSelectionProjector(mainController, module);
    const dropArea = initDropArea(mainController, module);

    root.append(selectionArea, dropArea);

    module.onFacetActivateAnd(container => {
        facetContainerProjector(mainController, module, container, dropArea);
    });

    mainController.onModuleDeactivate((m, removeMe) => {
        if (m !== module) return;
        root.parentNode.removeChild(root);
        removeMe();
    });
};

export default regularFacetModuleProjector;
