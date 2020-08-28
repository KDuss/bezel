import MainController from '../mainController.mjs';
import RegularFacetModule from '../regularFacet/regularFacetModule.mjs';
import RegularFacet from '../regularFacet/regularFacet.mjs';
import moduleProjector from '../moduleProjector.mjs';
import TableModule from '../tableFacet/tableModule.mjs';
import sampleFacets from '../facetDescriptions/facetsForTesting.test.js';
import facetServices from '../service/localService.test.js';
import { unitTests, e2eTests } from './allTests.mjs';
import { domElement } from '../util/util.mjs';

const start = async _ => {
    const service = facetServices();
    const mainController = MainController();

    const render = () => {
        const moduleListRoot = document.querySelector('#facet-module-list');
        const activeModulesRoot = document.querySelector('#facet-modules');

        moduleProjector(mainController, moduleListRoot, activeModulesRoot);
    };
    render();

    const promises = sampleFacets.map(desc => RegularFacet(desc, service));
    const listOfRegularFacets = await Promise.all(promises);

    // Add modules
    const m1 = RegularFacetModule('m1', 'Regular Facets', listOfRegularFacets);
    const m2 = TableModule('m2', 'Table Facet', service);

    mainController.addModule(m1);
    mainController.addModule(m2);

    console.log('COUNT of module', m1.allFacets.count());
};

start();

document.getElementById('start-test').onclick = _ => {
    Object.keys(unitTests).forEach(key => unitTests[key].run());
};

Object.keys(e2eTests).forEach(key => {
    const button = domElement('button');
    button.onclick = _ => e2eTests[key].run();
    button.innerText = key;

    const report = document.getElementById('e2e-tests');
    report.append(button);
});
