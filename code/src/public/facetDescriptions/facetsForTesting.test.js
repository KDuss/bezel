/**
 * Facet descriptions used in combination with the testing service
 */
const sampleFacet1 = {
    id: 'f1',
    name: 'regCol1 (flat)',
    sourceColumn: 'regCol1',
    type: 'flat',
    groupType: 'none',
    grouping: [],
};
const sampleFacet2 = {
    id: 'f2',
    name: 'regCol2 (hierarchical-1)',
    sourceColumn: 'regCol2',
    type: 'hierarchical',
    groupType: 'value',
    grouping: [[
        {
            name: 'group 1',
            foci: ['entry-1-col-2'],
        },
        {
            name: 'group 2',
            foci: ['entry-2-col-2'],
        },
        {
            name: 'group 2',
            foci: ['entry-3-col-2'],
        },
    ]],
};
const sampleFacet3 = {
    id: 'f3',
    name: 'regCol3 (hierarchical-2)',
    sourceColumn: 'regCol3',
    type: 'hierarchical',
    groupType: 'value',
    grouping: [[
        {
            name: 'group 1-1',
            foci: ['group 2-1'],
        },
        {
            name: 'group 1-2',
            foci: ['group 2-2', 'group 2-3'],
        },
    ], [
        {
            name: 'group 2-1',
            foci: ['entry-1-col-3', 'entry-2-col-3', 'entry-3-col-3'],
        },
        {
            name: 'group 2-2',
            foci: ['entry-4-col-3'],
        },
        {
            name: 'group 2-3',
            foci: ['entry-7-col-3'],
        },
    ]],
};
const sampleFacet4 = {
    id: 'f4',
    name: 'numCol1 (range - int)',
    sourceColumn: 'numCol1',
    type: 'range',
    groupType: 'range',
    grouping: [{
        name: 'unassigned',
        foci: [],
    }, {
        name: '(..., 0)',
        foci: ['-Infinity', 0],
    }, {
        name: '[0-9]',
        foci: [0, 10],
    }, {
        name: '[10-12]',
        foci: [10, 13],
    }, {
        name: '[13, ...)',
        foci: [13, 'Infinity'],
    }],
};

const sampleFacet5 = {
    id: 'f5',
    name: 'numCol2 (range - dec)',
    sourceColumn: 'numCol2',
    type: 'range',
    groupType: 'range',
    grouping: [{
        name: 'unassigned',
        foci: [],
    }, {
        name: '(..., -10)',
        foci: ['-Infinity', -10],
    }, {
        name: '[-10 - 0)',
        foci: [-10, 0],
    }, {
        name: '[0 - 10)',
        foci: [0, 10],
    }, {
        name: '[10, ...)',
        foci: [10, 'Infinity'],
    }],
};

const sampleFacets = [sampleFacet1, sampleFacet2,
    sampleFacet3, sampleFacet4, sampleFacet5];

export default sampleFacets;
