# Server

## Use another database
You can implement another database if you like. Therefor you have to:

1. First create a new folder at src/server/concreteDB.
2. Then you have to provide an implementation for the specific database. You need to provide two different exports: one to fulfil the interfaceFilterDB and another that fulfills the interfacReaderDB.

```javascript
const interfaceFilterDB = new Interface('AccessFilterDB', ['updateTableEntries',
    'nonRangeFacetFilter', 'rangeFacetFilter']);
    
const interfaceReaderDB = new Interface('AccessReaderDB', ['createIds',
    'createColumnIndexes']);
```

3. In the src/server/provider.mjs file you can add the correspondent method to enable using your newly integrated databse implementation.
By calling the functions provideReaderFn() and provideFilterFn() you make sure that you are providing all needed functions.

```javascript
/**
 * Short cut functions to use provided database implementations under server/concreteDB/
 */

/**
 * Here comes your function
 */
function useNewDB() {
    provideReaderFn(newDBReader);
    provideFilterFn(newDBFilter);
}
```
4. At last you can call the provided function from 3 in server.mjs.

```javascript
/**
 * Define here concrete database implementation
 */
useNewDB();
```

An don't forget to adapt the config file.
