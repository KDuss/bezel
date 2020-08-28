import { Suite } from '../test/test.js';
import TableFacet from './tableFacet.mjs';
import facetServices from '../service/localService.test.js';
import { FOCUS, SELECTED } from '../dataModel/presentationModel/presentationModel.js';

const tableFacetTests = Suite('tableFacet');

tableFacetTests.add('make selection', async assert => {
    // Setup
    const services = facetServices();
    const facet = TableFacet(services);
    await facet.update([]);

    // Getting correct filter
    assert.is(Object.keys(facet.getFilter()).length, 0);

    const target = facet.state.list[0];
    assert.is(target.getObs(SELECTED).getValue(), 'no');
    facet.makeSelection(target);
    assert.is(target.getObs(SELECTED).getValue(), 'yes');

    const selectedId = target.getObs(FOCUS).getValue();
    const filter = facet.getFilter();
    assert.is(filter.id.foci[0], selectedId);
    assert.is(filter.id.groupType, 'none');
    assert.is(filter.id.grouping.length, 0);
});

export default tableFacetTests;
