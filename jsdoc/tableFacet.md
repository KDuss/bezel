## Functions

<dl>
<dt><a href="#TableFacet">TableFacet(service)</a> ⇒ <code><a href="#TableFacet">TableFacet</a></code></dt>
<dd><p>Create <a href="#TableFacet">TableFacet</a>.</p>
</dd>
<dt><a href="#setSliderPosition">setSliderPosition(scrollElement)</a></dt>
<dd></dd>
<dt><a href="#fillTableRow">fillTableRow(controller, module, facet, item, row, scrollContainer)</a></dt>
<dd></dd>
<dt><a href="#printHeader">printHeader(root, item, columnsToIgnore)</a></dt>
<dd></dd>
<dt><a href="#enableLazyLoading">enableLazyLoading(facet, observable)</a></dt>
<dd><p>Observes if scroller has reached the end of table and next data needs to be loaded</p>
</dd>
<dt><a href="#clearTable">clearTable(root)</a></dt>
<dd></dd>
<dt><a href="#printTable">printTable(controller, module, facet, root, scrollContainer)</a></dt>
<dd><p>Renders the filtered data.</p>
</dd>
<dt><a href="#dataTable">dataTable(controller, module, facet)</a></dt>
<dd></dd>
<dt><a href="#countView">countView(facet)</a></dt>
<dd></dd>
<dt><a href="#tableFacetProjector">tableFacetProjector(controller, module, root)</a></dt>
<dd><p>Projector for table facet.</p>
</dd>
<dt><a href="#TableModule">TableModule(id, name, service, columnsToIgnore)</a> ⇒ <code><a href="#TableModule">TableModule</a></code></dt>
<dd><p>Create <a href="#TableModule">TableModule</a></p>
</dd>
<dt><a href="#tableModuleProjector">tableModuleProjector(mainController, module, root)</a></dt>
<dd><p>Projector specific to TableModule.</p>
</dd>
</dl>

## Typedefs

<dl>
<dt><a href="#TableFacetTarget">TableFacetTarget</a> : <code>ObservablesCollection</code></dt>
<dd><p>Presentation model for a single table entry</p>
</dd>
<dt><a href="#TableFacet">TableFacet</a> : <code>Facet</code></dt>
<dd><p>Controller for a table facet.</p>
</dd>
<dt><a href="#TableModule">TableModule</a> ⇒ <code><a href="#TableModule">TableModule</a></code></dt>
<dd><p>Controller for a module of type table.</p>
</dd>
</dl>

<a name="TableFacet"></a>

