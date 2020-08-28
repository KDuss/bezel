## Constants

<dl>
<dt><a href="#dbName">dbName</a></dt>
<dd><p>ATP DB</p>
</dd>
</dl>

## Functions

<dl>
<dt><a href="#assembleNorRangeFilter">assembleNorRangeFilter(definedRanges, facet)</a></dt>
<dd><p>Assemble query to enable filtering for ranges with non-defined ranges [ , ). Therefor a logical NOR query is build
Helper function to prepare query for mongoDB filtering</p>
</dd>
<dt><a href="#createUnitQuery">createUnitQuery(facetFilter, facet)</a></dt>
<dd><p>Creates a query for one facet unit
Unit describes facets with OR combinations. Or one single facet if there is no OR combination.
Helper function to prepare query for mongoDB filtering</p>
</dd>
<dt><a href="#assembleFilter">assembleFilter(facetsFilterChain)</a> ⇒</dt>
<dd><p>Distinguish and &amp; or operations to concat the filter query correctly
Helper function to prepare query for mongoDB filtering</p>
</dd>
<dt><a href="#assembleRanges">assembleRanges(ranges)</a></dt>
<dd><p>Prepare boundaries for bucket filter</p>
</dd>
<dt><a href="#renameUnassignedRange">renameUnassignedRange()</a></dt>
<dd><p>Rename range named &#39;other&#39; to name defined in UI
Complement result with range hits = 0</p>
</dd>
</dl>

<a name="dbName"></a>

## dbName
ATP DB

**Kind**: global constant  
<a name="assembleNorRangeFilter"></a>

## assembleNorRangeFilter(definedRanges, facet)
Assemble query to enable filtering for ranges with non-defined ranges [ , ). Therefor a logical NOR query is buildHelper function to prepare query for mongoDB filtering

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| definedRanges | <code>Array.&lt;Object&gt;</code> | Array with defined ranges from facet description |
| definedRanges[].name |  | Represents name of one range which is displayed to user |
| definedRanges[].foci |  | Range with [start, end) value |
| facet | <code>string</code> | Name of facet |

<a name="createUnitQuery"></a>

## createUnitQuery(facetFilter, facet)
Creates a query for one facet unitUnit describes facets with OR combinations. Or one single facet if there is no OR combination.Helper function to prepare query for mongoDB filtering

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| facetFilter | <code>Object</code> | Object with part of facet description and selected ranges to fitler |
| facetFilter.foci | <code>Array.&lt;Array.&lt;number&gt;&gt;</code> | Selected ranges to filter |
| facetFilter.groupType | <code>string</code> | - |
| facetFilter.grouping |  | Range with [start, end) value |
| facet | <code>string</code> | Name of facet |

<a name="assembleFilter"></a>

## assembleFilter(facetsFilterChain) ⇒
Distinguish and & or operations to concat the filter query correctlyHelper function to prepare query for mongoDB filtering

**Kind**: global function  
**Returns**: A complete query that comprehends all selected foci in a combined match statement  

| Param | Type | Description |
| --- | --- | --- |
| facetsFilterChain | <code>Array.&lt;Object&gt;</code> | Holds all facets with selected foci and part of facet description |
| facetsFilterChain[].or | <code>Object</code> |  |
| facetsFilterChain[].or.facetName | <code>string</code> |  |
| facetsFilterChain[].or.facetName.foci | <code>Array.&lt;string&gt;</code> \| <code>Array.&lt;number&gt;</code> | Selected foci on specific facet |
| facetsFilterChain[].or.facetName.groupType | <code>string</code> |  |
| facetsFilterChain[].or.facetName.grouping- | <code>Array.&lt;string&gt;</code> \| <code>Array.&lt;number&gt;</code> | Groups defined on facet description |

<a name="assembleRanges"></a>

## assembleRanges(ranges)
Prepare boundaries for bucket filter

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| ranges | <code>Array.&lt;any&gt;</code> | Array of begin and end values [begin, end] both begin and end are inclusive. |

<a name="renameUnassignedRange"></a>

## renameUnassignedRange()
Rename range named 'other' to name defined in UIComplement result with range hits = 0

**Kind**: global function  
