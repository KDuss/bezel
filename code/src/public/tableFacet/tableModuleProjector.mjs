import tableFacetProjector from './tableFacetProjector.mjs';

/**
 * Projector specific to TableModule.
 * @param {MainController} mainController
 * @param {TableModule} module
 * @param {HTMLDivElement} root
 */
const tableModuleProjector = (mainController, module, root) => {
    tableFacetProjector(mainController, module, root);

    mainController.onModuleDeactivate((m, removeMe) => {
        if (m !== module) return;
        root.parentNode.removeChild(root);
        removeMe();
    });
};

export default tableModuleProjector;
