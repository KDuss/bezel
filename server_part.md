# Server

## Use another database
You can implement another database.

1. Create a new folder ``src/server/concreteDB``.
2. Provide an implementation for the specific database. You need to provide two different exports: one to fulfil the interfaceFilterDB and another that fulfills the interfacReaderDB.

```javascript
const interfaceFilterDB = new Interface('AccessFilterDB', ['updateTableEntries',
    'nonRangeFacetFilter', 'rangeFacetFilter']);
    
const interfaceReaderDB = new Interface('AccessReaderDB', ['createIds',
    'createColumnIndexes']);
```

3. In the ``src/server/provider.mjs`` file you can add the correspondent method to enable using your newly integrated database implementation.
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
4. Call the provided function from 3 in server.mjs.

```javascript
/**
 * Define here concrete database implementation
 */
useNewDB();
```

**Important**:And don't forget to adapt the config file.
