---
id: warrior-api
title: Warrior API
---

The `playTurn` method in `Player.js` gets passed an instance of your warrior.
The methods you can call on that instance are determined by the abilities your
warrior has available in that level. See the README in your profile's directory
to find that out.

Here is an example extracted from the README of the second level in the beginner
tower:

```markdown
### Abilities

#### Actions

* `warrior.attack()`: ...
* `warrior.walk()`: ...

#### Senses

* `warrior.feel()`: ...
```

In this case, you can call these three methods on your warrior:
`warrior.attack()`, `warrior.walk()`, and `warrior.feel()`.

> Many abilities can be performed in the following directions: forward,
> backward, left, and right. You have to pass a string with the direction as the
> first argument, e.g. `warrior.walk('backward')`.
