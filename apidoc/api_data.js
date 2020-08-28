define({ "api": [
  {
    "type": "post",
    "url": "/filter/entries",
    "title": "Get table entries",
    "version": "0.0.0",
    "description": "<p>GET all remaining entries after filtering to be displayed in table</p>",
    "name": "TableEntries",
    "group": "Entries",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "page",
            "description": "<p>Paginates results. Pagination starts at 0.</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "pageSize",
            "description": "<p>Number of positions returned at a time</p>"
          },
          {
            "group": "Parameter",
            "type": "Object[]",
            "optional": false,
            "field": "filter",
            "description": "<p>Filter database has to process.</p>"
          },
          {
            "group": "Parameter",
            "type": "Object",
            "optional": false,
            "field": "filter.combination",
            "description": "<p>Process combination, combination is a placeholder for and/or.</p>"
          },
          {
            "group": "Parameter",
            "type": "Object",
            "optional": false,
            "field": "filter.combination.facetName",
            "description": "<p>Name of facet, facetName is a placeholder for the real facet name.</p>"
          },
          {
            "group": "Parameter",
            "type": "String[]",
            "optional": false,
            "field": "filter.combination.facetName.foci",
            "description": "<p>To filter facet values</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "filter.combination.facetName.groupType",
            "description": "<p>Defines how facets are grouped. Possible values: none, value and range.</p>"
          },
          {
            "group": "Parameter",
            "type": "Object[[]]",
            "optional": false,
            "field": "filter.combination.facetName.grouping",
            "description": "<p>Defines how facet values are grouped</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "string",
            "optional": false,
            "field": "columnName",
            "description": "<p>Name of specific column in orig data.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n  entries:\n    [\n      {\n        columnNameX: columnXValue1,\n        columnNameY: columnYValue1,\n        columnNameZ: columnZValue1\n      },{\n        columnNameX: columnXValue2,\n        columnNameY: columnYValue2,\n        columnNameZ: columnZValue2\n      },\n      ...\n    ]\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "5xxx": [
          {
            "group": "5xxx",
            "optional": false,
            "field": "InternalServerError",
            "description": "<p>Problems with request processing or database connection.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "filename": "code/src/server/web/filter-dispatcher.mjs",
    "groupTitle": "Entries"
  },
  {
    "type": "post",
    "url": "/filter/filtered-foci",
    "title": "Get updated scores",
    "version": "0.0.0",
    "description": "<p>Get recalculated scores for each displayed focus after filtering for facet n after applying the first n-1 filters.</p>",
    "name": "ScoresFoci",
    "group": "Foci",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Object[]",
            "optional": false,
            "field": "filter",
            "description": "<p>Filter database has to process.</p>"
          },
          {
            "group": "Parameter",
            "type": "Object",
            "optional": false,
            "field": "filter.combination",
            "description": "<p>Process combination, combination is a placeholder for and/or.</p>"
          },
          {
            "group": "Parameter",
            "type": "Object",
            "optional": false,
            "field": "filter.combination.facetName",
            "description": "<p>Name of facet, facetName is a placeholder for the real facet name.</p>"
          },
          {
            "group": "Parameter",
            "type": "String[]",
            "optional": false,
            "field": "filter.combination.facetName.foci",
            "description": "<p>To filter facet values</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "filter.combination.facetName.groupType",
            "description": "<p>Defines how facets are grouped. Possible values: none, value and range.</p>"
          },
          {
            "group": "Parameter",
            "type": "Object[[]]",
            "optional": false,
            "field": "filter.combination.facetName.grouping",
            "description": "<p>Defines how facet values are grouped.</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "groupType",
            "description": "<p>Identifier how the foci on the last facet in the query are grouped. Is either none for flat facets, value for grouped facets or range for range facets.</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "grouping",
            "description": "<p>Defined groups on facet.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "string",
            "optional": false,
            "field": "_id",
            "description": "<p>Name of the lowest facet values displayed</p>"
          },
          {
            "group": "Success 200",
            "type": "string",
            "optional": false,
            "field": "count",
            "description": "<p>Number of found scores.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n[\n      {\n        _id: '1-10',\n        count: 8124,\n      },\n      ...\n]",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "5xxx": [
          {
            "group": "5xxx",
            "optional": false,
            "field": "InternalServerError",
            "description": "<p>Problems with request processing or database connection.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "filename": "code/src/server/web/filter-dispatcher.mjs",
    "groupTitle": "Foci"
  }
] });
