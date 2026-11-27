# declarative-instructions-single

Named, atomic instructions for building parts of a JSON UI specification.

## The story

A single instruction describes one operation: build a table section, fill a search slot, map records into a list, or create form and selection controls. The V5 catalog gives each operation a stable key and the paths, templates, and transformation function a compatible runner needs.

The catalog covers tables and search controls, forms, selects, datalists, accordions, cards, lists, list groups, menus, and menu cards. It defines the work; it does not execute the instruction or render browser DOM.

## Example: build a table body

The body operation reads rows and columns, combines them with row and cell templates, and targets the table body:

~~~~json
{
  "buildBody": {
    "sourcePath": {
      "rows": "$.data.data",
      "columns": "$.data.columns"
    },
    "templateKey": {
      "rowKey": "buildBodyTr",
      "columnKey": "buildBodyCell"
    },
    "func": "rowOnColumn",
    "destinationPath": {
      "jsonPath": "$..*[?@.attributes['data-role'] == 'table-body'].children"
    }
  }
}
~~~~

Other operations can use a one-dimensional collection function, apply one template to a source object, or directly insert a template with a destination action.

## Search instructions

The V5 keys <code>options-search</code>, <code>options-search-showLabel</code>, <code>options-search-showHelper</code>, and <code>options-search-showInput</code> fill the toolbar and its slots. Their optional <code>skipIf</code> conditions prevent adding elements that are already in the base tree.

## Inspect an instruction

~~~~js
import singleInstructions from "declarative-instructions-single";

const bodyInstruction = singleInstructions.buildBody;
console.log(bodyInstruction);
~~~~

A compatible runner resolves the key, reads the configured source, applies the template function, and writes the result to the destination.

## Source and documentation

- [V5 single-step catalog](src/v5/instructions.json)
- [Documentation site source](docs/index.html)
- [Package entry point](src/index.js)

## Install

~~~~bash
npm install declarative-instructions-single
~~~~

## License

MIT © KeshavSoft.

