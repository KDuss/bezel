## Functions

<dl>
<dt><a href="#FacetContainer">FacetContainer()</a> ⇒ <code><a href="#FacetContainer">FacetContainer</a></code></dt>
<dd><p>Create <a href="#FacetContainer">FacetContainer</a>.</p>
</dd>
<dt><a href="#containerDragStart">containerDragStart(event)</a></dt>
<dd><p>Start dragging a container. Remember the starting position.</p>
</dd>
<dt><a href="#containerOnDrag">containerOnDrag(event)</a></dt>
<dd><p>While dragging a container.
Updates the position of the container based on the mouse position.</p>
</dd>
<dt><a href="#containerOnDragEnd">containerOnDragEnd(mainController, module, container)</a></dt>
<dd><p>Stop dragging a container.
Checks whether the position changed and moves the container if it did.</p>
</dd>
<dt><a href="#moveContainerLeftBtn">moveContainerLeftBtn(mainController, module, container, root)</a> ⇒ <code>HTMLButtonElement</code></dt>
<dd><p>Button that moves the container left, unless it is the first in the list.</p>
</dd>
<dt><a href="#moveContainerRightBtn">moveContainerRightBtn(mainController, module, container, root)</a> ⇒ <code>HTMLButtonElement</code></dt>
<dd><p>Button that moves the container right, unless it is the last in the list.</p>
</dd>
<dt><a href="#facetContainerProjector">facetContainerProjector(mainController, module, container, root)</a></dt>
<dd><p>Projector for containers.</p>
</dd>
<dt><a href="#findInData">findInData(tree, predicate)</a> ⇒ <code>Node</code></dt>
<dd><p>Helper function to search directly on the tree data instead of the node.</p>
</dd>
<dt><a href="#addSelectableNode">addSelectableNode(tree, parent, focus, count)</a> ⇒ <code>Node</code></dt>
<dd><p>Adds a new node for a focus to the tree and returns the node.
The values needed in the presentation model are set.</p>
</dd>
<dt><a href="#calculateSumFromChildren">calculateSumFromChildren(node)</a> ⇒ <code>number</code></dt>
<dd><p>Recursively sum up the observable COUNT of a node&#39;s children.
When passed the root node of a tree, it calculates the COUNT for all
non-leaf nodes.</p>
</dd>
<dt><a href="#addGroupedNodes">addGroupedNodes(tree, grouping)</a></dt>
<dd><p>Build tree structure for a grouped facet.</p>
</dd>
<dt><a href="#RegularFacet">RegularFacet(desc, service)</a> ⇒ <code><a href="#RegularFacet">RegularFacet</a></code></dt>
<dd><p>Create <a href="#RegularFacet">RegularFacet</a>.</p>
</dd>
<dt><a href="#RegularFacetModule">RegularFacetModule(id, name, facets)</a> ⇒ <code><a href="#RegularFacetModule">RegularFacetModule</a></code></dt>
<dd><p>Create <a href="#RegularFacetModule">RegularFacetModule</a></p>
</dd>
<dt><a href="#choiceButtons">choiceButtons(mainController, module, facet)</a></dt>
<dd><p>Invisible buttons used to activate facets in testing.</p>
</dd>
<dt><a href="#facetChoiceProjector">facetChoiceProjector(mainController, module, facet)</a> ⇒ <code>HTMLDivElement</code></dt>
<dd><p>Creates an element for a specific facet that is added to the overview of all facets in the legacy.</p>
</dd>
<dt><a href="#facetSelectionProjector">facetSelectionProjector(mainController, module)</a></dt>
<dd><p>Projector display the selection of regular facets.</p>
</dd>
<dt><a href="#initFacetDragAndDrop">initFacetDragAndDrop(mainController, module, dropArea)</a></dt>
<dd><p>Handle drag events for the area where facets can be dropped.</p>
</dd>
<dt><a href="#initDropArea">initDropArea(mainController, module)</a> ⇒ <code>HTMLDivElement</code></dt>
<dd><p>Create element that serves as target when dragging <a href="#facetSelectionProjector">facetSelectionProjector</a> to activate a facet.</p>
</dd>
<dt><a href="#regularFacetModuleProjector">regularFacetModuleProjector(mainController, module, root)</a></dt>
<dd><p>Projector specific to RegularFacetModule.</p>
</dd>
<dt><a href="#focusCheckbox">focusCheckbox(focusData, li)</a> ⇒ <code>HTMLInputElement</code></dt>
<dd><p>Create a checkbox for a focus.</p>
</dd>
<dt><a href="#facetControlBtns">facetControlBtns(mainController, module, facet)</a> ⇒ <code>HTMLButtonElement</code> | <code>HTMLButtonElement</code></dt>
<dd><p>Creates and returns a remove and a reset button for the facet.</p>
</dd>
<dt><a href="#focusListItem">focusListItem(mainController, module, facet, focusData, isLeaf)</a> ⇒ <code>HTMLLIElement</code></dt>
<dd><p>Bind a single focus to a list item.</p>
</dd>
<dt><a href="#facetContent">facetContent(mainController, module, facet)</a> ⇒ <code>HTMLUListElement</code></dt>
<dd><p>Creates hierarchical list based on the structure of the facet state.</p>
</dd>
<dt><a href="#facetProjector">facetProjector(mainController, module, container, facet, root)</a></dt>
<dd><p>Projector for facet content.</p>
</dd>
</dl>

