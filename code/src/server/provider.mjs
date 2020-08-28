import { interfaceFilterDB, interfaceReaderDB } from './interface/concreteInterface.mjs';
import Interface from './interface/interface.mjs';
import mongodbReader from './concreteDB/mongoDB/reader-access-mongodb.mjs';
import mongodbFilter from './concreteDB/mongoDB/filter-access-mongodb.mjs';

// eslint-disable-next-line import/no-mutable-exports
let concreteDBFilterImpl;
// eslint-disable-next-line import/no-mutable-exports
let concreteDBReaderImpl;

/**
 * Transfer concrete database implementation for all filter functions.
 * Provided functions have to fulfil the interface @see {@link interfaceFilterDB}.
 * @param {Object} concreteDBImpl - Object with all needed functions as keys @see {@link interfaceFilterDB}.
 */
function provideFilterFn(concreteDBImpl) {
    try {
        Interface.ensureImplements(concreteDBImpl, interfaceFilterDB);
        concreteDBFilterImpl = concreteDBImpl;
    } catch (error) {
        console.log(error);
        console.log('Concrete database is not '
                + 'implemented according to the interface');
    }
}

/**
 * Transfer concrete database implementation for all needed functions to read in data set.
 * Provided functions have to fulfil the interface @see {@link interfaceReaderDB}.
 * @param {Object} concreteDBImpl - Object with all needed functions as keys @see {@link interfaceReaderDB}.
 */
function provideReaderFn(concreteDBImpl) {
    try {
        Interface.ensureImplements(concreteDBImpl, interfaceReaderDB);
        concreteDBReaderImpl = concreteDBImpl;
    } catch (error) {
        console.log(error);
        console.log('Concrete database is not '
            + 'implemented according to the interface');
    }
}

/**
 * Short cut functions to use provided database implementations under server/concreteDB/
 */

/**
 * Short cut function for using MongoDB implementation.
 */
function useMongoDB() {
    provideReaderFn(mongodbReader);
    provideFilterFn(mongodbFilter);
}

export {
    concreteDBFilterImpl,
    concreteDBReaderImpl,
    provideFilterFn,
    provideReaderFn,
    useMongoDB,
};
