# <p align="center"><a href="http://warrior.js.org"><img src="https://raw.githubusercontent.com/warriorjs/warriorjs-core/c130b2ea5b3877bacc82a99ad911c22f5d428fad/logo/logo-dark.png" height="260px"></a></p>

This is a game designed to teach JavaScript and artificial intelligence in a fun, interactive way.

You play as a warrior climbing a tall tower to `[insert something motivating here]` at the top level. On each floor, you need to write JavaScript to instruct the warrior to battle enemies, rescue captives, and reach the stairs.

[![Travis](https://img.shields.io/travis/olistic/warriorjs.svg?style=flat-square)](https://travis-ci.org/olistic/warriorjs)
[![npm](https://img.shields.io/npm/v/warriorjs.svg?style=flat-square)](https://www.npmjs.com/package/warriorjs)
[![styled with prettier](https://img.shields.io/badge/styled_with-prettier-ff69b4.svg?style=flat-square)](https://github.com/prettier/prettier)
[![Gitter](https://img.shields.io/gitter/room/olistic/warriorjs.svg?style=flat-square)](https://gitter.im/olistic/warriorjs)

## Installation

```bash
$ npm install -g warriorjs
```

> **Note on Installation**

> Node.js needs to be installed in your computer before running the `npm` command. The recommended installation method is through the [official installer](https://nodejs.org).

## Usage

```bash
$ warriorjs
```

That's it! This will create a warriorjs directory in your current location, where you will find a Player.js file in your profile's directory containing the Player class:

```javascript
class Player {
  playTurn(warrior) {
    // Cool code goes here
  }
}
```

> **Note on CLI**

> Run `$ warriorjs --help` to see the options you can use to customize the game.

## Objective

Your objective is to fill the `playTurn` method with commands to instruct the warrior what to do. With each level, your abilities will grow along with the difficulty. See the README in your profile's directory for details on what abilities your warrior has available on the current level.

Here is a simple example which will instruct the warrior to attack if he feels an enemy, otherwise he will walk forward:

```javascript
class Player {
  playTurn(warrior) {
    if (warrior.feel().isEnemy()) {
      warrior.attack();
    } else {
      warrior.walk();
    }
  }
}
```

## Playing

Once you are done editing Player.js, save the file and run the `warriorjs` command again to start playing the level. The play happens through a series of turns. On each one, your `playTurn` method is called along with any enemy's.

You cannot change your code in the middle of a level. You must take into account everything that may happen on that level and give your warrior the proper instructions from the start.

Losing all of your health will cause you to fail the level. You are not punished by this, you simply need to go back to your Player.js file, improve your code, and try again.

Once you pass a level (by reaching the stairs), the profile README will be updated for the next level. Alter the Player.js file and run `warriorjs` again to play the next level.

## Scoring

Your objective is to not only reach the stairs, but to get the highest score you can. There are many ways you can earn points on a level.

* defeat an enemy to add his max health to your score

* rescue a captive to earn 20 points

* pass the level within the bonus time to earn the amount of bonus time remaining

* defeat all enemies and rescue all captives to receive a 20% overall bonus

A total score is kept as you progress through the levels. When you pass a level, that score is added to your total.

## Perspective

Even though this is a text-based game, think of it as two-dimensional where you are viewing from overhead. Each level is always rectangular in shape and is made up of a number of squares. Only one unit can be on a given square at a time, and your objective is to find the square with the stairs. Here is an example level map and key:

```
╔════╗
║C s>║
║ S s║
║C @ ║
╚════╝

> = Stairs
@ = Warrior (20 HP)
s = Sludge (12 HP)
S = Thick Sludge (24 HP)
C = Captive (1 HP)
```

## Abilities

When you first start, your warrior will only have a few abilities, but with each level your abilities will grow. A warrior has two kinds of abilities: [Actions](#actions) and [Senses](#senses).

> **Note on Abilities**

> Many abilities can be performed in the following directions: forward, backward, left and right. You have to pass a string with the direction as the first argument, e.g. `warrior.walk('backward');`.

### Actions

An *action* is something that affects the game in some way. **Only one action can be performed per turn**, so choose wisely.

Here is the complete list of actions:

#### `warrior.walk([direction])`:

Move in given direction (forward by default).

#### `warrior.attack([direction])`:

Attack a unit in given direction (forward by default).

#### `warrior.rest()`:

Gain 10% of max health back, but do nothing more.

#### `warrior.rescue([direction])`:

Rescue a captive from his chains (earning 20 points) in given direction (forward by default).

#### `warrior.pivot([direction])`:

Rotate left, right or backward (default).

#### `warrior.shoot([direction])`:

Shoot your bow & arrow in given direction (forward by default).

#### `warrior.bind([direction])`:

Bind a unit in given direction to keep him from moving (forward by default).

#### `warrior.detonate([direction])`:

Detonate a bomb in a given direction (forward by default) which damages that space and surrounding 4 spaces (including yourself).

#### `warrior.explode()`:

Kills you and all surrounding units. You probably don't want to do this intentionally.

### Senses

A *sense* is something which gathers information about the floor. You can perform senses as often as you want per turn to gather information about your surroundings and to aid you in choosing the proper action.

Here is the complete list of senses:

#### `warrior.feel([direction])`:

Return a [Space](#spaces) for the given direction (forward by default).

#### `warrior.health()`:

Return an integer representing your current health.

#### `warrior.look([direction])`:

Return an array of up to three [Spaces](#spaces) in the given direction (forward by default).

#### `warrior.directionOfStairs()`:

Return the direction the stairs are from your location.

#### `warrior.directionOf(space)`:

Pass a [Space](#spaces) as an argument, and the direction to that space will be returned.

#### `warrior.distanceOf(space)`:

Pass a [Space](#spaces) as an argument, and it will return an integer representing the distance to that space.

#### `warrior.listen()`:

Return an array of all spaces which have units in them.

> **Note on Senses**

> Since what you sense will change each turn, you should record what information you gather for use on the next turn. For example, you can determine if you are being attacked if your health has gone down since the last turn.

## Spaces

A *space* is an object representing a square in the level. Whenever you sense an area, often one or multiple spaces (in an array) will be returned.

You can call methods on a space to gather information about what is there. Here are the various methods that are available to you:

#### `space.isEmpty()`:

If `true`, this means that nothing (except maybe stairs) is at this location and you can walk here.

#### `space.isStairs()`:

Determine if stairs are at that location.

#### `space.isEnemy()`:

Determine if an enemy unit is at this location.

#### `space.isCaptive()`:

Determine if a captive is at this location.

#### `space.isWall()`:

Return `true` if this is the edge of the level. You can't walk here.

#### `space.isTicking()`:

Return `true` if this space contains a bomb which will explode in time.

> **Note on Spaces**

> You will often call these methods directly after a sense. For example, the `feel` sense returns one `Space`. You can call `isCaptive()` on this to determine if a captive is in front of you:

> `warrior.feel().isCaptive();`

## Epic mode

Once you reach the top of the tower, you will enter Epic mode. When running `warriorjs` again, it will run your current Player.js through all levels in the tower without stopping.

Your warrior will most likely not succeed the first time around, so use the -l option on levels you are having difficulty or want to fine-tune the scoring.

```bash
$ warriorjs -l 4
```

Once your warrior reaches the top again, you will receive an average grade, along with a grade for each level. The grades from best to worst are S, A, B, C, D and F. Try to get S on each level for the ultimate score!

## Tips & hints

### General

* If you ever get stuck on a level, review the README documentation and be sure you're trying each ability out. If you can't keep your health up, be sure to rest when no enemy is around (while keeping an eye on your health). Also, try to use far-ranged weapons whenever possible (such as the bow).

* Remember, you're working in JavaScript here. Don't simply fill up the `playTurn` method with a lot of code. Organize it with methods and classes.

* Senses are cheap, so use them liberally. Store the sensed information to help you better determine what actions to take in the future.

* Running `warriorjs` while you are in your profile directory will auto-select that profile so you don't have to each time.

* If you're aiming for points, remember to sweep the area. Even if you're close to the stairs, don't go in until you've gotten everything (if you have the health). Use far-ranged senses (such as look and listen) to determine if there are any enemies left.

### ES2015+

* If you want some code to be executed at the beginning of each level, define a [constructor](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes/constructor) in the `Player` class, like this:

```javascript
class Player {
  constructor() {
    // This code will be executed only once, at the beginning of the level
    this._health = 20;
  }

  playTurn(warrior) {
    // Cool code goes here
  }
}
```

* If you just want to initialize a property, like `_health` in the example above, you can make use of [Class Instance Fields](https://github.com/jeffmo/es-class-fields-and-static-properties#part-1-class-instance-fields):

```javascript
class Player {
  _health = 20;

  playTurn(warrior) {
    // Cool code goes here
  }
}
```

* Some senses (like look and listen) return an array of spaces, so you might find many of the [Array prototype methods](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/prototype#Methods) really useful. Here is an example of the [Array.prototype.find](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/find) method:

```javascript
isEnemyInSight(warrior) {
  const unit = warrior.look().find(space => !space.isEmpty());
  return unit && unit.isEnemy();
}
```

* In the example above, you can see the [Arrow functions](https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Functions/Arrow_functions) in use. Make sure to take a look at them too!

## Credits

This game was originally developed by [@ryanb](https://github.com/ryanb) to teach the Ruby language. Special thanks to him for the original [ruby-warrior](https://github.com/ryanb/ruby-warrior).

## License

MIT
