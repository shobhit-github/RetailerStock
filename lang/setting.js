


/*      Dependencies
 ---------------------------------------------*/

const en = require(LNG_ROOT+'en');



/**
 |======================================================================================
 |    Language Manager Module
 |======================================================================================
 */



var languageSetter = function (lang) {

    switch (lang) {
        case 'en': return en; break;

        default:
            console.error("INVALID LANGUAGE"); break;
    }

};


module.exports = languageSetter;