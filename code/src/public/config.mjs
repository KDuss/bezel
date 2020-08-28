import sampleAtpFacets from './facetDescriptions/sampleAtpFacets.mjs';

const dev = {

    app: {
        domain: 'http://localhost',
        port: 8000,
        name: 'Bezel',
        logoPath: '/logo.png',
        resources: '/resources',
        facets: sampleAtpFacets,
        idColumnName: 'id',
        columnsToIgnore: ['id', '_id'],
    },
    db: {
        host: 'localhost',
        port: 27017,
        max_nr_of_foci: 1000,
        dbName: 'atp',
        collectionName: 'atp',
    },
    testing: {
        click_delay: 10,
    },
    pagination: {
        page_size: 30,
        first_page: 1,
    },
    tooltip: {
        module: `Choose a module to begin the exploration. 
        Click it or drag it into the drop area below.`,
    },
};

const config = dev;

export default config;
