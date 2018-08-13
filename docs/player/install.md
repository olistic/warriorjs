---
id: install
title: Install
---

Let's start by installing WarriorJS globally with [npm](https://npmjs.com).

Open the terminal and run:

```sh
npm install --global @warriorjs/cli
```

> **IMPORTANT:** [Node.js](https://nodejs.org) >=8 needs to be installed in your
> computer before running the `npm` command. The recommended installation method
> is through the [official installer](https://nodejs.org/en/download).

After installing the game, you can execute it by running the `warriorjs` command
in the terminal:

```sh
warriorjs
```

That's it! This will guide you through the creation of your warrior. Give your
warrior a proper name and choose the "Baby Steps" tower.

After you've done that, you should have the following file structure (we decided
to name our warrior after the bastard son of Lord Eddard Stark):

```sh
warriorjs
└── jon-snow-baby-steps
    ├── Player.js
    └── README.md
```

- `jon-snow-baby-steps` is your profile's directory.
- `Player.js` is your warrior's brain, you'll be editing this file often.
- `README.md` contains the instructions for the current level.

Go ahead and open `README.md` to find the instructions for the first level.
