/**
 * Facet descriptions for the flight delay data set
 * Source: https://www.kaggle.com/usdot/flight-delays?select=flights.csv
 */
const sampleFlightsFacet1 = {
    id: 'f1',
    name: 'Day of week',
    sourceColumn: 'DAY_OF_WEEK',
    type: 'flat',
    groupType: 'none',
    grouping: [],
};

const sampleFlightsFacet2 = {
    id: 'f2',
    name: 'Day of week (Range)',
    sourceColumn: 'DAY_OF_WEEK',
    type: 'flat',
    groupType: 'range',
    grouping: [{
        name: 'unassigned',
        foci: [],
    }, {
        name: 'Weekday',
        foci: [1, 6],
    }, {
        name: 'Weekend',
        foci: [6, 8],
    }],
};

const sampleFlightsFacet3 = {
    id: 'f3',
    name: 'Day of week (Group)',
    sourceColumn: 'DAY_OF_WEEK',
    type: 'hierarchical',
    groupType: 'value',
    grouping: [[
        {
            name: 'Weekday',
            foci: [1, 2, 3, 4, 5],
        },
        {
            name: 'Weekend',
            foci: [6, 7],
        },
    ]],
};

const sampleFlightsFacet4 = {
    id: 'f4',
    name: 'Airline',
    sourceColumn: 'AIRLINE',
    type: 'flat',
    groupType: 'none',
    grouping: [],
};

const sampleFlightsFacet5 = {
    id: 'f5',
    name: 'Month',
    sourceColumn: 'MONTH',
    type: 'hierarchical',
    groupType: 'value',
    grouping: [[
        {
            name: 'Winter',
            foci: [12, 1, 2],
        }, {
            name: 'Spring',
            foci: [3, 4, 5],
        }, {
            name: 'Summer',
            foci: [6, 7, 8],
        }, {
            name: 'Autumn',
            foci: [9, 10, 11],
        },
    ]],
};

const sampleFlightsFacet6 = {
    id: 'f6',
    name: 'Origin Airport (by region)',
    sourceColumn: 'ORIGIN_AIRPORT',
    type: 'hierarchical',
    groupType: 'value',
    grouping: [[
        {
            name: 'Northeast',
            foci: ['Massachusetts', 'New York'],
        },
        {
            name: 'Southeast',
            foci: ['Alabama', 'Arkansas', 'Florida'],
        },
        {
            name: 'Midwest',
            foci: ['Indiana', 'Kansas'],
        },
        {
            name: 'Southwest',
            foci: ['Arizona', 'Texas'],
        },
        {
            name: 'West',
            foci: ['California', 'Alaska', 'Colorado'],
        },
    ], [
        {
            name: 'Massachusetts',
            foci: ['BOS', 'ORH'],
        }, {
            name: 'New York',
            foci: ['JFK', 'LGA', 'IAG'],
        }, {
            name: 'Alabama',
            foci: ['MGM', 'MOB'],
        }, {
            name: 'Arkansas',
            foci: ['TXK', 'XNA'],
        }, {
            name: 'Florida',
            foci: ['DAB', 'ECP', 'MIA', 'PBI'],
        }, {
            name: 'Indiana',
            foci: ['IND', 'FWA', 'SBN'],
        }, {
            name: 'Kansas',
            foci: ['MHK', 'ICT', 'GCK'],
        }, {
            name: 'Arizona',
            foci: ['PHX', 'YUM', 'TUS', 'FLG'],
        }, {
            name: 'Texas',
            foci: ['AUS', 'ELP', 'IAH', 'SAT'],
        }, {
            name: 'California',
            foci: ['LAX', 'MMH', 'BUR', 'CLD'],
        }, {
            name: 'Alaska',
            foci: ['ANC', 'YAK', 'ADK', 'ADQ', 'AKN', 'BET', 'BRW', 'CDV'],
        }, {
            name: 'Colorado',
            foci: ['DEN', 'COS'],
        },
    ]],
};

const sampleFlightsFacets = [sampleFlightsFacet1, sampleFlightsFacet2,
    sampleFlightsFacet3, sampleFlightsFacet4,
    sampleFlightsFacet5, sampleFlightsFacet6];

export default sampleFlightsFacets;
