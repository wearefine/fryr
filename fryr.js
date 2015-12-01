/* Version 1.0.1 */

'use strict';

/**
 * The Fryr global initialization
 * @class
 */
function Fryr(callback) {
  /** @lends Fryr.prototype */
  return this.init(callback);
}

(function () {

  /**
   * Delete value based on key
   * @private
   * @param {String} key - Param to target
   * @param {String|Number} value - Value to delete from param
   */
  var removeValue = function(key, value) {
    var hash = window.location.hash;
    // check for key, anything between key and value, the value itself, and optionally the trailing comma
    var regex_for_value = new RegExp('(' + key + '=.*)(' + value + '\,?)');
    // results come back [<search through value>, <search before value>, <value>]
    var regex_match = hash.match(regex_for_value);
    // replace <search through value> with everything before <value>
    // Key is included in search in case multiple keys have the same value
    hash = hash.replace(regex_match[0], regex_match[1]);

    // Remove trailing commas
    hash = hash.replace(/\,\&/g, '&');
    hash = hash.replace(/\,$/, '');
    hash = hash.replace(/\=\,/g, '=');

    window.location.hash = hash;
  };

  /**
   * Add value based on key
   * @private
   * @param {String} key - Param to target
   * @param {String|Number} value - Value to add to param
   * @param {Boolean} should_replace_value - if false, value will be appended to the param
   */
  var addValue = function(key, value, should_replace_value) {
    var hash = window.location.hash;

    var old_value = param(key);
    var new_value;

    // If it's blank or is the value of the next param
    if(old_value.charAt(0) === '&' || old_value === '') {
      old_value = key + '=';
      new_value = old_value + value;

    } else {
      old_value = key + '=' + old_value;

      // If the value of the param should be replaced, don't append it to the existing value
      new_value = should_replace_value ? (key + '=' + value) : (old_value + ',' + value);
    }

    hash = hash.replace(old_value, new_value);

    window.location.hash = hash;
  };

  /**
   * Remove key from hash. Key's value must be removed prior to executing this function
   * @private
   * @param {String} key - Key to search and destroy
   */
  var removeKey = function(key) {
    var hash = window.location.hash;
    var key_search = new RegExp('[?&]' + key + '=', 'g');

    hash = hash.replace(key_search, '');
    // if initial key removed, replace ampersand with question
    hash = hash.replace('#&', '#?');

    window.location.hash = hash;
  };

  /**
   * @private
   * @see {@link Fryr#param documentation in the public `param` function}
   */
  var param = function(key) {
    if(!window.location.hash) {
      return '';
    }
    var hash = window.location.hash;
    var search = new RegExp('#.*[?&]' + key + '=([^&]+)(&|$)');
    var key_value = hash.match(search);

    return (key_value ? key_value[1] : '');
  };

  /**
   * Apply value to variable if it has none
   * @private
   * @param {*} variable Variable to set default to
   * @param {*} value - Default value to attribute to variable
   * @return {*} Existing value or passed value argument
   */
  var setDefault = function(variable, value){
    return (typeof variable === 'undefined') ? value : variable;
  };

  /**
   * Remove key/value if present in hash; add key/value if not present in hash
   * @private
   * @param {String} key - Param key to query against
   * @param {String|Number} value - Value for param key
   * @param {Boolean} key_is_required - If the key is not required, it will be removed from the hash
   * @param {Boolean} should_replace_value - If false, value will be appended to the key
   * @see {@link Fryr#update}
   * @see {@link Fryr#append}
   */
  var update = function(key, value, key_is_required, should_replace_value) {
    var hash = window.location.hash;

    // Ensure key exists in the hash
    if(hash.indexOf(key) !== -1) {
      var key_value = param(key);

      var regex_for_value = new RegExp(value, 'g');

      // If key_value contains the new value
      if(regex_for_value.test(key_value)) {

        // If key is required, swap it out
        if(key_is_required) {
          addValue(key, value, should_replace_value);

        } else {

          // If the value is blank, remove the original value from the key
          if(value === '') {
            removeValue(key, key_value);

          // Otherwise remove the vanilla value
          } else {
            removeValue(key, value);

          }

          // If key's value is blank, remove it from hash
          if(param(key) === '') {
            removeKey(key);
          }

        }

      // key_value does not contain the new value
      } else {
        addValue(key, value, should_replace_value);

      }

    // Add key if it doesn't exist
    } else {

      if(window.location.hash) {
        window.location.hash += '&' + key + '=' + value;
      } else {
        // Use a question mark if first key
        window.location.hash = '?' + key + '=' + value;
      }

    }

  };


  Fryr.prototype = {

    /**
     * Very important object holder
     * @type {Object}
     */
    params: {},

    /**
     * Call once to initialize filtering
     * @param {Function} hashChangeCallback - Called on every hashchange (first argument is the updated params)
     * @return {Object} Fryr
     */
    init: function(hashChangeCallback) {
      var _this = this;

      var privateHashChange = function() {
        var params = _this.parse();
        hashChangeCallback.call(this, params);
      };

      window.onhashchange = privateHashChange;

      privateHashChange();

      return this;
    },

    /**
     * Replace key/value if present in hash; add key/value if not present in hash
     * @param {String} key - Param key to query against
     * @param {String|Number} value - Value for param key
     * @param {Boolean} [key_is_required=false] - if the key is not required, it will be removed from the hash
     * @see {@link Fryr#append}
     */
    update: function(key, value, key_is_required) {
      key_is_required = setDefault(key_is_required, false);
      update(key, value, key_is_required, true);
    },

    /**
     * Add value to key's value in a comma-delineated list if it's not present in hash
     * @param {String} key - Param key to query against
     * @param {String|Number} value - Value for param key
     * @see {@link Fryr#update}
     */
    append: function(key, value) {
      update(key, value, false, false);
    },

    /**
     * Evaluate the hash
     * @return {Object} Key/value hash of the hash broken down by params
     */
    parse: function() {
      var hash = window.location.hash;
      var params;

      // clear zombie keys and values
      this.params = {};

      if(window.location.hash && /\?/g.test(hash)) {
        params = hash.split('?')[1];
        params = params.split('&');

        // Separate params into key values
        for(var i = 0; i < params.length; i++) {
          var key_value = params[i].split('=');
          var key = key_value[0];
          var value = key_value[1];

          this.params[key] = value;
        }
      }

      return this.params;
    },

    /**
     * Change a JSON object into a string for the hash
     * @param {Object|String} obj - object to convert
     * @return {String|Boolean} For use in window.location.hash. Returns false if param is not object or string
     */
    convert: function(obj) {
      if( obj.constructor === String ) {
        obj = JSON.parse(obj);
      }

      // Escape if we're not dealing with an object
      if( obj.constructor !== Object ) {
        return false;
      }

      var keys = Object.keys(obj);
      // Set start with a ?
      var new_hash = '?';

      // Loop through all keys in the obj
      for(var i = 0; i < keys.length; i++) {
        var key = keys[i];
        var value = obj[ key ];

        if( value.constructor === Array ) {
          value = value.join(',');
        }

        // On next key, if it isn't the first, precede with an ampersand
        if(new_hash !== '?') {
          new_hash += '&';
        }

        // Append key/value to new_hash
        new_hash += key + '=' + value;
      }

      return new_hash;
    },

    /**
     * Wipe out or selectively replace keys in params
     * @param {Object|String} obj - Query to replace
     * @param {Boolean} [replace_all=false] - Whether or not to blast existing params away or replace only changed keys
     * @return {String} The new hash, but it also updates window.location.hash
     */
    merge: function(obj, replace_all) {
      replace_all = setDefault(replace_all, false);

      // If it's a string, convert to an object
      if( obj.constructor === String ) {
        obj = JSON.parse(obj);
      }

      // Add key values from existing params and put them into the object
      if( !replace_all ) {
        var new_params = this.parse();
        var keys = Object.keys(new_params);

        for(var i = 0; i < keys.length; i++) {
          var key = keys[i];
          var value = new_params[ key ];

          // Only add the key/value IF it doesn't exist already on the object
          if( !obj.hasOwnProperty(key) ) {
            obj[key] = value;
          }
        }
      }

      // Change hash to string; if replace_all is false, original value is used
      var new_hash = this.convert(obj);
      window.location.hash = '#' + new_hash;

      return new_hash;
    },

    /**
     * Retrieve a key's value
     * @param {String} key - Param to target
     * @example
     * window.location.hash = '?color=blue'
     * fryr.param('color') // => 'blue'
     * @return {String} The value of the key
     */
    param: function(key) {
      return param(key);
    },

    /**
     * Determine if param is blank or undefined
     * @param {String} key - Param to target
     * @return {Boolean}
     */
    paramPresent: function(key) {
      var value = this.params[key];
      return (typeof value !== 'undefined' && value !== '');
    },

  };

})();
