import './facetServiceDoc.js';

const entries = [{
    id: '1',
    regCol1: 'entry-1-col-1',
    regCol2: 'entry-1-col-2',
    regCol3: 'entry-1-col-3',
    numCol1: -10,
    numCol2: -100.123,
}, {
    id: '2',
    regCol1: 'entry-2-col-1',
    regCol2: 'entry-2-col-2',
    regCol3: 'entry-2-col-3',
    numCol1: 0,
    numCol2: -10.4866,
}, {
    id: '3',
    regCol1: 'entry-3-col-1',
    regCol2: 'entry-3-col-2',
    regCol3: 'entry-3-col-3',
    numCol1: 0,
    numCol2: -9.9,
}, {
    id: '4',
    regCol1: 'entry-1-col-1',
    regCol2: 'entry-4-col-2',
    regCol3: 'entry-4-col-3',
    numCol1: 10,
    numCol2: 0,
}, {
    id: '5',
    regCol1: 'entry-1-col-1',
    regCol2: 'entry-5-col-2',
    regCol3: 'entry-5-col-3',
    numCol1: 10,
    numCol2: 10.4,
}, {
    id: '6',
    regCol1: 'entry-2-col-1',
    regCol2: 'entry-6-col-2',
    regCol3: 'entry-6-col-3',
    numCol1: 12,
    numCol2: 10.778,
}, {
    id: '7',
    regCol1: 'entry-7-col-1',
    regCol2: 'entry-7-col-2',
    regCol3: 'entry-7-col-3',
    numCol1: 12,
    numCol2: 11.0,
}, {
    id: '8',
    regCol1: 'entry-7-col-1',
    regCol2: 'entry-7-col-2',
    regCol3: 'entry-7-col-3',
    numCol1: 12,
    numCol2: 11.1,
}, {
    id: '9',
    regCol1: 'entry-7-col-1',
    regCol2: 'entry-7-col-2',
    regCol3: 'entry-7-col-3',
    numCol1: 20,
    numCol2: 20.8596,
}, {
    id: '10',
    regCol1: 'entry-7-col-1',
    regCol2: 'entry-7-col-2',
    regCol3: 'entry-7-col-3',
    numCol1: 20,
    numCol2: 100.145548,
}];

/**
 * @param {Filter[]} filter
 * @returns {FilteredDataResponse}
 */
const getFilteredData = filter => {
    const setFilter = filter.map(f => f.or || f.and);

    const filtered = entries.filter(e => {
        const keep = [];
        // eslint-disable-next-line no-restricted-syntax
        for (const f of setFilter) {
            const keepTmp = [];
            // eslint-disable-next-line no-restricted-syntax
            for (const col of Object.keys(f)) {
                const type = f[col].groupType;

                let tmp = false;
                if (type === 'range') {
                    f[col].foci.forEach(group => {
                        if (e[col] >= Number(group[0])
                            && e[col] < Number(group[1])) {
                            tmp = true;
                        }
                    });
                } else if ((f[col].foci.includes(e[col]))) {
                    tmp = true;
                }
                keepTmp.push(tmp);
            }
            keep.push(keepTmp.some(b => b));
        }
        return keep.every(b => b);
    });
    return {
        data: filtered,
        count: filtered.length,
    };
};

/**
 * @param {FacetDescription} facetDescription
 * @param {Filter[]} filter
 * @returns {FocusCount}
 */
const getFilteredFoci = (facetDescription, filter) => {
    const foci = getFilteredData(filter)
        .data
        .map(e => e[facetDescription.sourceColumn]);

    const res = [];
    if (facetDescription.groupType === 'range') {
        facetDescription.grouping.forEach(group => {
            let cnt = 0;
            foci.forEach(focus => {
                if (focus >= Number(group.foci[0])
                    && focus < Number(group.foci[1])) {
                    cnt += 1;
                }
            });
            if (cnt > 0) {
                res.push({
                    _id: group.name,
                    count: cnt,
                });
            }
        });
    } else {
        const reducer = (acc, e) => acc.set(e, (acc.get(e) || 0) + 1);
        const fociMap = foci.reduce(reducer, new Map());

        Array.from(fociMap.keys())
            .forEach(key => {
                res.push({
                    _id: key,
                    count: fociMap.get(key),
                });
            });
    }
    return res;
};

/**
 * Factory for local {@link FacetService} functions required for testing
 * @returns { FacetService }
 */
const facetServices = () => ({
    getFilteredFoci,
    getFilteredData,
});

export default facetServices;
