# Grinder

Filter out your hash!

## Quick Start

1. `//= require grinder`
2. Call `Grinder.init(myFilteringCallback)` where `myFilteringCallback` is a function that looks like

```javascript
function myFilteringCallback(params) {
  console.table(params);
};
```
3. PROFIT BYAH

## Functions

### `init`

| Arg | Type |
|---|---|
| `hashChangeCallback` | function |

The `hashChangeCallback` executes everytime the hash is changed. Commonly, this function updates the view and regenerates filtered items, uncommonly, it is used to print frustrated messages to the console, and very rarely it is used to sort the recyclables. It accepts one argument - the new params that have been parsed.

### `update`

| Arg | Type | Description |
|---|---|---|
| `key` | string | param key to query against |
| `value` | mixed | value for param key |
| `key_is_required` | boolean | if the key is not required, it will be removed from the hash (defaults to false) |
| `should_replace_value` | boolean | if false, value will be appended to the key (defaults to false) |

The Read/Write meat and potatoes of Grinder, this modifies the hash to your explicit purposes.

### `param`

| Arg | Type | Description |
|---|---|---|
| `key` | string | the param to query |

Query a key in the hash directly, and don't even bother re-parsing it. In just about every instance, accessing `Grinder.params.key` **is the better decision here**.

**Example**

```javascript
// window.location.hash is '?color=blue'
Grinder.param('color') // => 'blue'
```

### `parse`

Update Grinder's `Grinder.params` object with a fresh batch of updated key/values. This occurs on every `hashChange` event anyway, but sometimes you just want to be *that guy*.
