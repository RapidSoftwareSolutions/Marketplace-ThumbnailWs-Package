const Q    = require('q');
const fs   = require('fs');
const path = require('path');

module.exports.callback = (gen) => {
    return function() {
        return Q.async(gen).apply(null, arguments).done();
    };
}