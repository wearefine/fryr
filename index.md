---
layout: default
---

Fryr is the fry cook you never knew you needed to turn that ugly, frozen hash into pretty, delectably digestable params. Not only does it make params accessible for use on the client-side, it also adds, removes, and updates them.

```javascript
// ...com/#?tankhood=gill,deb,bloat

var fry = new Fryr(callback);
fry.params;
// => { 'tankhood' : 'gill,deb,bloat' }

fry.update('tankhood', 'nemo');
// => ...com/#?tankhood=gill,deb,bloat,nemo
```

## Quick Start

1. `//= require fryr`
1. Call `new Fryr` with a callback function
1. PROFIT BYAH

## Initialization

| Arg | Type | Default | Description |
|---|---|---|---|
| `hashChangeCallback` | function | | Called on every hashchange (first argument is the updated params) |
| `defaults` | object | `{}` | Key/value pairs for values that should be added on init. Pass `{}` to skip to next argument |
| `call_on_init` | boolean | `true` | Execute callback on initialization. Always true if defaults is supplied |

The `hashChangeCallback` executes everytime the hash is changed. Commonly, this function updates the view and regenerates filtered items, uncommonly, it is used to print frustrated messages to the console, and very rarely it is used to sort the recyclables. It accepts one argument - the new params (as an object) that have been parsed.

**Example**

```javascript
function myFilteringCallbackFunction(params) {
  console.table(params);
};
var fry = new Fryr(myFilteringCallbackFunction);
```

## Functions


### `.update`

| Arg | Type | Default | Description |
|---|---|---|---|
| `key` | string |  | param key to query against |
| `value` | mixed |  | value for param key |
| `key_is_required` | boolean | `false` | if the key is not required, it will be removed from the hash |

The meat and potatoes of Fryr, this modifies the hash to your explicit purposes.

#### Examples

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

### `.append`

| Arg | Type | Default | Description |
|---|---|---|---|
| `key` | string |  | param key to query against |
| `value` | mixed |  | value for param key |

Near identical to `.update`, this function is designed to add values as a list and not be a uniform replace-value.

#### Example

```javascript
// /#?character=marlin
fry.append('character', 'nemo');
// => /#?character=marlin,nemo
```

### `.param`

| Arg | Type | Description |
|---|---|---|
| `key` | string | the param to query |

Query a key in the hash directly, and don't even bother re-parsing it. In just about every instance, accessing `.params.<key>` **is the better decision here**. Returns string.

#### Example

```javascript
// #?can_speak_whale=dory
fry.param('can_speak_whale')
// => 'dory'
```

### `.paramPresent`

| Arg | Type | Description |
|---|---|---|
| `key` | string | the param to query |

Determine if a param exists or has a blank value.

#### Examples

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

### `.parse`

Update Fryr's `Fryr.params` object with a fresh batch of updated key/values. This occurs on every `hashChange` event anyway, but sometimes you just want to be *that guy*. Returns object.

### `.convert`

Turn a JSON object into a string. Returns a string (without leading `#`) or false if the param is not an object or a string.

| Arg | Type | Description |
|---|---|---|
| `obj` | object OR string | object to convert |

#### Example

```javascript
var obj = { 'support_group' : ['bruce', 'anchor', 'chum'], 'location' : 'submarine' };

fry.convert(obj);
// => '?support_group=bruce,anchor,chum&location=submarine'
```

### `.merge`

Wipe out or selectively replace keys and values. Returns a string but also updates the hash.


| Arg | Type | Default | Description |
|---|---|---|---|
| `obj` | object OR string |  | query to replace |
| `replace_all` | boolean | `false` | blast existing params away or replace only changed keys

#### Examples

```javascript
// /#?destination=sydney&directions=over_the_trench

var obj = { 'directions' : 'through_the_trench' };
fry.merge(obj);
// => /#?destination=sydney&directions=through_the_trench
```

**With `replace_all`**

```javascript
// /#?destination=sydney

var obj = { 'directions' : 'through_the_trench' };
fry.merge(obj, true);
// => /#?directions=through_the_trench
```

### `.destroy`

Destroy current initialization, unbind `hashchange` listener, and reset the hash to an empty state.

| Arg | Type | Default | Description |
|---|---|---|---|
| `retain_hash` | boolean | `false` | preserve hash state |

#### Examples

```javascript
// /#?destination=sydney&directions=over_the_trench

fry.destroy();
// => /

// /#?destination=sydney&directions=over_the_trench

fry.destroy(true);
// => /#?destination=sydney&directions=over_the_trench
```

## Access

### `.params`

Grab the key/value hash of the parsed version of `window.location.hash`. Returns object.
