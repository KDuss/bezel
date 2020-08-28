## Functions

<dl>
<dt><a href="#filterAccepts">filterAccepts(rowData, filter)</a> ⇒ <code>boolean</code></dt>
<dd><p>Returns true, if the data for a specific row passes the filter.</p>
</dd>
<dt><a href="#padRight">padRight()</a></dt>
<dd><p>Appends blanks to the right until the string is of size extend
padRight :: String, Int -&gt; String</p>
</dd>
<dt><a href="#padLeft">padLeft()</a></dt>
<dd><p>Appends blanks to the left until the string is of size extend
padLeft :: String, Int -&gt; String</p>
</dd>
<dt><a href="#TupleCtor">TupleCtor()</a> ⇒</dt>
<dd></dd>
<dt><a href="#sleep">sleep(millis)</a></dt>
<dd><p>Adds delay to the execution of subsequent code.
Used for UI tests, because click events run asynchronously.
Usage in test: await sleep(10);</p>
</dd>
</dl>

## Typedefs

<dl>
<dt><a href="#Operation">Operation</a> : <code>&#x27;and&#x27;</code> | <code>&#x27;or&#x27;</code></dt>
<dd></dd>
</dl>

<a name="filterAccepts"></a>

## filterAccepts(rowData, filter) ⇒ <code>boolean</code>
Returns true, if the data for a specific row passes the filter.

**Kind**: global function  

| Param | Type |
| --- | --- |
| rowData | <code>Object</code> | 
| filter |  | 

<a name="padRight"></a>

## padRight()
Appends blanks to the right until the string is of size extendpadRight :: String, Int -> String

**Kind**: global function  
<a name="padLeft"></a>

## padLeft()
Appends blanks to the left until the string is of size extendpadLeft :: String, Int -> String

**Kind**: global function  
<a name="TupleCtor"></a>

## TupleCtor() ⇒
**Kind**: global function  
**Returns**: function that waits for the selector or the ctor for the remaining args  
<a name="sleep"></a>

## sleep(millis)
Adds delay to the execution of subsequent code.Used for UI tests, because click events run asynchronously.Usage in test: await sleep(10);

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| millis | <code>number</code> | Duration of delay |

<a name="Operation"></a>

## Operation : <code>&#x27;and&#x27;</code> \| <code>&#x27;or&#x27;</code>
**Kind**: global typedef  
