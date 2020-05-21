# generateTypes

This is a TypeScript library to generate TypeScript types from JSON files.

It is available online under [github][https://slreynolds.github.io/generateTypes/].

## Example

Turns

```JSON
{"menu": {
  "id": "file",
  "value": "File",
  "popup": {
    "menuitem": [
      {"value": "New", "onclick": "CreateNewDoc()"},
      {"value": "Open", "onclick": "OpenDoc()"},
      {"value": "Close", "onclick": "CloseDoc()"}
    ]
  }
}}
```

into


```TypeScript
type Thing = {
  menu: {
    id: string,
    value: string,
    popup: {
      menuitem: Menuitem[]
    }
  }
}
type Menuitem = {
  value: string,
  onclick: string
}
```

which you can use as a ```thing.d.ts``` to correctly use your JSON inside your TypeScript app.

## Installation

You can start a local server with live reloading

```bash
npm install
npm run start
```

Then you can point your favorite internet browser to [localhost:3000][http://localhost:3000].

## Docu

* [JSON][https://www.json.org/json-en.html]
* [Basic TypeScript Types][https://www.typescriptlang.org/docs/handbook/basic-types.html]
* [Advanced TypeScript Types][https://www.typescriptlang.org/docs/handbook/advanced-types.html]
* [module-plugin.d.ts][https://www.typescriptlang.org/docs/handbook/declaration-files/templates/module-plugin-d-ts.html]

## TODO

Tests are missing
Implement JSON Examples [https://json.org/example.html]

## License

**Copyright**: Copyright 2020 "Steven Lamarr Reynolds"
