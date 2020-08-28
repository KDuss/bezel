import { addThousandsSeparator, domElement } from '../util/util.mjs';
import facetProjector from './regularFacetProjector.mjs';

let startPosContainer = 0;
// Workaround for Firefox
let x = 0;
let y = 0;
document.ondragover = event => {
    x = event.clientX;
    y = event.clientY;
};

/**
 * Start dragging a container. Remember the starting position.
 * @param event
 */
const containerDragStart = event => {
    const selectedItem = event.target;
    if (selectedItem.classList.contains('facet-position')) {
        const containerList = selectedItem.parentNode;
        startPosContainer = Array.from(containerList.children)
            .indexOf(selectedItem);
    }
};
/**
 * While dragging a container.
 * Updates the position of the container based on the mouse position.
 * @param event
 */
const containerOnDrag = event => {
    const selectedItem = event.target;
    const containerList = selectedItem.parentNode;
    selectedItem.classList.add('drag-sort-active');
    let swapItem = document.elementFromPoint(x, y) === null
        ? selectedItem : document.elementFromPoint(x, y);

    if (containerList === swapItem.parentNode && swapItem !== selectedItem
        && !swapItem.classList.contains('drop-target')) {
        swapItem = swapItem !== selectedItem.nextSibling
            ? swapItem
            : swapItem.nextSibling;
        containerList.insertBefore(selectedItem, swapItem);
    }
};
/**
 * Stop dragging a container.
 * Checks whether the position changed and moves the container if it did.
 * @param {MainController} mainController
 * @param {RegularFacetModule} module
 * @param {FacetContainer} container
 */
const containerOnDragEnd = (mainController, module, container) => event => {
    event.target.classList.remove('drag-sort-active');
    const selectedItem = event.target;
    const containerList = selectedItem.parentNode;

    const endPos = Array.from(containerList.children)
        .indexOf(selectedItem);
    if (startPosContainer !== endPos) {
        mainController.moveInFacet(module, container, endPos);
    }
    startPosContainer = 0;
};

/**
 * Button that moves the container left, unless it is the first in the list.
 * @param {MainController} mainController
 * @param {RegularFacetModule} module
 * @param {FacetContainer} container
 * @param {HTMLDivElement} root
 * @returns {HTMLButtonElement}
 */
const moveContainerLeftBtn = (mainController, module, container, root) => {
    const leftBtn = domElement('button', 'move-left-btn', 'move-btn');
    leftBtn.innerHTML = '&laquo;';
    leftBtn.onclick = _ => {
        const containerPosition = module.indexOf(container);
        if (containerPosition === 0) return;
        // Move in DOM
        root.insertBefore(root.children[containerPosition],
            root.children[containerPosition].previousSibling);
        // Move in presentation model
        mainController.moveInFacet(module,
            container, containerPosition - 1);
    };
    return leftBtn;
};
/**
 * Button that moves the container right, unless it is the last in the list.
 * @param {MainController} mainController
 * @param {RegularFacetModule} module
 * @param {FacetContainer} container
 * @param {HTMLDivElement} root
 * @returns {HTMLButtonElement}
 */
const moveContainerRightBtn = (mainController, module, container, root) => {
    const rightBtn = domElement('button', 'move-right-btn', 'move-btn');
    rightBtn.innerHTML = '&raquo;';
    rightBtn.onclick = _ => {
        const containerPosition = module.indexOf(container);
        const nextContainerDiv = root.children[containerPosition + 1];
        if (nextContainerDiv == null
            || nextContainerDiv.classList.contains('drop-target')) {
            return;
        }
        // Move in DOM
        root.insertBefore(root.children[containerPosition],
            root.children[containerPosition + 2]);
        // Move in presentation model
        mainController
            .moveInFacet(module, container, containerPosition + 1);
    };
    return rightBtn;
};

/**
 * Projector for containers.
 * @param {MainController} mainController
 * @param {RegularFacetModule} module
 * @param {FacetContainer} container
 * @param {HTMLDivElement} root
 */
const facetContainerProjector = (mainController, module, container, root) => {
    const containerDiv = domElement('div', 'container', 'facet-position');
    containerDiv.draggable = true;

    const countSpan = domElement('span');
    countSpan.innerText = '0';

    const containerHeader = domElement('div', 'container-header');

    containerHeader.append(
        moveContainerLeftBtn(mainController, module, container, root),
        countSpan,
        moveContainerRightBtn(mainController, module, container, root),
    );
    containerDiv.append(containerHeader);

    container.onContainerCountChange(v => (countSpan.innerHTML = `${addThousandsSeparator(v)} entries`));

    containerDiv.ondragstart = containerDragStart;
    containerDiv.ondrag = containerOnDrag;
    containerDiv.ondragend = containerOnDragEnd(mainController,
        module, container);

    const orTarget = domElement('div', 'drop-target', 'facet-or-drop-target');
    orTarget.innerHTML = `<span class="logical-operator">&or;</span>
        <span class="drop-description">Drop facet here.</span>`;
    containerDiv.append(orTarget);

    const currentPosition = module.indexOf(container);
    root.insertBefore(containerDiv, root.children[currentPosition]);

    container.onFacetAdd(f => {
        const facetDiv = facetProjector(mainController,
            module, container, f, containerDiv);
        containerDiv.insertBefore(facetDiv, orTarget);
        const facetChoice = containerDiv.parentNode.parentNode
            .querySelector(`.${f.id}`);
        facetChoice.classList.add('activated');
        facetChoice.draggable = false;
    });

    module.onContainerEmpty((c, removeMe) => {
        if (c !== container) return;
        containerDiv.parentNode.removeChild(containerDiv);
        removeMe();
    });
};

export default facetContainerProjector;
