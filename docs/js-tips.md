---
id: js-tips
title: JavaScript Tips
sidebar_label: JavaScript
---

* Don't simply fill up the `playTurn` method with a lot of code, **organize your
  code with methods and classes**. For example:

```js
class Player {
  playTurn(warrior) {
    if (this.isInjured(warrior)) {
      warrior.rest();
    }
  }

  isInjured(warrior) {
    return warrior.health() < 20;
  }
}
```

* If you want some code to be executed at the beginning of each level, **define
  a [constructor][] in the `Player` class**, like this:

```js
class Player {
  constructor() {
    // This code will be executed only once, at the beginning of the level.
    this.health = 20;
  }

  // ...
}
```

* Some senses (like look and listen) return an array of spaces, so **you might
  find many of the [Array prototype methods][] really useful**. Here is an
  example of the [Array.prototype.find][] method:

```js
class Player {
  // ...

  isEnemyInSight(warrior) {
    const spaceWithUnit = warrior.look().find(space => space.isUnit());
    return spaceWithUnit && spaceWithUnit.getUnit().isHostile();
  }
}
```

[constructor]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes/constructor
[array prototype methods]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/prototype#Methods
[array.prototype.find]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/find
