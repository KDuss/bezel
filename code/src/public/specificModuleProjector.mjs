import tableModuleProjector from './tableFacet/tableModuleProjector.mjs';
import regularFacetModuleProjector
    from './regularFacet/regularFacetModuleProjector.mjs';

/**
 * Choose which projector to use for the module.
 * @param {MainController} mainController
 * @param {RegularFacetModule|TableModule} module
 * @param {HTMLDivElement} moduleContainer
 */
const specificModuleProjector = (mainController, module, moduleContainer) => {
    if (module.type === 'table') {
        tableModuleProjector(mainController, module, moduleContainer);
    } else if (module.type === 'regular') {
        regularFacetModuleProjector(mainController,
            module, moduleContainer);
    }
};

export default specificModuleProjector;
