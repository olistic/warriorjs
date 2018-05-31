---
id: creating-tower
title: Creating Your Tower
---

A WarriorJS tower is a regular JavaScript module with a single export:

```js
module.exports = {
  // Tower definition.
};
```

Let's define the name of our tower and write a brief description:

```js
module.exports = {
  name: 'Game of Thrones',
  description:
    'There is only one war that matters: the Great War. And it is here.',
};
```

Cool! But there's nothing to climb yet. Let's add some levels to this tower!
