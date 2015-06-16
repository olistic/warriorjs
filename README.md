![banner](https://s3.amazonaws.com/f.cl.ly/items/2z1v1z1v0i1j0y192k30/WarriorJS%20Banner.png)

[![Build Status](https://travis-ci.org/olistic/warriorjs.svg?branch=master)](https://travis-ci.org/olistic/warriorjs)
[![npm version](https://badge.fury.io/js/warriorjs.svg)](http://badge.fury.io/js/warriorjs)
[![Join the chat at https://gitter.im/olistic/warriorjs](https://badges.gitter.im/Join%20Chat.svg)](https://gitter.im/olistic/warriorjs?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)

This is a game designed to teach JavaScript and artificial intelligence in a fun, interactive way.

You play as a warrior climbing a tall tower to rescue the princess at the top level. On each floor, you need to write JavaScript (with full ES6 support) to instruct the warrior to battle enemies, rescue captives, and reach the stairs.


NOTE: Watch the repo or check `npm outdated -g warriorjs` regularly to find out about new levels and abilities.

## Installation

```bash
$ npm install -g warriorjs
```

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

Once you are done editing Player.js, save the file and run the `warriorjs` command again to start playing the level. The play happens through a series of turns. On each one, your `playTurn` method is called along with any enemy's.

You cannot change your code in the middle of a level. You must take into account everything that may happen on that level and give your warrior the proper instructions from the start.

Losing all of your health will cause you to fail the level. You are not punished by this, you simply need to go back to your Player.js file, improve your code, and try again.

Once you pass a level (by reaching the stairs), the profile README will be updated for the next level. Alter the Player.js file and run `warriorjs` again to play the next level.

## Epic mode

Once you reach the top of the tower, you will enter epic mode. When running `warriorjs` again, it will run your current Player.js through all levels in the tower without stopping.

Your warrior will most likely not succeed the first time around, so use the -l option on levels you are having difficulty or want to fine-tune the scoring.

```bash
$ warriorjs -l 4
```

Once your warrior reaches the top again, you will receive an average grade, along with a grade for each level. The grades from best to worst are S, A, B, C, D and F. Try to get S on each level for the ultimate score!

## Credits

This game was originally developed by @ryanb to teach the Ruby language. Special thanks to him for the original [ruby-warrior](https://github.com/ryanb/ruby-warrior).

Thanks to @guillecura for the awesome logo idea and for carrying it out.








