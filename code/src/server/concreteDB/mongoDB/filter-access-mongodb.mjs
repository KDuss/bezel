import { getDB, ObjectId } from './db.mjs';
import config from '../../../public/config.mjs';

const mongodbFilter = {};

/**
 * Assemble query to enable filtering for ranges with non-defined ranges [ , ). Therefor a logical NOR query is build
 * Helper function to prepare query for mongoDB filtering
 * @param {Object[]} definedRanges - Array with defined ranges from facet description
 * @param definedRanges[].name - Represents name of one range which is displayed to user
 * @param definedRanges[].foci - Range with [start, end) value
 * @param {string} facet - Name of facet
 */
const assembleNorRangeFilter = (definedRanges, facet) => {
    const rangesWithStartEnd = definedRanges
        .filter(groupDes => groupDes.foci.length !== 0);

    const norFilterRanges = rangesWithStartEnd
        .map(groupDes => groupDes.foci);

    const queryBag = [];
    norFilterRanges.forEach(range => {
        const [start, end] = range;
        queryBag.push({ [facet]: { $gte: Number(start), $lt: Number(end) } });
    });

    return queryBag.length === 0 ? {} : { $nor: queryBag };
};

/**
 * Creates a query for one facet unit
 * Unit describes facets with OR combinations. Or one single facet if there is no OR combination.
 * Helper function to prepare query for mongoDB filtering
 * @param {Object} facetFilter - Object with part of facet description and selected ranges to fitler
 * @param {number[][]} facetFilter.foci - Selected ranges to filter
 * @param {string} facetFilter.groupType -
 * @param facetFilter.grouping - Range with [start, end) value
 * @param {string} facet - Name of facet
 */
const createUnitQuery = (facet, facetFilter) => {
    if (facetFilter.groupType === 'range') {
        const rangesToFilter = facetFilter.foci;
        const filterQuery = [];

        rangesToFilter.forEach(range => {
            if (range.length === 0) {
                filterQuery.push(assembleNorRangeFilter(
                    facetFilter.grouping, facet,
                ));
            } else {
                const [start, end] = range;
                filterQuery.push(
                    { [facet]: { $gte: Number(start), $lt: Number(end) } },
                );
            }
        });
        return { $or: filterQuery };
    }

    return { [facet]: { $in: facetFilter.foci } };
};

/**
 * Distinguish and & or operations to concat the filter query correctly
 * Helper function to prepare query for mongoDB filtering
 * @param {Object[]} facetsFilterChain - Holds all facets with selected foci and part of facet description
 * @param {Object} facetsFilterChain[].or
 * @param {string} facetsFilterChain[].or.facetName
 * @param {string[] | number[]} facetsFilterChain[].or.facetName.foci - Selected foci on specific facet
 * @param {string} facetsFilterChain[].or.facetName.groupType
 * @param {string[] | number[]}  facetsFilterChain[].or.facetName.grouping- Groups defined on facet description
 * @return A complete query that comprehends all selected foci in a combined match statement
 */
const assembleFilter = facetsFilterChain => {
    let completeQuery = [];

    completeQuery = facetsFilterChain.reduce((combinedFilter, obj) => {
        if (Object.keys(obj)[0] === 'and') {
            const unitFilterDescription = obj.and;
            const filterOfUnitFacet = [];
            Object.keys(unitFilterDescription).forEach(columnName => {
                filterOfUnitFacet.push(
                    createUnitQuery(
                        columnName,
                        unitFilterDescription[columnName],
                    ),
                );
            });
            if (filterOfUnitFacet.length !== 0) {
                combinedFilter.push(
                    { $and: filterOfUnitFacet },
                );
            }
        } else {
            // Unit describes facets with or combination. Or one single facet if there is no or combination.
            const unitFilterDescription = obj.or;

            // Unit describes facets with or combination. Or one single facet if there is no or combination.
            const filterOfUnitFacet = [];
            Object.keys(unitFilterDescription).forEach(facetName => {
                filterOfUnitFacet.push(
                    createUnitQuery(
                        facetName,
                        unitFilterDescription[facetName],
                    ),
                );
            });

            if (filterOfUnitFacet.length !== 0) {
                combinedFilter.push({ $or: filterOfUnitFacet });
            }
        }

        return combinedFilter;
    }, []);

    return completeQuery.length === 0 ? {} : { $and: completeQuery };
};

