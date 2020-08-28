## Functions

<dl>
<dt><a href="#updateTableEntries">updateTableEntries(filter, limit, page, afterId, sort)</a> ⇒ <code>Array.&lt;Object&gt;</code></dt>
<dd><p>Filter data according to given filter and requested page number.</p>
</dd>
<dt><a href="#nonRangeFacetFilter">nonRangeFacetFilter(facet, filter)</a> ⇒ <code>Array.&lt;Object&gt;</code></dt>
<dd><p>Filters the data and counts hits for each facet value</p>
</dd>
<dt><a href="#rangeFacetFilter">rangeFacetFilter(ranges, facet, filter)</a> ⇒ <code>Array.&lt;Object&gt;</code></dt>
<dd><p>Filters the data and counts hits for each facet value</p>
</dd>
<dt><a href="#createIds">createIds()</a></dt>
<dd><p>Creates an additional id field for each database entry in a type format that can be interpreted by the client.</p>
</dd>
</dl>

## Interfaces

<dl>
<dt><a href="#interfaceFilterDB">interfaceFilterDB</a></dt>
<dd><p>Interface for functions to provide for filter/ api</p>
</dd>
<dt><a href="#interfaceFilterDB">interfaceFilterDB</a></dt>
<dd><p>Interface for functions to provide for /file-reader api</p>
</dd>
<dt><a href="#Interface">Interface</a></dt>
<dd><p>Defines a general Interface</p>
</dd>
</dl>

<a name="interfaceFilterDB"></a>

## interfaceFilterDB
Interface for functions to provide for filter/ api

**Kind**: global interface  
<a name="interfaceFilterDB"></a>

## interfaceFilterDB
Interface for functions to provide for /file-reader api

**Kind**: global interface  
<a name="Interface"></a>

## Interface
Defines a general Interface

**Kind**: global interface  

| Param | Type | Description |
| --- | --- | --- |
| name | <code>string</code> | Name of concrete Interface |
| methods | <code>Array.&lt;string&gt;</code> | Method names of concrete interface Resource [ Pro JavaScript Design Patterns](https://link.springer.com/book/10.1007/978-1-4302-0496-1) |

<a name="updateTableEntries"></a>

## updateTableEntries(filter, limit, page, afterId, sort) ⇒ <code>Array.&lt;Object&gt;</code>
Filter data according to given filter and requested page number.

**Kind**: global function  
**Returns**: <code>Array.&lt;Object&gt;</code> - Array of Objects where each object represents a row of the data table  

| Param | Type | Description |
| --- | --- | --- |
| filter | <code>Array.&lt;Object&gt;</code> | Filter database has to process. |
| limit | <code>number</code> | Max number of data elements that should be returned |
| page | <code>number</code> | Page to load |
| afterId | <code>string</code> | Last element returned in previous request |
| sort | <code>\*</code> | Not implemented yet, prepared for next developers |

<a name="nonRangeFacetFilter"></a>

## nonRangeFacetFilter(facet, filter) ⇒ <code>Array.&lt;Object&gt;</code>
Filters the data and counts hits for each facet value

**Kind**: global function  
**Returns**: <code>Array.&lt;Object&gt;</code> - Array of objects with _id and count as keys. _id: represents name of facet value.  

| Param | Type | Description |
| --- | --- | --- |
| facet | <code>string</code> | Name of last Facet in entire query |
| filter | <code>Array.&lt;Object&gt;</code> |  |

<a name="rangeFacetFilter"></a>

## rangeFacetFilter(ranges, facet, filter) ⇒ <code>Array.&lt;Object&gt;</code>
Filters the data and counts hits for each facet value

**Kind**: global function  
**Returns**: <code>Array.&lt;Object&gt;</code> - Array of objects with _id and count as keys. _id: represents name of facet value.  

| Param | Type | Description |
| --- | --- | --- |
| ranges | <code>Array.&lt;number&gt;</code> \| <code>Array.&lt;string&gt;</code> | Begin and end of range Array with two values [begin, end)). |
| facet | <code>string</code> | Name of last Facet in entire query |
| filter | <code>Array.&lt;Object&gt;</code> |  |

<a name="createIds"></a>

## createIds()
Creates an additional id field for each database entry in a type format that can be interpreted by the client.

**Kind**: global function  
