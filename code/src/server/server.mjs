import express from 'express';
import apiDoc from 'api-doc';
import filter from './web/filter-dispatcher.mjs';
import reader from './web/file-reader-dispatcher.mjs';
import config from '../public/config.mjs';
import { useMongoDB } from './provider.mjs';

import * as db from './concreteDB/mongoDB/db.mjs';
/**
 * Launch Express Server
*/
const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

/**
 * Define here concrete database implementation
 */
useMongoDB();

/**
 * Middleware
 */
app.use('/filter', filter);
app.use('/file-reader', reader);

/**
 * Integrate API Doc
 * */
app.get('/apidoc/', apiDoc(app));

app.use(express.static('../public'));

/**
 * Connect to MongoDB
 */
db.connect(err => {
    if (err) {
        console.log('unable to connect to database');
        process.exit(1);
    } else {
        app.listen(config.app.port, () => {
            console.log(`Connected to database \n 
                App listening on port ${config.app.port}`);
        });
    }
});
