# @warriorjs/geography

> WarriorJS directioning.

## Install

```sh
npm install @warriorjs/geography
```

## Usage

```js
import { FORWARD, getAbsoluteDirection } from '@warriorjs/geography');
```

## Top Level Exports

All methods in the API Reference below, plus the following constants:

### `NORTH` _(string)_

A constant representing absolute direction north.

### `EAST` _(string)_

A constant representing absolute direction east.

### `SOUTH` _(string)_

A constant representing absolute direction south.

### `WEST` _(string)_

A constant representing absolute direction west.

### `ABSOLUTE_DIRECTIONS` _(string[])_

The absolute directions in clockwise order.

### `FORWARD` _(string)_

A constant representing relative direction forward.

### `RIGHT` _(string)_

A constant representing relative direction right.

### `BACKWARD` _(string)_

A constant representing relative direction backward.

### `LEFT` _(string)_

A constant representing relative direction left.

### `RELATIVE_DIRECTIONS` _(string[])_

The relative directions in clockwise order.

## API Reference

### `getAbsoluteDirection(direction: string, referenceDirection: string)`

Returns the absolute direction for a given direction, with reference to another
direction (reference direction).

### `getAbsoluteOffset(relativeOffset: number[], referenceDirection: string)`

Returns the absolute offset for a given relative offset with reference to a
given direction (reference direction).

### `getDirectionOfLocation(location: number[], referenceLocation: number[])`

Returns the direction of a location from another location (reference location).

### `getDistanceOfLocation(location: number[], referenceLocation: number[])`

Returns the Manhattan distance of a location from another location (reference
location).

### `getRelativeDirection(direction: string, referenceDirection: string)`

Returns the relative direction for a given direction, with reference to a
another direction (reference direction).

### `getRelativeOffset(location: number[], referenceLocation: number[], referenceDirection: string)`

Returns the relative offset for a given location, with reference to another
location (reference location) and direction (reference direction).

### `rotateRelativeOffset(offset: number[], direction: string)`

Rotates the given relative offset in the given direction.

### `translateLocation(location: number[], offset: number[])`

Translates the given location by a given offset.

### `verifyAbsoluteDirection(direction: string)`

Checks if the given direction is a valid absolute direction.

### `verifyRelativeDirection(direction: string)`

Checks if the given direction is a valid relative direction.