## TableFacet(service) ⇒ [<code>TableFacet</code>](#TableFacet)
Create [TableFacet](#TableFacet).

**Kind**: global function  

| Param | Type |
| --- | --- |
| service | <code>FacetService</code> | 


* [TableFacet(service)](#TableFacet) ⇒ [<code>TableFacet</code>](#TableFacet)
    * [~getFilter()](#TableFacet..getFilter) ⇒ <code>Object.&lt;string, FacetSelection&gt;</code>
    * [~setPaginationAttr(links, lastPage, currentPage)](#TableFacet..setPaginationAttr)
    * [~setRowData(data)](#TableFacet..setRowData)
    * [~lazyLoading(pageLink)](#TableFacet..lazyLoading)
    * [~update(filter)](#TableFacet..update)
    * [~makeSelection(target)](#TableFacet..makeSelection)

<a name="TableFacet..getFilter"></a>

### TableFacet~getFilter() ⇒ <code>Object.&lt;string, FacetSelection&gt;</code>
Returns the filter object for this facet.

**Kind**: inner method of [<code>TableFacet</code>](#TableFacet)  
<a name="TableFacet..setPaginationAttr"></a>

### TableFacet~setPaginationAttr(links, lastPage, currentPage)
Set attributes for pagination

**Kind**: inner method of [<code>TableFacet</code>](#TableFacet)  

| Param | Type | Description |
| --- | --- | --- |
| links | <code>Object</code> | Shortcut url links for next request |
| lastPage | <code>Number</code> |  |
| currentPage | <code>Number</code> |  |

<a name="TableFacet..setRowData"></a>

### TableFacet~setRowData(data)
**Kind**: inner method of [<code>TableFacet</code>](#TableFacet)  

| Param | Type |
| --- | --- |
| data | <code>Array.&lt;Object&gt;</code> | 

<a name="TableFacet..lazyLoading"></a>

### TableFacet~lazyLoading(pageLink)
Trigger fetching next data bucket for table

**Kind**: inner method of [<code>TableFacet</code>](#TableFacet)  

| Param | Type | Description |
| --- | --- | --- |
| pageLink | <code>string</code> | URL to get next entries to load |

<a name="TableFacet..update"></a>

### TableFacet~update(filter)
Update the values of the facet based on the given filter.

**Kind**: inner method of [<code>TableFacet</code>](#TableFacet)  

| Param | Type | Description |
| --- | --- | --- |
| filter | <code>Array.&lt;Filter&gt;</code> | Describes the selection set in all preceding facets and modules |

<a name="TableFacet..makeSelection"></a>

### TableFacet~makeSelection(target)
Select a row of the table.

**Kind**: inner method of [<code>TableFacet</code>](#TableFacet)  

| Param | Type |
| --- | --- |
| target | [<code>TableFacetTarget</code>](#TableFacetTarget) | 

<a name="setSliderPosition"></a>

## setSliderPosition(scrollElement)
**Kind**: global function  

| Param | Type |
| --- | --- |
| scrollElement | <code>HTMLDivElement</code> | 

<a name="fillTableRow"></a>

## fillTableRow(controller, module, facet, item, row, scrollContainer)
**Kind**: global function  

| Param | Type |
| --- | --- |
| controller | <code>MainController</code> | 
| module | [<code>TableModule</code>](#TableModule) | 
| facet | [<code>TableFacet</code>](#TableFacet) | 
| item | <code>ObservablesCollection</code> | 
| row | <code>HTMLTableRowElement</code> | 
| scrollContainer | <code>HTMLDivElement</code> | 

<a name="printHeader"></a>

## printHeader(root, item, columnsToIgnore)
**Kind**: global function  

| Param | Type |
| --- | --- |
| root | <code>HTMLTableElement</code> | 
| item | <code>ObservablesCollection</code> | 
| columnsToIgnore | <code>Array.&lt;string&gt;</code> | 

<a name="enableLazyLoading"></a>

## enableLazyLoading(facet, observable)
Observes if scroller has reached the end of table and next data needs to be loaded

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| facet | [<code>TableFacet</code>](#TableFacet) | Facet scrolling has to be bound to |
| observable | <code>HTMLDivElement</code> | Element to observe for scroll activity |

<a name="clearTable"></a>

## clearTable(root)
**Kind**: global function  

| Param | Type |
| --- | --- |
| root | <code>HTMLTableElement</code> | 

<a name="printTable"></a>

## printTable(controller, module, facet, root, scrollContainer)
Renders the filtered data.

**Kind**: global function  

| Param | Type |
| --- | --- |
| controller | <code>MainController</code> | 
| module | [<code>TableModule</code>](#TableModule) | 
| facet | [<code>TableFacet</code>](#TableFacet) | 
| root | <code>HTMLTableElement</code> | 
| scrollContainer | <code>HTMLDivElement</code> | 

<a name="dataTable"></a>

## dataTable(controller, module, facet)
**Kind**: global function  

| Param | Type |
| --- | --- |
| controller | <code>MainController</code> | 
| module | [<code>TableModule</code>](#TableModule) | 
| facet | [<code>TableFacet</code>](#TableFacet) | 

<a name="countView"></a>

## countView(facet)
**Kind**: global function  

| Param | Type |
| --- | --- |
| facet | [<code>TableFacet</code>](#TableFacet) | 

<a name="tableFacetProjector"></a>

## tableFacetProjector(controller, module, root)
Projector for table facet.

**Kind**: global function  

| Param | Type |
| --- | --- |
| controller | <code>MainController</code> | 
| module | [<code>TableModule</code>](#TableModule) | 
| root | <code>HTMLDivElement</code> | 

<a name="TableModule"></a>

## TableModule(id, name, service, columnsToIgnore) ⇒ [<code>TableModule</code>](#TableModule)
Create [TableModule](#TableModule)

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| id | <code>string</code> |  |
| name | <code>string</code> |  |
| service | <code>FacetService</code> |  |
| columnsToIgnore | <code>Array.&lt;string&gt;</code> | Array of columns that are ignored |


* [TableModule(id, name, service, columnsToIgnore)](#TableModule) ⇒ [<code>TableModule</code>](#TableModule)
    * [~makeSelection(f, target)](#TableModule..makeSelection)
    * [~getFilter()](#TableModule..getFilter) ⇒ <code>Array.&lt;Filter&gt;</code>
    * [~update(filter)](#TableModule..update)

<a name="TableModule..makeSelection"></a>

### TableModule~makeSelection(f, target)
Relays to facet.

**Kind**: inner method of [<code>TableModule</code>](#TableModule)  

| Param | Type |
| --- | --- |
| f | [<code>TableFacet</code>](#TableFacet) | 
| target | [<code>TableFacetTarget</code>](#TableFacetTarget) | 

<a name="TableModule..getFilter"></a>

### TableModule~getFilter() ⇒ <code>Array.&lt;Filter&gt;</code>
Relays to facet.

**Kind**: inner method of [<code>TableModule</code>](#TableModule)  
<a name="TableModule..update"></a>

### TableModule~update(filter)
Relays to facet.

**Kind**: inner method of [<code>TableModule</code>](#TableModule)  

| Param | Type |
| --- | --- |
| filter | <code>Array.&lt;Filter&gt;</code> | 

<a name="tableModuleProjector"></a>

## tableModuleProjector(mainController, module, root)
Projector specific to TableModule.

**Kind**: global function  

| Param | Type |
| --- | --- |
| mainController | <code>MainController</code> | 
| module | [<code>TableModule</code>](#TableModule) | 
| root | <code>HTMLDivElement</code> | 

<a name="TableFacetTarget"></a>

## TableFacetTarget : <code>ObservablesCollection</code>
Presentation model for a single table entry

**Kind**: global typedef  
<a name="TableFacet"></a>

## TableFacet : <code>Facet</code>
Controller for a table facet.

**Kind**: global typedef  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| state | <code>ObservableList</code> | List of [ObservablesCollection](ObservablesCollection) containing information about data set entries |
| countState | <code>ObservablesCollection</code> |  |
| paginationState | <code>ObservablesCollection</code> |  |
| lazyLoading | <code>function</code> | Load more entries from service |
| update | <code>function</code> |  |
| makeSelection | <code>function</code> |  |
| getFilter | <code>function</code> |  |
| reset | <code>function</code> |  |
| onRowRemove | <code>function</code> |  |
| onSelectionChange | <code>function</code> |  |


* [TableFacet](#TableFacet) : <code>Facet</code>
    * [~getFilter()](#TableFacet..getFilter) ⇒ <code>Object.&lt;string, FacetSelection&gt;</code>
    * [~setPaginationAttr(links, lastPage, currentPage)](#TableFacet..setPaginationAttr)
    * [~setRowData(data)](#TableFacet..setRowData)
    * [~lazyLoading(pageLink)](#TableFacet..lazyLoading)
    * [~update(filter)](#TableFacet..update)
    * [~makeSelection(target)](#TableFacet..makeSelection)

<a name="TableFacet..getFilter"></a>

### TableFacet~getFilter() ⇒ <code>Object.&lt;string, FacetSelection&gt;</code>
Returns the filter object for this facet.

**Kind**: inner method of [<code>TableFacet</code>](#TableFacet)  
<a name="TableFacet..setPaginationAttr"></a>

### TableFacet~setPaginationAttr(links, lastPage, currentPage)
Set attributes for pagination

**Kind**: inner method of [<code>TableFacet</code>](#TableFacet)  

| Param | Type | Description |
| --- | --- | --- |
| links | <code>Object</code> | Shortcut url links for next request |
| lastPage | <code>Number</code> |  |
| currentPage | <code>Number</code> |  |

<a name="TableFacet..setRowData"></a>

### TableFacet~setRowData(data)
**Kind**: inner method of [<code>TableFacet</code>](#TableFacet)  

| Param | Type |
| --- | --- |
| data | <code>Array.&lt;Object&gt;</code> | 

<a name="TableFacet..lazyLoading"></a>

### TableFacet~lazyLoading(pageLink)
Trigger fetching next data bucket for table

**Kind**: inner method of [<code>TableFacet</code>](#TableFacet)  

| Param | Type | Description |
| --- | --- | --- |
| pageLink | <code>string</code> | URL to get next entries to load |

<a name="TableFacet..update"></a>

### TableFacet~update(filter)
Update the values of the facet based on the given filter.

**Kind**: inner method of [<code>TableFacet</code>](#TableFacet)  

| Param | Type | Description |
| --- | --- | --- |
| filter | <code>Array.&lt;Filter&gt;</code> | Describes the selection set in all preceding facets and modules |

<a name="TableFacet..makeSelection"></a>

### TableFacet~makeSelection(target)
Select a row of the table.

**Kind**: inner method of [<code>TableFacet</code>](#TableFacet)  

| Param | Type |
| --- | --- |
| target | [<code>TableFacetTarget</code>](#TableFacetTarget) | 

<a name="TableModule"></a>

## TableModule ⇒ [<code>TableModule</code>](#TableModule)
Controller for a module of type table.

**Kind**: global typedef  

| Param | Type | Description |
| --- | --- | --- |
| name | <code>string</code> | displayed in the title. |
| service | <code>FacetService</code> |  |
| columnsToIgnore | <code>Array.&lt;string&gt;</code> |  |

**Properties**

| Name | Type |
| --- | --- |
| name | <code>string</code> | 
| type | <code>string</code> | 
| facet | [<code>TableFacet</code>](#TableFacet) | 
| columnsToIgnore | <code>Array.&lt;string&gt;</code> | 
| makeSelection |  | 
| reset |  | 
| update |  | 
| getFilter |  | 
| getNewInstance |  | 


* [TableModule](#TableModule) ⇒ [<code>TableModule</code>](#TableModule)
    * [~makeSelection(f, target)](#TableModule..makeSelection)
    * [~getFilter()](#TableModule..getFilter) ⇒ <code>Array.&lt;Filter&gt;</code>
    * [~update(filter)](#TableModule..update)

<a name="TableModule..makeSelection"></a>

### TableModule~makeSelection(f, target)
Relays to facet.

**Kind**: inner method of [<code>TableModule</code>](#TableModule)  

| Param | Type |
| --- | --- |
| f | [<code>TableFacet</code>](#TableFacet) | 
| target | [<code>TableFacetTarget</code>](#TableFacetTarget) | 

<a name="TableModule..getFilter"></a>

### TableModule~getFilter() ⇒ <code>Array.&lt;Filter&gt;</code>
Relays to facet.

**Kind**: inner method of [<code>TableModule</code>](#TableModule)  
<a name="TableModule..update"></a>

### TableModule~update(filter)
Relays to facet.

**Kind**: inner method of [<code>TableModule</code>](#TableModule)  

| Param | Type |
| --- | --- |
| filter | <code>Array.&lt;Filter&gt;</code> | 

