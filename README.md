# Grinder

Filter out your hash!

## Quick Start

1. `//= require grinder`
1. Call `new Grinder` with a callback function
1. PROFIT BYAH

## Initialization

| Arg | Type |
|---|---|
| `hashChangeCallback` | function |

The `hashChangeCallback` executes everytime the hash is changed. Commonly, this function updates the view and regenerates filtered items, uncommonly, it is used to print frustrated messages to the console, and very rarely it is used to sort the recyclables. It accepts one argument - the new params that have been parsed.

**Example**

```javascript
function myFilteringCallbackFunction(params) {
  console.table(params);
};
var grind = new Grinder(myFilteringCallbackFunction);
```

## Functions


### `.update`

| Arg | Type | Default | Description |
|---|---|---|---|
| `key` | string | <required> | param key to query against |
| `value` | mixed | <required> | value for param key |
| `key_is_required` | boolean | false | if the key is not required, it will be removed from the hash |
| `should_replace_value` | boolean | false | if false, value will be appended to the key |

The Read/Write meat and potatoes of Grinder, this modifies the hash to your explicit purposes.

### `.param`

| Arg | Type | Description |
|---|---|---|
| `key` | string | the param to query |

Query a key in the hash directly, and don't even bother re-parsing it. In just about every instance, accessing `.params.<key>` **is the better decision here**.

**Example**

```javascript
// window.location.hash is '?color=blue'
grinder.param('color') // => 'blue'
```

### `.paramPresent`

| Arg | Type | Description |
|---|---|---|
| `key` | string | the param to query |

Determine if a param exists or has a blank value.

**Example**

```javascript
// window.location.hash is '?color=blue'
grind.paramPresent('color') // => true

// window.location.hash is '?color='
grind.paramPresent('color') // => false

// window.location.hash is '?animal=bird'
grind.paramPresent('color') // => false
```

### `.parse`

Update Grinder's `Grinder.params` object with a fresh batch of updated key/values. This occurs on every `hashChange` event anyway, but sometimes you just want to be *that guy*.

## Access

### `.params`

Grab the key/value hash of the parsed version of `window.location.hash`.
