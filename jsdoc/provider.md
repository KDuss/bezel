## Functions

<dl>
<dt><a href="#provideFilterFn">provideFilterFn(concreteDBImpl)</a></dt>
<dd><p>Transfer concrete database implementation for all filter functions.
Provided functions have to fulfil the interface @see <a href="interfaceFilterDB">interfaceFilterDB</a>.</p>
</dd>
<dt><a href="#provideReaderFn">provideReaderFn(concreteDBImpl)</a></dt>
<dd><p>Transfer concrete database implementation for all needed functions to read in data set.
Provided functions have to fulfil the interface @see <a href="interfaceReaderDB">interfaceReaderDB</a>.</p>
</dd>
<dt><a href="#useMongoDB">useMongoDB()</a></dt>
<dd><p>Short cut function for using MongoDB implementation.</p>
</dd>
</dl>

<a name="provideFilterFn"></a>

## provideFilterFn(concreteDBImpl)
Transfer concrete database implementation for all filter functions.Provided functions have to fulfil the interface @see [interfaceFilterDB](interfaceFilterDB).

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| concreteDBImpl | <code>Object</code> | Object with all needed functions as keys @see [interfaceFilterDB](interfaceFilterDB). |

<a name="provideReaderFn"></a>

## provideReaderFn(concreteDBImpl)
Transfer concrete database implementation for all needed functions to read in data set.Provided functions have to fulfil the interface @see [interfaceReaderDB](interfaceReaderDB).

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| concreteDBImpl | <code>Object</code> | Object with all needed functions as keys @see [interfaceReaderDB](interfaceReaderDB). |

<a name="useMongoDB"></a>

## useMongoDB()
Short cut function for using MongoDB implementation.

**Kind**: global function  
