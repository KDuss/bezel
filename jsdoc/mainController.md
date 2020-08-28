## Functions

<dl>
<dt><a href="#MainController">MainController()</a> ⇒ <code><a href="#MainController">MainController</a></code></dt>
<dd><p>Create <a href="#MainController">MainController</a>.</p>
</dd>
</dl>

## Typedefs

<dl>
<dt><a href="#MainController">MainController</a> : <code>Object</code></dt>
<dd><p>Controller for managing the modules.</p>
</dd>
</dl>

<a name="MainController"></a>

## MainController() ⇒ [<code>MainController</code>](#MainController)
Create [MainController](#MainController).

**Kind**: global function  

* [MainController()](#MainController) ⇒ [<code>MainController</code>](#MainController)
    * [~availableModules](#MainController..availableModules)
    * [~modules](#MainController..modules)
    * [~addModule(module)](#MainController..addModule)
    * [~getFilterBefore(module, include)](#MainController..getFilterBefore)
    * [~updateSubsequent(module, include)](#MainController..updateSubsequent)
    * [~activateModule(module)](#MainController..activateModule)
    * [~deactivateModule(module)](#MainController..deactivateModule)
    * [~reset()](#MainController..reset)
    * [~resetModule(module)](#MainController..resetModule)
    * [~resetFacet(module, facet)](#MainController..resetFacet)
    * [~activateFacet(module, facet, position, operation)](#MainController..activateFacet)
    * [~deactivateFacet(module, facet)](#MainController..deactivateFacet)
    * [~makeSelection(module, facet, target)](#MainController..makeSelection)
    * [~moveInModule(module, container, targetPos)](#MainController..moveInModule)
    * [~getModuleByName(name)](#MainController..getModuleByName) ⇒ <code>BezelModule</code>

<a name="MainController..availableModules"></a>

### MainController~availableModules
All modules that can be utilized by the user.

**Kind**: inner constant of [<code>MainController</code>](#MainController)  
<a name="MainController..modules"></a>

### MainController~modules
The modules currently in use.

**Kind**: inner constant of [<code>MainController</code>](#MainController)  
<a name="MainController..addModule"></a>

### MainController~addModule(module)
Make a module available to the user.

**Kind**: inner method of [<code>MainController</code>](#MainController)  

| Param | Type |
| --- | --- |
| module | <code>BezelModule</code> | 

<a name="MainController..getFilterBefore"></a>

### MainController~getFilterBefore(module, include)
Get a combined filter for all preceding modules.

**Kind**: inner method of [<code>MainController</code>](#MainController)  

| Param | Type | Description |
| --- | --- | --- |
| module | <code>BezelModule</code> |  |
| include | <code>boolean</code> | True, if the filter for the passed module itself should be included |

<a name="MainController..updateSubsequent"></a>

### MainController~updateSubsequent(module, include)
Update passed module and all subsequent modules.

**Kind**: inner method of [<code>MainController</code>](#MainController)  

| Param | Type | Description |
| --- | --- | --- |
| module | <code>BezelModule</code> |  |
| include | <code>boolean</code> | True, if the passed module itself should be updated as well |

<a name="MainController..activateModule"></a>

### MainController~activateModule(module)
Use module.

**Kind**: inner method of [<code>MainController</code>](#MainController)  

| Param | Type |
| --- | --- |
| module | <code>BezelModule</code> | 

<a name="MainController..deactivateModule"></a>

### MainController~deactivateModule(module)
Remove module from current selection.

**Kind**: inner method of [<code>MainController</code>](#MainController)  

| Param | Type |
| --- | --- |
| module | <code>BezelModule</code> | 

<a name="MainController..reset"></a>

### MainController~reset()
Removes all modules and reset selection.

**Kind**: inner method of [<code>MainController</code>](#MainController)  
<a name="MainController..resetModule"></a>

### MainController~resetModule(module)
Removes all active facets on the module.

**Kind**: inner method of [<code>MainController</code>](#MainController)  

| Param | Type |
| --- | --- |
| module | <code>BezelModule</code> | 

<a name="MainController..resetFacet"></a>

### MainController~resetFacet(module, facet)
Removes the selection on a specific facet.

**Kind**: inner method of [<code>MainController</code>](#MainController)  

| Param | Type |
| --- | --- |
| module | <code>BezelModule</code> | 
| facet | <code>Facet</code> | 

<a name="MainController..activateFacet"></a>

### MainController~activateFacet(module, facet, position, operation)
Make facet available to user.

**Kind**: inner method of [<code>MainController</code>](#MainController)  

| Param | Type |
| --- | --- |
| module | <code>BezelModule</code> | 
| facet | <code>Facet</code> | 
| position | <code>number</code> | 
| operation | <code>Operation</code> | 

<a name="MainController..deactivateFacet"></a>

### MainController~deactivateFacet(module, facet)
Remove facet from the facets currently in use.

**Kind**: inner method of [<code>MainController</code>](#MainController)  

| Param | Type |
| --- | --- |
| module | <code>BezelModule</code> | 
| facet | <code>Facet</code> | 

<a name="MainController..makeSelection"></a>

### MainController~makeSelection(module, facet, target)
Make a selection on a facet.

**Kind**: inner method of [<code>MainController</code>](#MainController)  

| Param | Type |
| --- | --- |
| module | <code>BezelModule</code> | 
| facet | <code>Facet</code> | 
| target | <code>TableFacetTarget</code> \| <code>RegularFacetTarget</code> | 

<a name="MainController..moveInModule"></a>

### MainController~moveInModule(module, container, targetPos)
Move a facet within a module.

**Kind**: inner method of [<code>MainController</code>](#MainController)  

| Param |
| --- |
| module | 
| container | 
| targetPos | 

<a name="MainController..getModuleByName"></a>

### MainController~getModuleByName(name) ⇒ <code>BezelModule</code>
Returns the module for a given name.

**Kind**: inner method of [<code>MainController</code>](#MainController)  

| Param | Type |
| --- | --- |
| name | <code>string</code> | 

<a name="MainController"></a>

## MainController : <code>Object</code>
Controller for managing the modules.

**Kind**: global typedef  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| addModule | <code>function</code> |  |
| onModuleAdd | <code>function</code> |  |
| activateModule | <code>function</code> |  |
| onModuleActivate | <code>function</code> |  |
| deactivateModule | <code>function</code> |  |
| onModuleDeactivate | <code>function</code> |  |
| activateFacet | <code>function</code> |  |
| deactivateFacet | <code>function</code> |  |
| makeSelection | <code>function</code> |  |
| moveInFacet | <code>function</code> |  |
| reset | <code>function</code> | Reset entire application |
| resetModule | <code>function</code> | Reset the passed module and update all subsequent modules |
| resetFacet | <code>function</code> | Reset the passed facet and update all subsequent modules |
| getModuleByName | <code>function</code> |  |


* [MainController](#MainController) : <code>Object</code>
    * [~availableModules](#MainController..availableModules)
    * [~modules](#MainController..modules)
    * [~addModule(module)](#MainController..addModule)
    * [~getFilterBefore(module, include)](#MainController..getFilterBefore)
    * [~updateSubsequent(module, include)](#MainController..updateSubsequent)
    * [~activateModule(module)](#MainController..activateModule)
    * [~deactivateModule(module)](#MainController..deactivateModule)
    * [~reset()](#MainController..reset)
    * [~resetModule(module)](#MainController..resetModule)
    * [~resetFacet(module, facet)](#MainController..resetFacet)
    * [~activateFacet(module, facet, position, operation)](#MainController..activateFacet)
    * [~deactivateFacet(module, facet)](#MainController..deactivateFacet)
    * [~makeSelection(module, facet, target)](#MainController..makeSelection)
    * [~moveInModule(module, container, targetPos)](#MainController..moveInModule)
    * [~getModuleByName(name)](#MainController..getModuleByName) ⇒ <code>BezelModule</code>

<a name="MainController..availableModules"></a>

### MainController~availableModules
All modules that can be utilized by the user.

**Kind**: inner constant of [<code>MainController</code>](#MainController)  
<a name="MainController..modules"></a>

### MainController~modules
The modules currently in use.

**Kind**: inner constant of [<code>MainController</code>](#MainController)  
<a name="MainController..addModule"></a>

### MainController~addModule(module)
Make a module available to the user.

**Kind**: inner method of [<code>MainController</code>](#MainController)  

| Param | Type |
| --- | --- |
| module | <code>BezelModule</code> | 

<a name="MainController..getFilterBefore"></a>

### MainController~getFilterBefore(module, include)
Get a combined filter for all preceding modules.

**Kind**: inner method of [<code>MainController</code>](#MainController)  

| Param | Type | Description |
| --- | --- | --- |
| module | <code>BezelModule</code> |  |
| include | <code>boolean</code> | True, if the filter for the passed module itself should be included |

<a name="MainController..updateSubsequent"></a>

### MainController~updateSubsequent(module, include)
Update passed module and all subsequent modules.

**Kind**: inner method of [<code>MainController</code>](#MainController)  

| Param | Type | Description |
| --- | --- | --- |
| module | <code>BezelModule</code> |  |
| include | <code>boolean</code> | True, if the passed module itself should be updated as well |

<a name="MainController..activateModule"></a>

### MainController~activateModule(module)
Use module.

**Kind**: inner method of [<code>MainController</code>](#MainController)  

| Param | Type |
| --- | --- |
| module | <code>BezelModule</code> | 

<a name="MainController..deactivateModule"></a>

### MainController~deactivateModule(module)
Remove module from current selection.

**Kind**: inner method of [<code>MainController</code>](#MainController)  

| Param | Type |
| --- | --- |
| module | <code>BezelModule</code> | 

<a name="MainController..reset"></a>

### MainController~reset()
Removes all modules and reset selection.

**Kind**: inner method of [<code>MainController</code>](#MainController)  
<a name="MainController..resetModule"></a>

### MainController~resetModule(module)
Removes all active facets on the module.

**Kind**: inner method of [<code>MainController</code>](#MainController)  

| Param | Type |
| --- | --- |
| module | <code>BezelModule</code> | 

<a name="MainController..resetFacet"></a>

### MainController~resetFacet(module, facet)
Removes the selection on a specific facet.

**Kind**: inner method of [<code>MainController</code>](#MainController)  

| Param | Type |
| --- | --- |
| module | <code>BezelModule</code> | 
| facet | <code>Facet</code> | 

<a name="MainController..activateFacet"></a>

### MainController~activateFacet(module, facet, position, operation)
Make facet available to user.

**Kind**: inner method of [<code>MainController</code>](#MainController)  

| Param | Type |
| --- | --- |
| module | <code>BezelModule</code> | 
| facet | <code>Facet</code> | 
| position | <code>number</code> | 
| operation | <code>Operation</code> | 

<a name="MainController..deactivateFacet"></a>

### MainController~deactivateFacet(module, facet)
Remove facet from the facets currently in use.

**Kind**: inner method of [<code>MainController</code>](#MainController)  

| Param | Type |
| --- | --- |
| module | <code>BezelModule</code> | 
| facet | <code>Facet</code> | 

<a name="MainController..makeSelection"></a>

### MainController~makeSelection(module, facet, target)
Make a selection on a facet.

**Kind**: inner method of [<code>MainController</code>](#MainController)  

| Param | Type |
| --- | --- |
| module | <code>BezelModule</code> | 
| facet | <code>Facet</code> | 
| target | <code>TableFacetTarget</code> \| <code>RegularFacetTarget</code> | 

<a name="MainController..moveInModule"></a>

### MainController~moveInModule(module, container, targetPos)
Move a facet within a module.

**Kind**: inner method of [<code>MainController</code>](#MainController)  

| Param |
| --- |
| module | 
| container | 
| targetPos | 

<a name="MainController..getModuleByName"></a>

### MainController~getModuleByName(name) ⇒ <code>BezelModule</code>
Returns the module for a given name.

**Kind**: inner method of [<code>MainController</code>](#MainController)  

| Param | Type |
| --- | --- |
| name | <code>string</code> | 

