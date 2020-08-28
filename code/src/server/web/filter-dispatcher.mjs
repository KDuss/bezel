import express from 'express';
import mongodbFilter from '../concreteDB/mongoDB/filter-access-mongodb.mjs';

const {
    updateTableEntries,
    nonRangeFacetFilter,
    rangeFacetFilter,
} = mongodbFilter;
const router = express.Router();

/**
 * @api {post} /filter/entries Get table entries
 * @apiVersion 0.0.0
 * @apiDescription GET all remaining entries after filtering to be displayed in table
 * @apiName TableEntries
 * @apiGroup Entries
 *
 * @apiParam {Object[]} filter Filter database has to process.
 * @apiParam {Object} filter.combination Process combination, combination is a placeholder for and/or.
 * @apiParam {Object} filter.combination.facetName Name of facet, facetName is a placeholder for the real facet name.
 * @apiParam {string[]} filter.combination.facetName.foci To filter facet values
 * @apiParam {string} filter.combination.facetName.groupType Defines how facets are grouped. Possible values: none, value and range.
 * @apiParam {Object[[]]} filter.combination.facetName.grouping Defines how facet values are grouped
 * @apiParam {Object} pagination Gathers all values needed for pagination. The developer is free to choose in which manner it will be implemented.
 * @apiParam {Object[]} sorter Gathers all active sort columns in table
 * @apiParam {string} sorter.column Column name
 * @apiParam {string ="asc", "desc"} sorter.sortOrder Indicates ascending or descending sort order
 *
 * @apiSuccess {string} columnName Name of specific column in orig data.
 *
 * @apiSuccessExample Success-Response:
 *      HTTP/1.1 200 OK
 *      {
 *        entries:
 *          [
 *            {
 *              columnNameX: columnXValue1,
 *              columnNameY: columnYValue1,
 *              columnNameZ: columnZValue1
 *            },{
 *              columnNameX: columnXValue2,
 *              columnNameY: columnYValue2,
 *              columnNameZ: columnZValue2
 *            },
 *            ...
 *          ]
 *      }
 *
 * @apiError (5xxx) InternalServerError Problems with request processing or database connection.
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 500 Internal Server Error
 */
router.post('/table-entries', (req, res) => {
    // limit=20&after_id=20
    // sort=desc(last_modified),asc(email)
    const {
        limit,
        page,
        afterId,
        sort,
    } = req.query;
    const filter = req.body;

    updateTableEntries(filter, Number(limit), Number(page),
        afterId, sort).then(result => {
        res.status(200).send(result);
    }).catch(error => {
        console.error(error);
        res.status(500).send();
    });
});

/**
 * @api {post} /filter/filtered-foci Get updated scores
 * @apiVersion 0.0.0
 * @apiDescription Get recalculated scores for each displayed focus after filtering for
 * facet n after applying the first n-1 filters.
 * @apiName ScoresFoci
 * @apiGroup Foci
 *
 * @apiParam {Object[]} filter Filter database has to process.
 * @apiParam {Object} filter.combination Process combination, combination is a placeholder for and/or.
 * @apiParam {Object} filter.combination.facetName Name of facet, facetName is a placeholder for the real facet name.
 * @apiParam {string[]} filter.combination.facetName.foci To filter facet values
 * @apiParam {string} filter.combination.facetName.groupType Defines how facets are grouped. Possible values: none, value and range.
 * @apiParam {Object[[]]} filter.combination.facetName.grouping Defines how facet values are grouped.
 * @apiParam {number} groupType Identifier how the foci on the last facet in the query are grouped. Is either none for flat facets, value for grouped facets or range for range facets.
 * @apiParam {Object[]} grouping Defined groups on facet.
 * @apiParam {string} grouping.name Name of range displayed to user.
 * @apiParam {number[] | string[]} grouping.foci Facet value which are included in this group. (For groupType = range Array with two values [begin, end)).
 *
 * @apiSuccess {string} _id Name of facet value
 * @apiSuccess {string} count Number of found scores.
 *
 * @apiSuccessExample Success-Response:
 *      HTTP/1.1 200 OK
 *      [
 *            {
 *              _id: '1-10',
 *              count: 8124,
 *            },
 *            ...
 *      ]
 *
 * @apiError (5xxx) InternalServerError Problems with request processing or database connection.
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 500 Internal Server Error
 */
router.post('/facet-values', (req, res) => {
    const { facet: facetName } = req.query;
    const { filter, groupType, grouping } = req.body;

    if (groupType === 'range') {
        rangeFacetFilter(grouping, facetName, filter).then(result => {
            res.status(200).send(result);
        }).catch(error => {
            console.error(error);
            res.status(500).send();
        });
    } else {
        nonRangeFacetFilter(facetName, filter).then(nOFoci => {
            res.send(nOFoci);
        }).catch(error => {
            console.error(error);
            res.status(500).send();
        });
    }
});

export default router;
