# Fryr

Fryr is the fry cook you never knew you needed to turn that ugly frozen hash into pretty, delectable params. Not only does it make accessible params to use on the client-side, it also adds, removes, and updates them.

```javascript
// http://psherman.com/#?tankhood=gill,deb,bloat
fry.params;
// => { 'tankhood' => 'gill,deb,bloat' }

fry.update('tankhood', 'nemo');
// => 'http://psherman.com/#?tankhood=gill,deb,bloat,nemo'
```

*Examples shown after initiliazation

# Quick Start

1. `//= require fryr`
1. Call `new Fryr` with a callback function
1. PROFIT BYAH

# Initialization

| Arg | Type |
|---|---|
| `hashChangeCallback` | function |

The `hashChangeCallback` executes everytime the hash is changed. Commonly, this function updates the view and regenerates filtered items, uncommonly, it is used to print frustrated messages to the console, and very rarely it is used to sort the recyclables. It accepts one argument - the new params that have been parsed.

**Example**

```javascript
function myFilteringCallbackFunction(params) {
  console.table(params);
};
var fry = new Fryr(myFilteringCallbackFunction);
```

# Functions

## `.update`

| Arg | Type | Default | Description |
|---|---|---|---|
| `key` | string |  | param key to query against |
| `value` | mixed |  | value for param key |
| `key_is_required` | boolean | `false` | if the key is not required, it will be removed from the hash |
| `should_replace_value` | boolean | `false` | if false, value will be appended to the key |

The meat and potatoes of Fryr, this modifies the hash to your explicit purposes.

### Examples

**Add a key**

```javascript
fry.update('character', 'marlin');
// => ...com/#?character=marlin
```

**Add a different key**

```javascript
// /#?character=marlin
fry.update('home', 'reef');
// => /#?character=marlin&home=reef
```

**Append value to key**

```javascript
// /#?character=marlin
fry.update('character', 'nemo');
// => /#?character=marlin,nemo
```

**Replace key's value**

```javascript
// /#?character=marlin
fry.update('character', 'nemo', false, true);
// => /#?character=nemo
```

**Remove key**

```javascript
// /#?character=marlin
fry.update('character', '');
// => /#
```

**Remove value but keep key**

```javascript
// /#?character=marlin
fry.update('character', '', true);
// => /#?character=
```

## `.param`

| Arg | Type | Description |
|---|---|---|
| `key` | string | the param to query |

Query a key in the hash directly, and don't even bother re-parsing it. In just about every instance, accessing `.params.<key>` **is the better decision here**. Returns string.

### Example

```javascript
// #?can_speak_whale=dory
fry.param('can_speak_whale')
// => 'dory'
```

## `.paramPresent`

| Arg | Type | Description |
|---|---|---|
| `key` | string | the param to query |

Determine if a param exists or has a blank value.

### Examples

```javascript
// #?boat=touched
fry.paramPresent('boat');
// => true

// #?boat=
fry.paramPresent('boat');
// => false

// #?bomb=touched
fry.paramPresent('boat');
// => false
```

## `.parse`

Update Fryr's `Fryr.params` object with a fresh batch of updated key/values. This occurs on every `hashChange` event anyway, but sometimes you just want to be *that guy*. Returns object.

## `.convert`

Turn a JSON object into a string. Returns a string (without leading `#`) or false if the param is not an object or a string.

| Arg | Type | Description |
|---|---|---|
| `obj` | object OR string | object to convert |

### Example

```javascript
var obj = { 'support_group' : ['bruce', 'anchor', 'chum'], 'location' : 'submarine' };

fry.convert(obj);
// => '?support_group=bruce,anchor,chum&location=submarine
```

## `.merge`

Wipe out or selectively replace keys and values. Returns a string but also updates the hash.


| Arg | Type | Default | Description |
|---|---|---|---|
| `obj` | object OR string |  | query to replace |
| `replace_all` | boolean | `false` | blast existing params away or replace only changed keys

### Examples

```javascript

// http://psherman.com/#?destination=sydney&directions=over_the_trench
var obj = { 'directions' : 'through_the_trench' };
fry.merge(obj);
// => http://psherman.com/#?destination=sydney&directions=through_the_trench
```

**With `replace_all`**

```javascript
// http://psherman.com/#?destination=sydney
var obj = { 'directions' : 'through_the_trench' };
fry.merge(obj, true);
// => http://psherman.com/#?directions=through_the_trench
```

# Access

## `.params`

Grab the key/value hash of the parsed version of `window.location.hash`. Returns object.
