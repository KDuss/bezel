## Constants

<dl>
<dt><a href="#PAGE_SIZE">PAGE_SIZE</a> : <code>number</code></dt>
<dd><p>Number of entries to be return when fetching data.</p>
</dd>
</dl>

## Functions

<dl>
<dt><a href="#getFilteredData">getFilteredData(filter, url)</a> ⇒ <code><a href="#FilteredDataResponse">Promise.&lt;FilteredDataResponse&gt;</a></code></dt>
<dd><p>Fetch {@Link PAGE_SIZE} entries fulfilling a filter from the database.
Also returns the total amount of entries for the given filter.</p>
</dd>
<dt><a href="#getFilteredFoci">getFilteredFoci(facetDescription, filter)</a> ⇒ <code>Promise.&lt;Array.&lt;FocusCount&gt;&gt;</code></dt>
<dd></dd>
<dt><a href="#facetServices">facetServices()</a> ⇒ <code><a href="#FacetService">FacetService</a></code></dt>
<dd><p>Factory for remote <a href="#FacetService">FacetService</a> functions. Communicates with server.</p>
</dd>
</dl>

## Typedefs

<dl>
<dt><a href="#FilteredDataResponse">FilteredDataResponse</a> : <code>Object</code></dt>
<dd><p>Service response to request for filtered data entries.</p>
</dd>
<dt><a href="#FocusCount">FocusCount</a> : <code>Object</code></dt>
<dd></dd>
<dt><a href="#FacetService">FacetService</a> : <code>Object</code></dt>
<dd><p>Interface for service.</p>
</dd>
</dl>

<a name="PAGE_SIZE"></a>

## PAGE\_SIZE : <code>number</code>
Number of entries to be return when fetching data.

**Kind**: global constant  
<a name="getFilteredData"></a>

## getFilteredData(filter, url) ⇒ [<code>Promise.&lt;FilteredDataResponse&gt;</code>](#FilteredDataResponse)
Fetch {@Link PAGE_SIZE} entries fulfilling a filter from the database.Also returns the total amount of entries for the given filter.

**Kind**: global function  

| Param | Type |
| --- | --- |
| filter | <code>Array.&lt;Filter&gt;</code> | 
| url | <code>string</code> | 

<a name="getFilteredFoci"></a>

## getFilteredFoci(facetDescription, filter) ⇒ <code>Promise.&lt;Array.&lt;FocusCount&gt;&gt;</code>
**Kind**: global function  

| Param | Type |
| --- | --- |
| facetDescription | <code>FacetDescription</code> | 
| filter | <code>Array.&lt;Filter&gt;</code> | 

<a name="facetServices"></a>

## facetServices() ⇒ [<code>FacetService</code>](#FacetService)
Factory for remote [FacetService](#FacetService) functions. Communicates with server.

**Kind**: global function  
<a name="FilteredDataResponse"></a>

## FilteredDataResponse : <code>Object</code>
Service response to request for filtered data entries.

**Kind**: global typedef  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| data | <code>Array.&lt;Object&gt;</code> | Entries in data source (all columns) |
| count | <code>number</code> | Number of entries |
| links | <code>Object</code> | Links for fetching previous, current and next page of entries |
| currentPage | <code>number</code> |  |
| lastPage | <code>number</code> |  |

<a name="FocusCount"></a>

## FocusCount : <code>Object</code>
**Kind**: global typedef  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| _id | <code>string</code> | Focus text |
| count | <code>number</code> | Number of times the focus occurs |

<a name="FacetService"></a>

## FacetService : <code>Object</code>
Interface for service.

**Kind**: global typedef  
**Properties**

| Name | Type |
| --- | --- |
| getFilteredData | <code>function</code> | 
| getFilteredFoci | <code>function</code> | 

