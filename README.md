# declarative-instructions-single

> The individual table-building steps used by the tested V7 report sample.

[![npm](https://img.shields.io/npm/v/declarative-instructions-single?color=cb3837&label=npm)](https://www.npmjs.com/package/declarative-instructions-single)
[![Documentation](https://img.shields.io/badge/docs-follow%20the%20table-38bdf8)](https://keshavsoft.github.io/declarative-instructions-single/)
![License: MIT](https://img.shields.io/badge/license-MIT-34d399.svg)

## The table story

The V7 table sample in [`json-renderers-run-instructions-steps`](https://github.com/keshavsoft/json-renderers-run-instructions-steps/tree/main/samples/v7/table) starts with an empty table shell named `tableWithFooter` from `declarative-spec`. It clones that shell, then runs a sequence of named instructions against the clone.

This package supplies the **single** references in that sequence. Each `{ type: "single", key }` selects one instruction object, such as `buildHeader` or `buildBody`. The step runner resolves the key, reads its source and destination paths, applies the named template function, and writes the result into the table tree.

## What the sample builds

The sample data has three configured columns—Item Name, Category, and Base Unit—and three material records. The `columns` metadata controls the visible table columns; the row builder maps each record through those definitions.

| Single key | Contribution to the table |
| --- | --- |
| `buildColgroup` | Maps the column definitions to table column widths. |
| `buildHeader` | Builds header cells from the column definitions. |
| `buildBody` | Maps rows against columns with `rowOnColumn` to build body cells. |
| `buildFooter` | Builds footer cells from the column definitions. |
| `set-search` | Inserts the search toolbar frame into the table shell. |
| `search-show-label` | Fills the toolbar’s label slot. |
| `search-show-helper` | Fills the toolbar’s helper slot. |
| `search-show-input` | Fills the toolbar’s input slot. |
| `serial-show-serial` | Adds a serial-number cell to each body row. |

These are nine individual references in the tested sequence. Three additional `multi` references from the sibling package add the coordinated serial and action-column features.

## How the table is assembled

The order matters: the shell provides the destination roles first; the core instructions fill its table sections; search and column features are then inserted into those sections.

```js
import runInstructions from "json-renderers-run-instructions-steps";
import spec from "declarative-spec";

const base = structuredClone(spec.tableWithFooter);

const result = runInstructions({
  instructions: [
    { type: "single", key: "buildColgroup" },
    { type: "single", key: "buildHeader" },
    { type: "single", key: "buildBody" },
    { type: "single", key: "buildFooter" },
    { type: "single", key: "set-search" },
    { type: "single", key: "search-show-label" },
    { type: "single", key: "search-show-helper" },
    { type: "single", key: "search-show-input" },
    { type: "multi", key: "set-serial" },
    { type: "single", key: "serial-show-serial" },
    { type: "multi", key: "options-show-button" },
    { type: "multi", key: "options-show-edit-button" }
  ],
  base,
  data: { columns, data }
});
```

The runner executes those references in order, mutates the supplied `base`, and returns that same completed table tree. The V7 sample then passes the result to `json-to-dom` for browser rendering.

## Why “single” matters here

The table header, body, footer, and toolbar are separate operations. That keeps each source-to-destination mapping visible and lets the report sequence combine those operations with multi-step features from [`declarative-instructions-multi`](https://github.com/keshavsoft/declarative-instructions-multi).

The package contains the instruction definitions. The step runner performs execution, `declarative-spec` provides the base and reusable templates, and the transformer functions map the column and row data.

## Install

For the integrated table flow, install the runner and spec package; the runner depends on both single and multi instruction maps:

```bash
npm install json-renderers-run-instructions-steps declarative-spec
```

Current table instructions: [`src/v3/instructions.json`](src/v3/instructions.json) · [Searchable table story](docs/index.html)

## License

MIT © KeshavSoft.