## Typedefs

<dl>
<dt><a href="#FacetContainer">FacetContainer</a> : <code>BezelContainer</code></dt>
<dd><p>Controller for a facet container.</p>
</dd>
<dt><a href="#RegularFacetTarget">RegularFacetTarget</a> : <code>ObservablesCollection</code></dt>
<dd><p>Presentation model for a single facet value</p>
</dd>
<dt><a href="#RegularFacet">RegularFacet</a> : <code>Facet</code></dt>
<dd><p>Controller for a regular hierarchical facet.</p>
</dd>
<dt><a href="#RegularFacetModule">RegularFacetModule</a> : <code>BezelModule</code></dt>
<dd><p>Controller for a module with regular hierarchical facets.</p>
</dd>
</dl>

<a name="FacetContainer"></a>

## FacetContainer() ⇒ [<code>FacetContainer</code>](#FacetContainer)
Create [FacetContainer](#FacetContainer).

**Kind**: global function  

* [FacetContainer()](#FacetContainer) ⇒ [<code>FacetContainer</code>](#FacetContainer)
    * [~facets](#FacetContainer..facets)
    * [~containerCount](#FacetContainer..containerCount)
    * [~addFacet(facet)](#FacetContainer..addFacet)
    * [~removeFacet(facet)](#FacetContainer..removeFacet)
    * [~getFilter()](#FacetContainer..getFilter) ⇒ <code>Filter</code>
    * [~update(filter)](#FacetContainer..update)
    * [~contains(facet)](#FacetContainer..contains) ⇒ <code>boolean</code>
    * [~isEmpty()](#FacetContainer..isEmpty) ⇒ <code>boolean</code>

<a name="FacetContainer..facets"></a>

### FacetContainer~facets
List of all facets currently active in this container.

**Kind**: inner constant of [<code>FacetContainer</code>](#FacetContainer)  
<a name="FacetContainer..containerCount"></a>

### FacetContainer~containerCount
Sum of all entries available in this container.

**Kind**: inner constant of [<code>FacetContainer</code>](#FacetContainer)  
<a name="FacetContainer..addFacet"></a>

### FacetContainer~addFacet(facet)
Add facet to container.

**Kind**: inner method of [<code>FacetContainer</code>](#FacetContainer)  

| Param | Type |
| --- | --- |
| facet | [<code>RegularFacet</code>](#RegularFacet) | 

<a name="FacetContainer..removeFacet"></a>

### FacetContainer~removeFacet(facet)
Remove facet from container.

**Kind**: inner method of [<code>FacetContainer</code>](#FacetContainer)  

| Param | Type |
| --- | --- |
| facet | [<code>RegularFacet</code>](#RegularFacet) | 

<a name="FacetContainer..getFilter"></a>

### FacetContainer~getFilter() ⇒ <code>Filter</code>
Get the combined filter for all facets in this container.

**Kind**: inner method of [<code>FacetContainer</code>](#FacetContainer)  
<a name="FacetContainer..update"></a>

### FacetContainer~update(filter)
Update all facets within the container.

**Kind**: inner method of [<code>FacetContainer</code>](#FacetContainer)  

| Param | Type |
| --- | --- |
| filter | <code>Array.&lt;Filter&gt;</code> | 

<a name="FacetContainer..contains"></a>

### FacetContainer~contains(facet) ⇒ <code>boolean</code>
Check whether a facet is present in this container.

**Kind**: inner method of [<code>FacetContainer</code>](#FacetContainer)  

| Param | Type |
| --- | --- |
| facet | [<code>RegularFacet</code>](#RegularFacet) | 

<a name="FacetContainer..isEmpty"></a>

### FacetContainer~isEmpty() ⇒ <code>boolean</code>
Check whether the container is empty.

**Kind**: inner method of [<code>FacetContainer</code>](#FacetContainer)  
<a name="containerDragStart"></a>

## containerDragStart(event)
Start dragging a container. Remember the starting position.

**Kind**: global function  

| Param |
| --- |
| event | 

<a name="containerOnDrag"></a>

## containerOnDrag(event)
While dragging a container.Updates the position of the container based on the mouse position.

**Kind**: global function  

| Param |
| --- |
| event | 

<a name="containerOnDragEnd"></a>

## containerOnDragEnd(mainController, module, container)
Stop dragging a container.Checks whether the position changed and moves the container if it did.

**Kind**: global function  

| Param | Type |
| --- | --- |
| mainController | <code>MainController</code> | 
| module | [<code>RegularFacetModule</code>](#RegularFacetModule) | 
| container | [<code>FacetContainer</code>](#FacetContainer) | 

<a name="moveContainerLeftBtn"></a>

## moveContainerLeftBtn(mainController, module, container, root) ⇒ <code>HTMLButtonElement</code>
Button that moves the container left, unless it is the first in the list.

**Kind**: global function  

| Param | Type |
| --- | --- |
| mainController | <code>MainController</code> | 
| module | [<code>RegularFacetModule</code>](#RegularFacetModule) | 
| container | [<code>FacetContainer</code>](#FacetContainer) | 
| root | <code>HTMLDivElement</code> | 

<a name="moveContainerRightBtn"></a>

## moveContainerRightBtn(mainController, module, container, root) ⇒ <code>HTMLButtonElement</code>
Button that moves the container right, unless it is the last in the list.

**Kind**: global function  

| Param | Type |
| --- | --- |
| mainController | <code>MainController</code> | 
| module | [<code>RegularFacetModule</code>](#RegularFacetModule) | 
| container | [<code>FacetContainer</code>](#FacetContainer) | 
| root | <code>HTMLDivElement</code> | 

<a name="facetContainerProjector"></a>

## facetContainerProjector(mainController, module, container, root)
Projector for containers.

**Kind**: global function  

| Param | Type |
| --- | --- |
| mainController | <code>MainController</code> | 
| module | [<code>RegularFacetModule</code>](#RegularFacetModule) | 
| container | [<code>FacetContainer</code>](#FacetContainer) | 
| root | <code>HTMLDivElement</code> | 

<a name="findInData"></a>

## findInData(tree, predicate) ⇒ <code>Node</code>
Helper function to search directly on the tree data instead of the node.

**Kind**: global function  

| Param | Type |
| --- | --- |
| tree | <code>Tree</code> | 
| predicate | <code>function</code> | 

<a name="addSelectableNode"></a>

## addSelectableNode(tree, parent, focus, count) ⇒ <code>Node</code>
Adds a new node for a focus to the tree and returns the node.The values needed in the presentation model are set.

**Kind**: global function  
**Returns**: <code>Node</code> - - Added node  

| Param | Type | Default |
| --- | --- | --- |
| tree | <code>Tree</code> |  | 
| parent | <code>Node</code> |  | 
| focus | <code>string</code> |  | 
| count | <code>number</code> | <code>0</code> | 

<a name="calculateSumFromChildren"></a>

## calculateSumFromChildren(node) ⇒ <code>number</code>
Recursively sum up the observable COUNT of a node's children.When passed the root node of a tree, it calculates the COUNT for allnon-leaf nodes.

**Kind**: global function  

| Param | Type |
| --- | --- |
| node | <code>Node</code> | 

<a name="addGroupedNodes"></a>

## addGroupedNodes(tree, grouping)
Build tree structure for a grouped facet.

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| tree | <code>Tree</code> |  |
| grouping | <code>Array.&lt;Array.&lt;Object&gt;&gt;</code> | Description of how the facet is grouped |
| grouping.name | <code>string</code> |  |
| grouping.foci | <code>string</code> | Foci belonging to the group |

<a name="RegularFacet"></a>

## RegularFacet(desc, service) ⇒ [<code>RegularFacet</code>](#RegularFacet)
Create [RegularFacet](#RegularFacet).

**Kind**: global function  

| Param | Type |
| --- | --- |
| desc | <code>FacetDescription</code> | 
| service | <code>FacetService</code> | 


* [RegularFacet(desc, service)](#RegularFacet) ⇒ [<code>RegularFacet</code>](#RegularFacet)
    * [~getFilter()](#RegularFacet..getFilter) ⇒ <code>Object.&lt;string, FacetSelection&gt;</code>
    * [~update(filter)](#RegularFacet..update)
    * [~changeChildSelection(target, toSelect)](#RegularFacet..changeChildSelection)
    * [~changeAncestorSelection(target, select)](#RegularFacet..changeAncestorSelection)
    * [~makeSelection(target)](#RegularFacet..makeSelection)

<a name="RegularFacet..getFilter"></a>

### RegularFacet~getFilter() ⇒ <code>Object.&lt;string, FacetSelection&gt;</code>
Returns the filter object for this facet.

**Kind**: inner method of [<code>RegularFacet</code>](#RegularFacet)  
<a name="RegularFacet..update"></a>

### RegularFacet~update(filter)
Update the state of the facet based on the set filter.

**Kind**: inner method of [<code>RegularFacet</code>](#RegularFacet)  

| Param | Type |
| --- | --- |
| filter | <code>Array.&lt;Filter&gt;</code> | 

<a name="RegularFacet..changeChildSelection"></a>

### RegularFacet~changeChildSelection(target, toSelect)
Change the selection status of all children of the target node.

**Kind**: inner method of [<code>RegularFacet</code>](#RegularFacet)  

| Param | Type |
| --- | --- |
| target | <code>Node</code> | 
| toSelect | <code>&#x27;yes&#x27;</code> \| <code>&#x27;no&#x27;</code> | 

<a name="RegularFacet..changeAncestorSelection"></a>

### RegularFacet~changeAncestorSelection(target, select)
Change the selection of all ancestors in hierarchy.Ensures that 'semi' is set correctly.

**Kind**: inner method of [<code>RegularFacet</code>](#RegularFacet)  

| Param | Type |
| --- | --- |
| target | <code>Node</code> | 
| select | <code>&#x27;yes&#x27;</code> \| <code>&#x27;no&#x27;</code> | 

<a name="RegularFacet..makeSelection"></a>

### RegularFacet~makeSelection(target)
Select a focus on the facet.

**Kind**: inner method of [<code>RegularFacet</code>](#RegularFacet)  

| Param | Type |
| --- | --- |
| target | [<code>RegularFacetTarget</code>](#RegularFacetTarget) | 

<a name="RegularFacetModule"></a>

## RegularFacetModule(id, name, facets) ⇒ [<code>RegularFacetModule</code>](#RegularFacetModule)
Create [RegularFacetModule](#RegularFacetModule)

**Kind**: global function  

| Param | Type |
| --- | --- |
| id | <code>string</code> | 
| name | <code>string</code> | 
| facets | [<code>Array.&lt;RegularFacet&gt;</code>](#RegularFacet) | 


* [RegularFacetModule(id, name, facets)](#RegularFacetModule) ⇒ [<code>RegularFacetModule</code>](#RegularFacetModule)
    * [~facetContainers](#RegularFacetModule..facetContainers)
    * [~allFacets](#RegularFacetModule..allFacets)
    * [~addFacet(facet)](#RegularFacetModule..addFacet)
    * [~indexOf(container)](#RegularFacetModule..indexOf) ⇒ <code>number</code>
    * [~getContainer(facet)](#RegularFacetModule..getContainer) ⇒ [<code>FacetContainer</code>](#FacetContainer)
    * [~activateFacet(facet, position, operation, filter)](#RegularFacetModule..activateFacet)
    * [~deactivateFacet(facet, filter)](#RegularFacetModule..deactivateFacet)
    * [~moveContainer(container, targetPosition, filter)](#RegularFacetModule..moveContainer)
    * [~makeSelection(facet, target, filter)](#RegularFacetModule..makeSelection)
    * [~getFilter()](#RegularFacetModule..getFilter) ⇒ <code>Array.&lt;Filter&gt;</code>
    * [~update(filter)](#RegularFacetModule..update)
    * [~getFacetById(searchId)](#RegularFacetModule..getFacetById) ⇒ [<code>RegularFacet</code>](#RegularFacet)

<a name="RegularFacetModule..facetContainers"></a>

### RegularFacetModule~facetContainers
Active facet containers.

**Kind**: inner constant of [<code>RegularFacetModule</code>](#RegularFacetModule)  
<a name="RegularFacetModule..allFacets"></a>

### RegularFacetModule~allFacets
All facets that can be activated in this module.

**Kind**: inner constant of [<code>RegularFacetModule</code>](#RegularFacetModule)  
<a name="RegularFacetModule..addFacet"></a>

### RegularFacetModule~addFacet(facet)
Make facet available to the user.

**Kind**: inner method of [<code>RegularFacetModule</code>](#RegularFacetModule)  

| Param | Type |
| --- | --- |
| facet | [<code>RegularFacetModule</code>](#RegularFacetModule) | 

<a name="RegularFacetModule..indexOf"></a>

### RegularFacetModule~indexOf(container) ⇒ <code>number</code>
Returns the position (location within the module) of the given container.

**Kind**: inner method of [<code>RegularFacetModule</code>](#RegularFacetModule)  

| Param | Type |
| --- | --- |
| container | [<code>FacetContainer</code>](#FacetContainer) | 

<a name="RegularFacetModule..getContainer"></a>

### RegularFacetModule~getContainer(facet) ⇒ [<code>FacetContainer</code>](#FacetContainer)
Returns the container that contains the facet.

**Kind**: inner method of [<code>RegularFacetModule</code>](#RegularFacetModule)  

| Param | Type |
| --- | --- |
| facet | [<code>RegularFacet</code>](#RegularFacet) | 

<a name="RegularFacetModule..activateFacet"></a>

### RegularFacetModule~activateFacet(facet, position, operation, filter)
Make the facet available for use.

**Kind**: inner method of [<code>RegularFacetModule</code>](#RegularFacetModule)  

| Param | Type | Description |
| --- | --- | --- |
| facet | [<code>RegularFacet</code>](#RegularFacet) |  |
| position | <code>number</code> | Location within the module |
| operation | <code>Operation</code> |  |
| filter | <code>Array.&lt;Filter&gt;</code> |  |

<a name="RegularFacetModule..deactivateFacet"></a>

### RegularFacetModule~deactivateFacet(facet, filter)
Remove facet from current selection.

**Kind**: inner method of [<code>RegularFacetModule</code>](#RegularFacetModule)  

| Param | Type |
| --- | --- |
| facet | [<code>RegularFacet</code>](#RegularFacet) | 
| filter | <code>Array.&lt;Filter&gt;</code> | 

<a name="RegularFacetModule..moveContainer"></a>

### RegularFacetModule~moveContainer(container, targetPosition, filter)
Move a container to a different position (location within the module).

**Kind**: inner method of [<code>RegularFacetModule</code>](#RegularFacetModule)  

| Param | Type |
| --- | --- |
| container | [<code>FacetContainer</code>](#FacetContainer) | 
| targetPosition | <code>number</code> | 
| filter | <code>Array.&lt;Filter&gt;</code> | 

<a name="RegularFacetModule..makeSelection"></a>

### RegularFacetModule~makeSelection(facet, target, filter)
Make a selection on the facet and update all subsequent facets within the module.

**Kind**: inner method of [<code>RegularFacetModule</code>](#RegularFacetModule)  

| Param | Type |
| --- | --- |
| facet | [<code>RegularFacet</code>](#RegularFacet) | 
| target | [<code>RegularFacetTarget</code>](#RegularFacetTarget) | 
| filter | <code>Array.&lt;Filter&gt;</code> | 

<a name="RegularFacetModule..getFilter"></a>

### RegularFacetModule~getFilter() ⇒ <code>Array.&lt;Filter&gt;</code>
Returns the filter for all containers in this module.

**Kind**: inner method of [<code>RegularFacetModule</code>](#RegularFacetModule)  
<a name="RegularFacetModule..update"></a>

### RegularFacetModule~update(filter)
Updates all active containers.

**Kind**: inner method of [<code>RegularFacetModule</code>](#RegularFacetModule)  

| Param | Type |
| --- | --- |
| filter | <code>Array.&lt;Filter&gt;</code> | 

<a name="RegularFacetModule..getFacetById"></a>

### RegularFacetModule~getFacetById(searchId) ⇒ [<code>RegularFacet</code>](#RegularFacet)
Return facet based on its id.

**Kind**: inner method of [<code>RegularFacetModule</code>](#RegularFacetModule)  

| Param | Type |
| --- | --- |
| searchId | <code>string</code> | 

<a name="choiceButtons"></a>

## choiceButtons(mainController, module, facet)
Invisible buttons used to activate facets in testing.

**Kind**: global function  

| Param | Type |
| --- | --- |
| mainController | <code>MainController</code> | 
| module | [<code>RegularFacetModule</code>](#RegularFacetModule) | 
| facet | [<code>RegularFacet</code>](#RegularFacet) | 

<a name="facetChoiceProjector"></a>

## facetChoiceProjector(mainController, module, facet) ⇒ <code>HTMLDivElement</code>
Creates an element for a specific facet that is added to the overview of all facets in the legacy.

**Kind**: global function  

| Param | Type |
| --- | --- |
| mainController | <code>MainController</code> | 
| module | [<code>RegularFacetModule</code>](#RegularFacetModule) | 
| facet | [<code>RegularFacet</code>](#RegularFacet) | 

<a name="facetSelectionProjector"></a>

## facetSelectionProjector(mainController, module)
Projector display the selection of regular facets.

**Kind**: global function  

| Param | Type |
| --- | --- |
| mainController | <code>MainController</code> | 
| module | [<code>RegularFacetModule</code>](#RegularFacetModule) | 

<a name="initFacetDragAndDrop"></a>

## initFacetDragAndDrop(mainController, module, dropArea)
Handle drag events for the area where facets can be dropped.

**Kind**: global function  

| Param | Type |
| --- | --- |
| mainController | <code>MainController</code> | 
| module | [<code>RegularFacetModule</code>](#RegularFacetModule) | 
| dropArea | <code>HTMLDivElement</code> | 

<a name="initDropArea"></a>

## initDropArea(mainController, module) ⇒ <code>HTMLDivElement</code>
Create element that serves as target when dragging [facetSelectionProjector](#facetSelectionProjector) to activate a facet.

**Kind**: global function  

| Param | Type |
| --- | --- |
| mainController | <code>MainController</code> | 
| module | [<code>RegularFacetModule</code>](#RegularFacetModule) | 

<a name="regularFacetModuleProjector"></a>

## regularFacetModuleProjector(mainController, module, root)
Projector specific to RegularFacetModule.

**Kind**: global function  

| Param | Type |
| --- | --- |
| mainController | <code>MainController</code> | 
| module | [<code>RegularFacetModule</code>](#RegularFacetModule) | 
| root | <code>HTMLDivElement</code> | 

<a name="focusCheckbox"></a>

## focusCheckbox(focusData, li) ⇒ <code>HTMLInputElement</code>
Create a checkbox for a focus.

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| focusData | <code>ObservablesCollection</code> |  |
| li | <code>HTMLLIElement</code> | Parent list item |

<a name="facetControlBtns"></a>

## facetControlBtns(mainController, module, facet) ⇒ <code>HTMLButtonElement</code> \| <code>HTMLButtonElement</code>
Creates and returns a remove and a reset button for the facet.

**Kind**: global function  

| Param | Type |
| --- | --- |
| mainController |  | 
| module | [<code>RegularFacetModule</code>](#RegularFacetModule) | 
| facet | [<code>RegularFacet</code>](#RegularFacet) | 

<a name="focusListItem"></a>

## focusListItem(mainController, module, facet, focusData, isLeaf) ⇒ <code>HTMLLIElement</code>
Bind a single focus to a list item.

**Kind**: global function  

| Param | Type |
| --- | --- |
| mainController | <code>MainController</code> | 
| module | [<code>RegularFacetModule</code>](#RegularFacetModule) | 
| facet | [<code>RegularFacet</code>](#RegularFacet) | 
| focusData | <code>ObservablesCollection</code> | 
| isLeaf | <code>boolean</code> | 

<a name="facetContent"></a>

## facetContent(mainController, module, facet) ⇒ <code>HTMLUListElement</code>
Creates hierarchical list based on the structure of the facet state.

**Kind**: global function  

| Param | Type |
| --- | --- |
| mainController | <code>MainController</code> | 
| module | [<code>RegularFacetModule</code>](#RegularFacetModule) | 
| facet | [<code>RegularFacet</code>](#RegularFacet) | 

<a name="facetProjector"></a>

## facetProjector(mainController, module, container, facet, root)
Projector for facet content.

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| mainController | <code>MainController</code> |  |
| module | [<code>RegularFacetModule</code>](#RegularFacetModule) |  |
| container | [<code>FacetContainer</code>](#FacetContainer) |  |
| facet | [<code>RegularFacet</code>](#RegularFacet) |  |
| root | <code>HTMLDivElement</code> | Container wrapping 1 or multiple facets |

<a name="FacetContainer"></a>

## FacetContainer : <code>BezelContainer</code>
Controller for a facet container.

**Kind**: global typedef  
**Properties**

| Name | Type |
| --- | --- |
| addFacet | <code>function</code> | 
| onFacetAdd | <code>function</code> | 
| removeFacet | <code>function</code> | 
| onFacetRemove | <code>function</code> | 
| update | <code>function</code> | 
| getFilter | <code>function</code> | 
| contains | <code>function</code> | 
| isEmpty | <code>function</code> | 
| onContainerCountChange | <code>function</code> | 


* [FacetContainer](#FacetContainer) : <code>BezelContainer</code>
    * [~facets](#FacetContainer..facets)
    * [~containerCount](#FacetContainer..containerCount)
    * [~addFacet(facet)](#FacetContainer..addFacet)
    * [~removeFacet(facet)](#FacetContainer..removeFacet)
    * [~getFilter()](#FacetContainer..getFilter) ⇒ <code>Filter</code>
    * [~update(filter)](#FacetContainer..update)
    * [~contains(facet)](#FacetContainer..contains) ⇒ <code>boolean</code>
    * [~isEmpty()](#FacetContainer..isEmpty) ⇒ <code>boolean</code>

<a name="FacetContainer..facets"></a>

### FacetContainer~facets
List of all facets currently active in this container.

**Kind**: inner constant of [<code>FacetContainer</code>](#FacetContainer)  
<a name="FacetContainer..containerCount"></a>

### FacetContainer~containerCount
Sum of all entries available in this container.

**Kind**: inner constant of [<code>FacetContainer</code>](#FacetContainer)  
<a name="FacetContainer..addFacet"></a>

### FacetContainer~addFacet(facet)
Add facet to container.

**Kind**: inner method of [<code>FacetContainer</code>](#FacetContainer)  

| Param | Type |
| --- | --- |
| facet | [<code>RegularFacet</code>](#RegularFacet) | 

<a name="FacetContainer..removeFacet"></a>

### FacetContainer~removeFacet(facet)
Remove facet from container.

**Kind**: inner method of [<code>FacetContainer</code>](#FacetContainer)  

| Param | Type |
| --- | --- |
| facet | [<code>RegularFacet</code>](#RegularFacet) | 

<a name="FacetContainer..getFilter"></a>

### FacetContainer~getFilter() ⇒ <code>Filter</code>
Get the combined filter for all facets in this container.

**Kind**: inner method of [<code>FacetContainer</code>](#FacetContainer)  
<a name="FacetContainer..update"></a>

### FacetContainer~update(filter)
Update all facets within the container.

**Kind**: inner method of [<code>FacetContainer</code>](#FacetContainer)  

| Param | Type |
| --- | --- |
| filter | <code>Array.&lt;Filter&gt;</code> | 

<a name="FacetContainer..contains"></a>

### FacetContainer~contains(facet) ⇒ <code>boolean</code>
Check whether a facet is present in this container.

**Kind**: inner method of [<code>FacetContainer</code>](#FacetContainer)  

| Param | Type |
| --- | --- |
| facet | [<code>RegularFacet</code>](#RegularFacet) | 

<a name="FacetContainer..isEmpty"></a>

### FacetContainer~isEmpty() ⇒ <code>boolean</code>
Check whether the container is empty.

**Kind**: inner method of [<code>FacetContainer</code>](#FacetContainer)  
<a name="RegularFacetTarget"></a>

## RegularFacetTarget : <code>ObservablesCollection</code>
Presentation model for a single facet value

**Kind**: global typedef  
<a name="RegularFacet"></a>

## RegularFacet : <code>Facet</code>
Controller for a regular hierarchical facet.

**Kind**: global typedef  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| id | <code>string</code> |  |
| name | <code>string</code> |  |
| groupType | <code>string</code> |  |
| state | <code>Tree</code> | Manages the facet values (text, count and selection status) |
| update | <code>function</code> |  |
| reset | <code>function</code> |  |
| makeSelection | <code>function</code> |  |
| getFilter | <code>function</code> |  |
| getNewInstance | <code>function</code> |  |


* [RegularFacet](#RegularFacet) : <code>Facet</code>
    * [~getFilter()](#RegularFacet..getFilter) ⇒ <code>Object.&lt;string, FacetSelection&gt;</code>
    * [~update(filter)](#RegularFacet..update)
    * [~changeChildSelection(target, toSelect)](#RegularFacet..changeChildSelection)
    * [~changeAncestorSelection(target, select)](#RegularFacet..changeAncestorSelection)
    * [~makeSelection(target)](#RegularFacet..makeSelection)

<a name="RegularFacet..getFilter"></a>

### RegularFacet~getFilter() ⇒ <code>Object.&lt;string, FacetSelection&gt;</code>
Returns the filter object for this facet.

**Kind**: inner method of [<code>RegularFacet</code>](#RegularFacet)  
<a name="RegularFacet..update"></a>

### RegularFacet~update(filter)
Update the state of the facet based on the set filter.

**Kind**: inner method of [<code>RegularFacet</code>](#RegularFacet)  

| Param | Type |
| --- | --- |
| filter | <code>Array.&lt;Filter&gt;</code> | 

<a name="RegularFacet..changeChildSelection"></a>

### RegularFacet~changeChildSelection(target, toSelect)
Change the selection status of all children of the target node.

**Kind**: inner method of [<code>RegularFacet</code>](#RegularFacet)  

| Param | Type |
| --- | --- |
| target | <code>Node</code> | 
| toSelect | <code>&#x27;yes&#x27;</code> \| <code>&#x27;no&#x27;</code> | 

<a name="RegularFacet..changeAncestorSelection"></a>

### RegularFacet~changeAncestorSelection(target, select)
Change the selection of all ancestors in hierarchy.Ensures that 'semi' is set correctly.

**Kind**: inner method of [<code>RegularFacet</code>](#RegularFacet)  

| Param | Type |
| --- | --- |
| target | <code>Node</code> | 
| select | <code>&#x27;yes&#x27;</code> \| <code>&#x27;no&#x27;</code> | 

<a name="RegularFacet..makeSelection"></a>

### RegularFacet~makeSelection(target)
Select a focus on the facet.

**Kind**: inner method of [<code>RegularFacet</code>](#RegularFacet)  

| Param | Type |
| --- | --- |
| target | [<code>RegularFacetTarget</code>](#RegularFacetTarget) | 

<a name="RegularFacetModule"></a>

## RegularFacetModule : <code>BezelModule</code>
Controller for a module with regular hierarchical facets.

**Kind**: global typedef  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| id | <code>string</code> |  |
| name | <code>string</code> |  |
| type | <code>string</code> |  |
| allFacets | <code>ObservableList</code> | All facets available in this module |
| addFacet | <code>function</code> |  |
| onFacetAdd | <code>function</code> |  |
| activateFacet | <code>function</code> |  |
| onFacetActivateAnd | <code>function</code> |  |
| deactivateFacet | <code>function</code> |  |
| onContainerEmpty | <code>function</code> |  |
| makeSelection | <code>function</code> |  |
| reset | <code>function</code> | Reset all facets |
| resetFacetSelection | <code>function</code> | Reset single facet |
| update | <code>function</code> |  |
| getFilter | <code>function</code> |  |
| moveContainer | <code>function</code> |  |
| getNewInstance | <code>function</code> |  |
| indexOf | <code>function</code> |  |
| getFacetById | <code>function</code> |  |


* [RegularFacetModule](#RegularFacetModule) : <code>BezelModule</code>
    * [~facetContainers](#RegularFacetModule..facetContainers)
    * [~allFacets](#RegularFacetModule..allFacets)
    * [~addFacet(facet)](#RegularFacetModule..addFacet)
    * [~indexOf(container)](#RegularFacetModule..indexOf) ⇒ <code>number</code>
    * [~getContainer(facet)](#RegularFacetModule..getContainer) ⇒ [<code>FacetContainer</code>](#FacetContainer)
    * [~activateFacet(facet, position, operation, filter)](#RegularFacetModule..activateFacet)
    * [~deactivateFacet(facet, filter)](#RegularFacetModule..deactivateFacet)
    * [~moveContainer(container, targetPosition, filter)](#RegularFacetModule..moveContainer)
    * [~makeSelection(facet, target, filter)](#RegularFacetModule..makeSelection)
    * [~getFilter()](#RegularFacetModule..getFilter) ⇒ <code>Array.&lt;Filter&gt;</code>
    * [~update(filter)](#RegularFacetModule..update)
    * [~getFacetById(searchId)](#RegularFacetModule..getFacetById) ⇒ [<code>RegularFacet</code>](#RegularFacet)

<a name="RegularFacetModule..facetContainers"></a>

### RegularFacetModule~facetContainers
Active facet containers.

**Kind**: inner constant of [<code>RegularFacetModule</code>](#RegularFacetModule)  
<a name="RegularFacetModule..allFacets"></a>

### RegularFacetModule~allFacets
All facets that can be activated in this module.

**Kind**: inner constant of [<code>RegularFacetModule</code>](#RegularFacetModule)  
<a name="RegularFacetModule..addFacet"></a>

### RegularFacetModule~addFacet(facet)
Make facet available to the user.

**Kind**: inner method of [<code>RegularFacetModule</code>](#RegularFacetModule)  

| Param | Type |
| --- | --- |
| facet | [<code>RegularFacetModule</code>](#RegularFacetModule) | 

<a name="RegularFacetModule..indexOf"></a>

### RegularFacetModule~indexOf(container) ⇒ <code>number</code>
Returns the position (location within the module) of the given container.

**Kind**: inner method of [<code>RegularFacetModule</code>](#RegularFacetModule)  

| Param | Type |
| --- | --- |
| container | [<code>FacetContainer</code>](#FacetContainer) | 

<a name="RegularFacetModule..getContainer"></a>

### RegularFacetModule~getContainer(facet) ⇒ [<code>FacetContainer</code>](#FacetContainer)
Returns the container that contains the facet.

**Kind**: inner method of [<code>RegularFacetModule</code>](#RegularFacetModule)  

| Param | Type |
| --- | --- |
| facet | [<code>RegularFacet</code>](#RegularFacet) | 

<a name="RegularFacetModule..activateFacet"></a>

### RegularFacetModule~activateFacet(facet, position, operation, filter)
Make the facet available for use.

**Kind**: inner method of [<code>RegularFacetModule</code>](#RegularFacetModule)  

| Param | Type | Description |
| --- | --- | --- |
| facet | [<code>RegularFacet</code>](#RegularFacet) |  |
| position | <code>number</code> | Location within the module |
| operation | <code>Operation</code> |  |
| filter | <code>Array.&lt;Filter&gt;</code> |  |

<a name="RegularFacetModule..deactivateFacet"></a>

### RegularFacetModule~deactivateFacet(facet, filter)
Remove facet from current selection.

**Kind**: inner method of [<code>RegularFacetModule</code>](#RegularFacetModule)  

| Param | Type |
| --- | --- |
| facet | [<code>RegularFacet</code>](#RegularFacet) | 
| filter | <code>Array.&lt;Filter&gt;</code> | 

<a name="RegularFacetModule..moveContainer"></a>

### RegularFacetModule~moveContainer(container, targetPosition, filter)
Move a container to a different position (location within the module).

**Kind**: inner method of [<code>RegularFacetModule</code>](#RegularFacetModule)  

| Param | Type |
| --- | --- |
| container | [<code>FacetContainer</code>](#FacetContainer) | 
| targetPosition | <code>number</code> | 
| filter | <code>Array.&lt;Filter&gt;</code> | 

<a name="RegularFacetModule..makeSelection"></a>

### RegularFacetModule~makeSelection(facet, target, filter)
Make a selection on the facet and update all subsequent facets within the module.

**Kind**: inner method of [<code>RegularFacetModule</code>](#RegularFacetModule)  

| Param | Type |
| --- | --- |
| facet | [<code>RegularFacet</code>](#RegularFacet) | 
| target | [<code>RegularFacetTarget</code>](#RegularFacetTarget) | 
| filter | <code>Array.&lt;Filter&gt;</code> | 

<a name="RegularFacetModule..getFilter"></a>

### RegularFacetModule~getFilter() ⇒ <code>Array.&lt;Filter&gt;</code>
Returns the filter for all containers in this module.

**Kind**: inner method of [<code>RegularFacetModule</code>](#RegularFacetModule)  
<a name="RegularFacetModule..update"></a>

### RegularFacetModule~update(filter)
Updates all active containers.

**Kind**: inner method of [<code>RegularFacetModule</code>](#RegularFacetModule)  

| Param | Type |
| --- | --- |
| filter | <code>Array.&lt;Filter&gt;</code> | 

<a name="RegularFacetModule..getFacetById"></a>

### RegularFacetModule~getFacetById(searchId) ⇒ [<code>RegularFacet</code>](#RegularFacet)
Return facet based on its id.

**Kind**: inner method of [<code>RegularFacetModule</code>](#RegularFacetModule)  

| Param | Type |
| --- | --- |
| searchId | <code>string</code> | 

