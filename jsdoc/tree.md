## Functions

<dl>
<dt><a href="#defaultEquals">defaultEquals()</a></dt>
<dd><p>Helper Functions</p>
</dd>
<dt><a href="#Queue">Queue()</a></dt>
<dd><p>Queue datastructure with its typical functions</p>
</dd>
</dl>

## Typedefs

<dl>
<dt><a href="#Node">Node</a> ⇒ <code><a href="#Node">Node</a></code></dt>
<dd><p>Describes a node in a tree</p>
</dd>
<dt><a href="#Tree">Tree</a> ⇒ <code><a href="#Tree">Tree</a></code></dt>
<dd><p>Describes a Tree holding one or multiple nodes</p>
</dd>
</dl>

<a name="defaultEquals"></a>

## defaultEquals()
Helper Functions

**Kind**: global function  
<a name="Queue"></a>

## Queue()
Queue datastructure with its typical functions

**Kind**: global function  
<a name="Node"></a>

## Node ⇒ [<code>Node</code>](#Node)
Describes a node in a tree

**Kind**: global typedef  

| Param | Type | Description |
| --- | --- | --- |
| nodeData | <code>\*</code> | Data to store in node |
| parentNode | [<code>Node</code>](#Node) \| <code>null</code> | Reference to parent node |
| [equalsFn] | <code>function</code> | Compare function used to compare data of two nodes. Must return true if arguments are equal. |

**Properties**

| Name | Type | Description |
| --- | --- | --- |
| getData | <code>\*</code> | Data stored in node |
| updateData | <code>function</code> | New data to store in node |
| isLeafNode | <code>boolean</code> | Determines if node has no children |
| addChild | <code>function</code> | Add a single child node |
| getChildren | [<code>Node</code>](#Node) \| [<code>Array.&lt;Node&gt;</code>](#Node) | Get all children |
| getParent | <code>function</code> | Get Parent Node |
| getLevel | <code>function</code> | Level node belongs to (root is at level 0) |
| equalNodes | <code>function</code> |  |
| isNode | <code>boolean</code> |  |

<a name="Node..addChild"></a>

### Node~addChild(childData, [equalMethod])
Add one childIf child has already a parent, reference is overriden

**Kind**: inner method of [<code>Node</code>](#Node)  

| Param | Type |
| --- | --- |
| childData | <code>\*</code> | 
| [equalMethod] | <code>function</code> | 

<a name="Tree"></a>

## Tree ⇒ [<code>Tree</code>](#Tree)
Describes a Tree holding one or multiple nodes

**Kind**: global typedef  

| Param | Type | Description |
| --- | --- | --- |
| nodeData | <code>\*</code> |  |
| [equalsFn] | <code>function</code> | Compare function used to compare data of two nodes. Must return true if arguments are equal. |


* [Tree](#Tree) ⇒ [<code>Tree</code>](#Tree)
    * [~traverseTreeDown(startNode, callbackFn, includeStartNode, [breakFn])](#Tree..traverseTreeDown) ⇒ <code>null</code>
    * [~traverseTreeUp(startNode, callbackFn, includeStartNode)](#Tree..traverseTreeUp)
    * [~find(predicate)](#Tree..find) ⇒ <code>node</code> \| <code>null</code>
    * [~isNode(node)](#Tree..isNode)
    * [~contains(nodeToCheck)](#Tree..contains) ⇒ <code>boolean</code>
    * [~addNode(data, parentNode)](#Tree..addNode) ⇒ [<code>Node</code>](#Node) \| <code>null</code>
    * [~sumUpDataProperty(getValueFn, nodeToGetSum)](#Tree..sumUpDataProperty) ⇒ <code>number</code>
    * [~numberOfNodesAtLevel(level)](#Tree..numberOfNodesAtLevel) ⇒ <code>number</code>

<a name="Tree..traverseTreeDown"></a>

### Tree~traverseTreeDown(startNode, callbackFn, includeStartNode, [breakFn]) ⇒ <code>null</code>
Traverse Tree down starting at root nodeUsed algorithm Breadth First Search

**Kind**: inner method of [<code>Tree</code>](#Tree)  
**Returns**: <code>null</code> - - If tree was traversed completely  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| startNode | [<code>Node</code>](#Node) |  | Starting node of traverse |
| callbackFn | <code>function</code> |  | Processes current parent node |
| includeStartNode | <code>boolean</code> | <code>true</code> | Determines whether the start node is visited or not (true by default) |
| [breakFn] | <code>function</code> |  | Argument to end search |

<a name="Tree..traverseTreeUp"></a>

### Tree~traverseTreeUp(startNode, callbackFn, includeStartNode)
Traverse Tree up starting at given starting node

**Kind**: inner method of [<code>Tree</code>](#Tree)  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| startNode | [<code>Node</code>](#Node) |  | Node in tree to begin with search |
| callbackFn | <code>function</code> |  | Processes current parent node |
| includeStartNode | <code>boolean</code> | <code>true</code> | Determines whether the start node is included or no. |

<a name="Tree..find"></a>

### Tree~find(predicate) ⇒ <code>node</code> \| <code>null</code>
Find given node in tree

**Kind**: inner method of [<code>Tree</code>](#Tree)  
**Returns**: <code>node</code> \| <code>null</code> - Found node if not found null  

| Param | Type |
| --- | --- |
| predicate | <code>function</code> | 

<a name="Tree..isNode"></a>

### Tree~isNode(node)
Checks if given parameter is an node as defined in function Node

**Kind**: inner method of [<code>Tree</code>](#Tree)  

| Param | Type |
| --- | --- |
| node | [<code>Node</code>](#Node) | 

<a name="Tree..contains"></a>

### Tree~contains(nodeToCheck) ⇒ <code>boolean</code>
Check if tree contains given node

**Kind**: inner method of [<code>Tree</code>](#Tree)  

| Param | Type |
| --- | --- |
| nodeToCheck | [<code>Node</code>](#Node) | 

<a name="Tree..addNode"></a>

### Tree~addNode(data, parentNode) ⇒ [<code>Node</code>](#Node) \| <code>null</code>
Add a new single node

**Kind**: inner method of [<code>Tree</code>](#Tree)  
**Returns**: [<code>Node</code>](#Node) \| <code>null</code> - Added node if adding failed null  

| Param | Type | Description |
| --- | --- | --- |
| data | <code>\*</code> |  |
| parentNode | [<code>Node</code>](#Node) | Parent Node |

<a name="Tree..sumUpDataProperty"></a>

### Tree~sumUpDataProperty(getValueFn, nodeToGetSum) ⇒ <code>number</code>
Accumulate given property to get root total

**Kind**: inner method of [<code>Tree</code>](#Tree)  
**Returns**: <code>number</code> - Sum of all, -1 if value of propertyToSum is not a number  

| Param | Type | Description |
| --- | --- | --- |
| getValueFn | <code>function</code> | Property of data which has to be added up |
| nodeToGetSum | [<code>Node</code>](#Node) | Node of interest to calculate total of given property of all its children. |

<a name="Tree..numberOfNodesAtLevel"></a>

### Tree~numberOfNodesAtLevel(level) ⇒ <code>number</code>
Get number of nodes on given level

**Kind**: inner method of [<code>Tree</code>](#Tree)  

| Param | Type |
| --- | --- |
| level | <code>number</code> | 

