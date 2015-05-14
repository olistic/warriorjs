[![Build Status](https://travis-ci.org/olistic/warriorjs.svg?branch=master)](https://travis-ci.org/olistic/warriorjs)

# WarriorJS

This is a game designed to teach JavaScript and artificial intelligence in a fun, interactive way.

You play as a warrior climbing a tall tower to reach the princess at the top level. On each floor, you need to write JavaScript to instruct the warrior to battle enemies, rescue captives, and reach the stairs. You have some idea of what each floor contains, but you never know for certain what will happen. You must give the Warrior enough artificial intelligence up-front to find his own way.

Information on advanced topics of the game can be found in the [WarriorJS wiki](https://github.com/olistic/warriorjs/wiki).

## Installation

The simplest way to install WarriorJS is to use [NPM](https://www.npmjs.com):

```bash
$ npm install -g warriorjs
```

## Usage

WarriorJS is run from the command line.

```bash
$ warriorjs
```

That's it! This will create a warriorjs directory in your current location, where you will find a Player.js file in your profile's directory containing this:

```javascript
class Player {
  playTurn(warrior) {
    // Cool code goes here
  }
}

global.Player = Player;
```

Your objective is to fill the playTurn method with commands to instruct the warrior what to do. With each level, your abilities will grow along with the difficulty. See the README in your profile's directory for details on what abilities your warrior has available on the current level.

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

global.Player = Player;
```

## Credits

This game was originally developed by Ryan Bates to teach the Ruby language. Special thanks to him for the original [ruby-warrior](https://github.com/ryanb/ruby-warrior).
