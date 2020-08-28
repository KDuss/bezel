import express from 'express';
import mongodbReader from '../concreteDB/mongoDB/reader-access-mongodb.mjs';

const { createIds, createColumnIndexes } = mongodbReader;

const router = express.Router();

/**
 * @api {post} /generate-id Generate IDs
 * @apiVersion 0.0.0
 * @apiDescription Generate for each table entry an ID that is unique within the data set.
 * @apiName IDGenerator
 * @apiGroup FileReader
 */
router.post('/generate-id', (req, res) => {
    createIds().then(successful => {
        if (successful) res.status(201).send();
        else res.status(409).send();
    }).catch(error => {
        console.log(error);
        res.status(500).send();
    });
});

/**
 * @api {post} /ensure-indexes Create indexes
 * @apiVersion 0.0.0
 * @apiDescription Create an index for each column name in the request body.
 * @apiName IndexCreator
 * @apiGroup FileReader
 */
router.post('/ensure-indexes', (req, res) => {
    const { columns } = req.body;

    createColumnIndexes(columns).then(successful => {
        if (successful) res.status(201).send();
        else res.status(409).send();
    }).catch(error => {
        console.log(error);
        res.status(500).send();
    });
});

export default router;
