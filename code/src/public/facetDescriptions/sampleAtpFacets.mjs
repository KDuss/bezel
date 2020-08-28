/**
 * Facet descriptions for the tennis data set
 * Source: https://www.kaggle.com/jordangoblet/atp-tour-20002016
 */
const sampleAtpFacet1 = {
    id: 'f1',
    name: 'Round',
    sourceColumn: 'Round',
    type: 'flat',
    groupType: 'none',
    grouping: [],
};

const sampleAtpFacet2 = {
    id: 'f2',
    name: 'Location',
    sourceColumn: 'Location',
    type: 'hierarchical',
    groupType: 'value',
    grouping: [[{
        name: 'France',
        foci: ['Paris', 'Montpellier', 'Lyon', 'Toulouse'],
    }, {
        name: 'Italy',
        foci: ['Milan', 'Rome'],
    }]],
};

const sampleAtpFacet3 = {
    id: 'f3',
    name: 'Location (more)',
    sourceColumn: 'Location',
    type: 'hierarchical',
    groupType: 'value',
    grouping: [[{
        name: 'Europe',
        foci: ['France', 'Italy', 'Switzerland'],
    }, {
        name: 'Asia',
        foci: ['Japan', 'India', 'UAE'],
    }, {
        name: 'Oceania',
        foci: ['Australia', 'New Zealand'],
    }], [{
        name: 'France',
        foci: ['Paris', 'Montpellier', 'Lyon', 'Toulouse', 'Marseille'],
    }, {
        name: 'Italy',
        foci: ['Milan', 'Rome'],
    }, {
        name: 'Japan',
        foci: ['Tokyo'],
    }, {
        name: 'Switzerland',
        foci: ['Basel'],
    }, {
        name: 'Australia',
        foci: ['Adelaide', 'Sydney', 'Melbourne'],
    }, {
        name: 'India',
        foci: ['Chennai'],
    }, {
        name: 'New Zealand',
        foci: ['Auckland'],
    }, {
        name: 'UAE',
        foci: ['Dubai'],
    }]],
};

const sampleAtpFacet4 = {
    id: 'f4',
    name: 'WRank',
    sourceColumn: 'WRank',
    type: 'flat',
    groupType: 'range',
    grouping: [{
        name: 'unassigned',
        foci: [],
    }, {
        name: '1-10',
        foci: [1, 11],
    }, {
        name: '11-50',
        foci: [11, 51],
    }, {
        name: '> 50',
        foci: [51, 'Infinity'],
    }],
};

const sampleAtpFacet5 = {
    id: 'f5',
    name: 'LRank',
    sourceColumn: 'LRank',
    type: 'flat',
    groupType: 'range',
    grouping: [{
        name: 'unassigned',
        foci: [],
    }, {
        name: '1-10',
        foci: [1, 11],
    }, {
        name: '11-50',
        foci: [11, 51],
    }, {
        name: '> 50',
        foci: [51, 'Infinity'],
    }],
};
const sampleAtpFacet6 = {
    id: 'f6',
    name: 'Surface',
    sourceColumn: 'Surface',
    type: 'flat',
    groupType: 'none',
    grouping: [],
};

const sampleAtpFacets = [sampleAtpFacet1, sampleAtpFacet2,
    sampleAtpFacet3, sampleAtpFacet4, sampleAtpFacet5, sampleAtpFacet6];

export default sampleAtpFacets;
