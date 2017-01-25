
"use strict";
/**
 * Storing multiple constant values inside of an object
 * Keep in mind the values in the object mean they can be modified
 * Which makes no sense for a constant, use wisely if you do this
 */


/*    Filter for Sub String functionality
---------------------------------------------*/
app.filter('substr', function() {
    return function(str, value) {
        return str.length > value ? str.substring(0, value) : str;
    };
});