let updateTableCache = null;
/**
 * Filter data according to given filter and requested page
 * In which Seek Pagination is used to determine the page to return
 * @param {Object[]} filter - Filter database has to process.
 * @param {number} limit - Max number of data elements that should be returned
 * @param {number} page - Page to load
 * @param {string} afterId - Last element returned in previous request
 * @param {} sort - Not implemented yet, prepared for next developers
 * @return {[]} Array of Objects that each represents a row of the table
 */
mongodbFilter.updateTableEntries = async (filter, limit, page,
    afterId, sort) => {
    const toFilter = assembleFilter(filter);
    let count = 0;
    let entries = [];
    let newAfterId = '';
    let lastPage = 0;
    const oldAfterId = updateTableCache;
    updateTableCache = afterId;

    if (sort === undefined) {
        let combinedFilter = {};
        if (afterId) {
            combinedFilter = {
                $and: [
                    toFilter,
                    { _id: { $gt: ObjectId(afterId) } }],
            };
        } else {
            combinedFilter = toFilter;
        }
        entries = await getDB().aggregate([
            {
                $match: combinedFilter,
            },
        ]).limit(limit).toArray();

        count = await getDB().countDocuments(toFilter);
        lastPage = Math.ceil(count / limit);

        if (entries[entries.length - 1] && lastPage > page) {
            newAfterId = entries[entries.length - 1]._id;
        }
    }

    let next = '';
    if (newAfterId !== '') {
        next = `/filter/table-entries?limit=${limit}&page=${page + 1}&afterId=${newAfterId}`;
    }

    const links = (
        {
            prev: `/filter/table-entries?limit=${limit}&page=${page - 1}&afterId=${oldAfterId}`,
            current: `/filter/table-entries?limit=${limit}&page=${page}&afterId=${afterId}`,
            next,
        }
    );

    return {
        entries,
        count,
        links,
        page,
        lastPage,
    };
};

/**
 * Filters the documents that pass the query.
 * @param {string} facet - Name of last Facet in entire query
 * @param {Object[]} filter
 * @return {Object[]} Array of objects with _id and count as keys. _id represents Name of facet value
 */
mongodbFilter.nonRangeFacetFilter = async (facet, filter) => {
    const fociToFind = assembleFilter(filter);

    return getDB().aggregate([
        {
            $match: fociToFind,
        },
        {
            $group: {
                _id: `$${facet}`,
                count: { $sum: 1 },
            },
        },
    ]).limit(config.db.max_nr_of_foci).toArray();
};

/**
 * Prepare boundaries for bucket filter
 * @param {any[]} ranges - Array of begin and end values [begin, end] both begin and end are inclusive.
 */
const assembleRanges = ranges => {
    let rangeFilter = [];

    ranges.forEach(range => {
        if (range.foci.length === 0) return;
        const [start, end] = range.foci;

        if (rangeFilter[rangeFilter.length - 1] !== start) {
            rangeFilter = [...rangeFilter, Number(start)];
        }
        rangeFilter = [...rangeFilter, Number(end)];
    });

    return rangeFilter;
};

/**
 * Rename range named 'other' to name defined in UI
 * Complement result with range hits = 0
 */
const renameUnassignedRange = (ranges, grouping) => {
    let result = [];
    ranges.forEach(range => {
        let found;
        if (range.foci.length === 0) {
            found = grouping.find(bucket => bucket._id === 'Other');
        } else {
            // eslint-disable-next-line eqeqeq
            found = grouping.find(bucket => bucket._id == range.foci[0]);
        }

        if (found) {
            result = [...result, { _id: range.name, count: found.count }];
        } else {
            result = [...result, { _id: range.name, count: 0 }];
        }
    });

    return result;
};

/**
 * Filters the documents that pass the query
 * @param {number[] | string[]} ranges - Begin and end of range Array with two values [begin, end)).
 * @param {string} facet - Name of last Facet in entire query
 * @param {Object[]} filter
 * @return {Object[]} Array of objects with _id and count as keys. _id represents Name of facet value
 */
mongodbFilter.rangeFacetFilter = async (ranges, facet, filter) => {
    const fociToFind = assembleFilter(filter);

    const assembledRanges = assembleRanges(ranges);

    const grouping = await getDB().aggregate([
        {
            $match: fociToFind,
        }, {
            $bucket: {
                groupBy: `$${facet}`,
                boundaries: assembledRanges,
                default: 'Other',
                output: {
                    count: { $sum: 1 },
                },
            },
        }]).toArray();

    return renameUnassignedRange(ranges, grouping);
};

export default mongodbFilter;
