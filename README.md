# declarative-instructions-single

> **One declarative instruction per transformation.** A focused assembly contract for reports and reusable UI built from JSON data.

[![npm](https://img.shields.io/npm/v/declarative-instructions-single?color=cb3837&label=npm)](https://www.npmjs.com/package/declarative-instructions-single)
[![Documentation](https://img.shields.io/badge/docs-read%20the%20story-38bdf8)](https://keshavsoft.github.io/declarative-instructions-single/)
![License: MIT](https://img.shields.io/badge/license-MIT-34d399.svg)

## The story

The original `declarative-instructions` report grew to cover several ways of assembling an interface. This package gives the **single-instruction pattern** its own home: each top-level key describes one transformation, with a source, a destination, a template, and—when needed—a mapping function.

That keeps each operation easy to find and reason about. A table header, a body, a form field collection, or a menu can each be understood on its own. The renderer still owns execution; this package describes the assembly work declaratively.

## The instruction contract

Most collection builders follow this shape:

```json
{
  "buildHeader": {
    "type": "single",
    "narration": "Build table header",
    "destinationPath": {
      "jsonPath": "$..*[?@.attributes['data-role'] == 'table-header-row'].children"
    },
    "sourcePath": "$.data.columns",
    "templateKey": "buildHeader",
    "func": "fromCollection"
  }
}
```

The contract answers four practical questions:

| Field | Purpose |
| --- | --- |
| `sourcePath` | Which input value or collection feeds the transformation? |
| `destinationPath` | Which part of the assembled tree receives the result? |
| `templateKey` | Which reusable blueprint should be applied? |
| `func` | Which standard mapping or template function shapes the result? |

Instructions can also describe row-by-column mapping, direct template application, or guarded insertions. For example, optional search controls use `skipIf` so an already-present control is not inserted again.

## What is included

- **Report tables:** column groups, clickable or regular headers, footers, and row-on-column bodies.
- **Report helpers:** serial cells and search toolbar, label, input, and helper insertions.
- **Forms and choices:** fields, selects, select options, option arrays, and datalists.
- **Reusable content:** accordion items, card sections, lists, list groups, navigation items, and menu cards.

The live documentation includes a searchable catalog generated from the current v3 instruction JSON, with each full contract available to inspect.

## Install and use

```bash
npm install declarative-instructions-single
```

```js
import instructions from "declarative-instructions-single";

const tableBodyContract = instructions.buildBody;
console.log(tableBodyContract.func); // "rowOnColumn"
```

The package exports the latest instruction object from its root entry point. Use these rules with the compatible JSON-to-DOM compiler and the matching templates from `declarative-spec`.

## Versions and source

- Current instructions: [`src/v3/instructions.json`](src/v3/instructions.json)
- Versioned JSON reference: [`docs/json/v3/instructions.json`](docs/json/v3/instructions.json)
- Documentation story and catalog: [`docs/index.html`](docs/index.html)
- Related multi-step report: [declarative-instructions-multi](https://github.com/keshavsoft/declarative-instructions-multi)

## License

MIT © KeshavSoft.
