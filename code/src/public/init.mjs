import MainController from './mainController.mjs';
import RegularFacetModule from './regularFacet/regularFacetModule.mjs';
import RegularFacet from './regularFacet/regularFacet.mjs';
import moduleProjector from './moduleProjector.mjs';
import TableModule from './tableFacet/tableModule.mjs';
import { facetServices } from './service/remoteService.js';
import config from './config.mjs';

const start = async _ => {
    const services = facetServices();
    const mainController = MainController();

    const render = () => {
        const moduleListRoot = document.querySelector('#facet-module-list');
        const activeModulesRoot = document.querySelector('#facet-modules');

        console.log('root', moduleListRoot);
        moduleProjector(mainController, moduleListRoot, activeModulesRoot);
    };
    render();

    const promises = config.app.facets
        .map(desc => RegularFacet(desc, services));
    const listOfRegularFacets = await Promise.all(promises);

    // Add modules
    const m1 = RegularFacetModule('m1', 'Regular Facets', listOfRegularFacets);
    const m2 = await TableModule('m2', 'Table Facet',
        services, config.app.columnsToIgnore);

    mainController.addModule(m1);
    mainController.addModule(m2);

    console.log('COUNT of module', m1.allFacets.count());
};

start();
