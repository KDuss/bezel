/**
 * Returns true, if the data for a specific row passes the filter.
 * @param {Object} rowData
 * @param filter
 * @returns {boolean}
 */
const filterAccepts = (rowData, filter) => {
    const keep = [];
    filter.map(f => f.or || f.and).forEach(f => {
        const matchAny = [];
        Object.keys(f).forEach(col => {
            const type = f[col].groupType;
            let match = false;
            if (type === 'range') {
                f[col].foci.forEach(group => {
                    if (rowData[col] >= Number(group[0])
                        && rowData[col] < Number(group[1])) {
                        match = true;
                    }
                });
            } else if ((f[col].foci.includes(rowData[col]))) {
                match = true;
            }
            matchAny.push(match);
        });
        keep.push(matchAny.some(b => b));
    });
    return keep.every(b => b);
};

export default filterAccepts;
