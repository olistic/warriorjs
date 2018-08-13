---
id: publishing
title: Publishing
---

This is the minimal structure of a tower package:

```sh
warriorjs-tower-got
├── index.js
└── package.json
```

Where `index.js` would contain the code we've been writing through this guide,
and `package.json` the npm package info:

```json
{
  "name": "warriorjs-tower-got",
  "version": "0.1.0",
  "description": "There is only one war that matters: the Great War. And it is here.",
  "main": "index.js",
  "keywords": ["warriorjs-tower"],
  "dependencies": {
    "@warriorjs/geography": "^0.4.0"
  }
}
```

Some special considerations:

- The package name must start with `warriorjs-tower-` for the tower to be
  automatically loaded by WarriorJS.
- `warriorjs-tower` should be in the "keywords" field for better discoverability
  of your tower.

When working on a tower, you can use
[`npm pack`](https://docs.npmjs.com/cli/pack) to create a tarball for it, and
then install it where you installed `@warriorjs/cli` by doing:

```sh
npm install <path/to/tarball>
```

After doing that, running `warriorjs` should load your tower automatically.

Once you've tested and adjusted your tower, you're ready to publish it to
[npm](https://npmjs.com) for others to play it. Follow this
[guide](https://docs.npmjs.com/getting-started/publishing-npm-packages) to learn
how to publish a package to npm.
