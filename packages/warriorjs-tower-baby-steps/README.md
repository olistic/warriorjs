# @warriorjs/tower-baby-steps

> For players new to WarriorJS.

## Install

`@warriorjs/cli` already ships with `@warriorjs/tower-baby-steps` built-in.

If you still want to install it:

```sh
npm install @warriorjs/tower-baby-steps
```

## Usage

```sh
warriorjs
```

For more in depth documentation see: https://warrior.js.org/docs/player/towers.

## Levels

### Level 3: Healing Intro

_You sense a larger sludge ahead, but you feel a bit weaker than usual._

> **TIP:** You must heal between battles! Use `warrior.health()` to check your
> health and `warrior.rest()` to regain health before fighting the second
> sludge.

#### Floor Map

```
╔══════╗
║@ s s>║
╚══════╝

@ = Warrior (10 HP)
s = Sludge (12 HP)
> = stairs
```

#### Abilities

- `warrior.health()`: Returns your current health.
- `warrior.rest()`: Regain 10% of max health (2 HP per rest).
- `warrior.walk()`: Move forward.
- `warrior.attack()`: Attack a unit in front.

_All subsequent levels are shifted up by one (old Level 3 → 4, etc.) to maintain
progression._
