import { domElement } from './util/util.mjs';
import specificModuleProjector from './specificModuleProjector.mjs';
import { loadingCount } from './service/remoteService.js';
import config from './config.mjs';

/**
 * Creates an element that can be clicked or dragged to activate a module.
 * @param {MainController} mainController
 * @param {TableModule|RegularFacetModule} module
 * @returns {HTMLDivElement}
 */
const moduleChoiceProjector = (mainController, module) => {
    const choice = domElement('div', 'draggable');
    choice.id = module.id;
    choice.draggable = true;
    choice.innerHTML = `<span>${module.name}</span>`;

    const { name } = module;

    choice.ondragstart = event => {
        const payload = {
            name,
            type: 'module',
        };
        event.dataTransfer.setData('text/plain', JSON.stringify(payload));
        event.dataTransfer.setData('module-drag', '');
        event.currentTarget.classList.add('dragging');
    };

    choice.ondragend = event => {
        event.currentTarget.classList.remove('dragging');
    };

    choice.onclick = async _ => {
        mainController.activateModule(await module.getNewInstance());
    };

    return choice;
};

/**
 * Creates the basic/generic structure of a module.
 * @param {MainController} mainController
 * @param {TableModule|RegularFacetModule} module
 * @returns {HTMLDivElement}
 */
const baseModule = (mainController, module) => {
    const moduleContainer = domElement('div', 'module', module.id);

    const moduleTitle = domElement('h3');
    moduleTitle.innerHTML = `${module.name}`;

    const resetBtn = domElement('button', 'reset-btn', 'reset-module-btn');
    resetBtn.innerHTML = 'reset module';
    resetBtn.onclick = _ => mainController.resetModule(module);

    const removeBtn = domElement('button');
    removeBtn.classList.add('remove-module-btn');
    removeBtn.innerHTML = 'remove module';
    removeBtn.onclick = _ => mainController.deactivateModule(module);

    moduleTitle.append(resetBtn, removeBtn);
    moduleContainer.append(moduleTitle);

    return moduleContainer;
};

/**
 * Create element that serves as target when dragging {@link moduleChoiceProjector} to activate a module.
 * @param {MainController} mainController
 * @returns {HTMLDivElement}
 */
const initializeDropTarget = mainController => {
    const dropTarget = domElement('div', 'drop-target', 'module-drop-target');
    dropTarget.innerHTML = `<span class="logical-operator">&and;</span>
        <span class="drop-description">Drop module here.</span>`;

    dropTarget.ondragover = event => {
        event.preventDefault();
        const allowedToDrop = event.dataTransfer.types.includes('module-drag');
        if (allowedToDrop) {
            dropTarget.classList.add('drop-target-hover');
        }
    };
    dropTarget.ondragleave = _ => {
        dropTarget.classList.remove('drop-target-hover');
    };
    dropTarget.ondrop = async event => {
        event.preventDefault();
        dropTarget.classList.remove('drop-target-hover');
        try {
            const { name, type } = JSON.parse(event
                .dataTransfer.getData('text'));
            if (type == null || type !== 'module') return;
            const { target } = event;

            if (target.classList.contains('module-drop-target')) {
                const module = mainController.getModuleByName(name);
                mainController.activateModule(await module.getNewInstance());
            }

            event.dataTransfer.clearData();
        } catch (e) {
            // Ignore if something other than a module is dropped
        }
    };
    return dropTarget;
};

/**
 * Create title and container for all choices of available modules.
 * @param {MainController} mainController
 * @returns {[HTMLTitleElement, HTMLDivElement]}
 */
const moduleListSection = mainController => {
    const title = domElement('h3', 'available-modules-title');
    title.innerHTML = `Available Modules
        <span class="tooltip" data-tooltip="${config.tooltip.module}">i</span>`;

    const moduleDragContainer = domElement('div', 'module-drag-container');

    mainController.onModuleAdd(module => {
        moduleDragContainer.append(
            moduleChoiceProjector(mainController, module),
        );
    });
    return [title, moduleDragContainer];
};

/**
 * Create area where modules are placed when activated.
 * @param {MainController} mainController
 * @returns {[HTMLTitleElement, HTMLDivElement, HTMLDivElement]}
 */
const activeModulesSection = mainController => {
    const resetButton = domElement('button', 'reset-btn', 'reset-all-btn');
    resetButton.innerHTML = 'remove all modules';
    resetButton.onclick = mainController.reset;

    const dropArea = domElement('div', 'module-drop-area');

    const dropTarget = initializeDropTarget(mainController);
    dropArea.append(dropTarget);

    return [resetButton, dropArea, dropTarget];
};

/**
 * Adds animation to the logo, when the application is waiting for a server response.
 * @param {HTMLImageElement} logoTag
 */
const initializeLoadingIndicator = logoTag => {
    loadingCount.onChange(newValue => {
        if (newValue > 0) {
            logoTag.classList.add('logo-rotate');
        } else {
            logoTag.classList.remove('logo-rotate');
        }
    });
};

/**
 * Projector for the module system.
 * @param {MainController} mainController
 * @param {HTMLDivElement} moduleListRoot
 * @param {HTMLDivElement} activeModulesRoot
 */
const moduleProjector = (mainController, moduleListRoot, activeModulesRoot) => {
    moduleListRoot.append(...moduleListSection(mainController));

    const logo = domElement('img', 'logo');
    logo.src = config.app.logoPath;
    logo.alt = 'Bezel Logo';
    initializeLoadingIndicator(logo);

    const name = domElement('h2', 'app-name');
    name.innerHTML = config.app.name;
    moduleListRoot.append(name, logo);

    const [activeTitle, dropArea,
        dropTarget] = activeModulesSection(mainController);
    activeModulesRoot.append(activeTitle, dropArea);

    mainController.onModuleActivate(module => {
        const moduleContainer = baseModule(mainController, module);
        dropArea.insertBefore(moduleContainer, dropTarget);

        specificModuleProjector(mainController, module, moduleContainer);
    });
};

export default moduleProjector;
