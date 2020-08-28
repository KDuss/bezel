## Functions

<dl>
<dt><a href="#moduleChoiceProjector">moduleChoiceProjector(mainController, module)</a> ⇒ <code>HTMLDivElement</code></dt>
<dd><p>Creates an element that can be clicked or dragged to activate a module.</p>
</dd>
<dt><a href="#baseModule">baseModule(mainController, module)</a> ⇒ <code>HTMLDivElement</code></dt>
<dd><p>Creates the basic/generic structure of a module.</p>
</dd>
<dt><a href="#initializeDropTarget">initializeDropTarget(mainController)</a> ⇒ <code>HTMLDivElement</code></dt>
<dd><p>Create element that serves as target when dragging <a href="#moduleChoiceProjector">moduleChoiceProjector</a> to activate a module.</p>
</dd>
<dt><a href="#moduleListSection">moduleListSection(mainController)</a> ⇒ <code>Array.&lt;HTMLTitleElement&gt;</code> | <code>Array.&lt;HTMLDivElement&gt;</code></dt>
<dd><p>Create title and container for all choices of available modules.</p>
</dd>
<dt><a href="#activeModulesSection">activeModulesSection(mainController)</a> ⇒ <code>Array.&lt;HTMLTitleElement&gt;</code> | <code>Array.&lt;HTMLDivElement&gt;</code></dt>
<dd><p>Create area where modules are placed when activated.</p>
</dd>
<dt><a href="#initializeLoadingIndicator">initializeLoadingIndicator(logoTag)</a></dt>
<dd><p>Adds animation to the logo, when the application is waiting for a server response.</p>
</dd>
<dt><a href="#moduleProjector">moduleProjector(mainController, moduleListRoot, activeModulesRoot)</a></dt>
<dd><p>Projector for the module system.</p>
</dd>
</dl>

<a name="moduleChoiceProjector"></a>

## moduleChoiceProjector(mainController, module) ⇒ <code>HTMLDivElement</code>
Creates an element that can be clicked or dragged to activate a module.

**Kind**: global function  

| Param | Type |
| --- | --- |
| mainController | <code>MainController</code> | 
| module | <code>TableModule</code> \| <code>RegularFacetModule</code> | 

<a name="baseModule"></a>

## baseModule(mainController, module) ⇒ <code>HTMLDivElement</code>
Creates the basic/generic structure of a module.

**Kind**: global function  

| Param | Type |
| --- | --- |
| mainController | <code>MainController</code> | 
| module | <code>TableModule</code> \| <code>RegularFacetModule</code> | 

<a name="initializeDropTarget"></a>

## initializeDropTarget(mainController) ⇒ <code>HTMLDivElement</code>
Create element that serves as target when dragging [moduleChoiceProjector](#moduleChoiceProjector) to activate a module.

**Kind**: global function  

| Param | Type |
| --- | --- |
| mainController | <code>MainController</code> | 

<a name="moduleListSection"></a>

## moduleListSection(mainController) ⇒ <code>Array.&lt;HTMLTitleElement&gt;</code> \| <code>Array.&lt;HTMLDivElement&gt;</code>
Create title and container for all choices of available modules.

**Kind**: global function  

| Param | Type |
| --- | --- |
| mainController | <code>MainController</code> | 

<a name="activeModulesSection"></a>

## activeModulesSection(mainController) ⇒ <code>Array.&lt;HTMLTitleElement&gt;</code> \| <code>Array.&lt;HTMLDivElement&gt;</code>
Create area where modules are placed when activated.

**Kind**: global function  

| Param | Type |
| --- | --- |
| mainController | <code>MainController</code> | 

<a name="initializeLoadingIndicator"></a>

## initializeLoadingIndicator(logoTag)
Adds animation to the logo, when the application is waiting for a server response.

**Kind**: global function  

| Param | Type |
| --- | --- |
| logoTag | <code>HTMLImageElement</code> | 

<a name="moduleProjector"></a>

## moduleProjector(mainController, moduleListRoot, activeModulesRoot)
Projector for the module system.

**Kind**: global function  

| Param | Type |
| --- | --- |
| mainController | <code>MainController</code> | 
| moduleListRoot | <code>HTMLDivElement</code> | 
| activeModulesRoot | <code>HTMLDivElement</code> | 

