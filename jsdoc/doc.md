## Typedefs

<dl>
<dt><a href="#FacetSelection">FacetSelection</a> : <code>Object</code></dt>
<dd><p>Object that describes the selection for a single facet.</p>
</dd>
<dt><a href="#FacetDescription">FacetDescription</a> : <code>Object</code></dt>
<dd></dd>
<dt><a href="#Facet">Facet</a> : <code>Object</code></dt>
<dd><p>Interface for a generic facet.</p>
</dd>
<dt><a href="#BezelContainer">BezelContainer</a> : <code>Object</code></dt>
<dd><p>Interface for a structure containing multiple facets.</p>
</dd>
<dt><a href="#BezelModule">BezelModule</a> : <code>Object</code></dt>
<dd></dd>
<dt><a href="#Filter">Filter</a> : <code>Object</code></dt>
<dd><p>Describes the filter set for a facet (or a combination of facets).
It has either the property &#39;or&#39; or the property &#39;and&#39;.</p>
</dd>
</dl>

<a name="FacetSelection"></a>

## FacetSelection : <code>Object</code>
Object that describes the selection for a single facet.

**Kind**: global typedef  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| foci | <code>Array.&lt;string&gt;</code> | Selected facet values |
| groupType | <code>string</code> | How the facet is grouped |
| grouping | <code>Array.&lt;any&gt;</code> | Group description |

<a name="FacetDescription"></a>

## FacetDescription : <code>Object</code>
**Kind**: global typedef  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| id | <code>string</code> |  |
| name | <code>string</code> |  |
| sourceColumn | <code>string</code> | Refers to a column in the data set |
| type | <code>string</code> | Flat or hierarchical |
| groupType | <code>string</code> | Range, value or none |
| grouping | <code>Array.&lt;Object&gt;</code> | Description of how elements are grouped |

**Example**  
```js
{
    id: 'f2',
    name: 'Location',
    sourceColumn: 'Location',
    type: 'hierarchical',
    groupType: 'value',
    grouping: [[{
        name: 'France',
        foci: ['Paris', 'Montpellier', 'Lyon', 'Toulouse'],
    }, {
        name: 'Italy',
        foci: ['Milan', 'Rome'],
    }]],
}
```
<a name="Facet"></a>

## Facet : <code>Object</code>
Interface for a generic facet.

**Kind**: global typedef  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| update | <code>function</code> | Refresh data with updated filter |
| makeSelection | <code>function</code> | Select or unselect element in model |
| getFilter | <code>function</code> | Get filter for current facet |

<a name="BezelContainer"></a>

## BezelContainer : <code>Object</code>
Interface for a structure containing multiple facets.

**Kind**: global typedef  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| update | <code>function</code> | Refresh all contained facets |
| getFilter | <code>function</code> | Get filter all contained facets |

<a name="BezelModule"></a>

## BezelModule : <code>Object</code>
**Kind**: global typedef  
**Properties**

| Name | Type |
| --- | --- |
| id | <code>string</code> | 
| name | <code>string</code> | 
| type | <code>string</code> | 
| makeSelection | <code>function</code> | 
| reset | <code>function</code> | 
| update | <code>function</code> | 
| getFilter | [<code>Array.&lt;Filter&gt;</code>](#Filter) | 
| getNewInstance | [<code>BezelModule</code>](#BezelModule) | 

<a name="Filter"></a>

## Filter : <code>Object</code>
Describes the filter set for a facet (or a combination of facets).It has either the property 'or' or the property 'and'.

**Kind**: global typedef  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| [or] | <code>Object.&lt;string, FacetSelection&gt;</code> | Facets are combined with 'and' |
| [and] | <code>Object.&lt;string, FacetSelection&gt;</code> | Facets are combined with 'or' |

**Example**  
```js
{
        or:
            {
                Surface: {
                    foci: ['Grass'],
                    groupType: 'none',
                    grouping: []
                },
                WRank: {
                    foci: ['1-10'],
                    groupType: 'range',
                    grouping: [{
                        name: 'unassigned',
                        foci: [],
                    }, {
                        name: '1-10',
                        foci: [1, 11]
                    }]
                }
            }
    }
```
