const Q    = require('q');
const fs   = require('fs');
const path = require('path');

module.exports.randomString = () => Math.random().toString(36).substring(7);

module.exports.parseReq = (obj) => {
    let arr = [];
    for(let key in obj)
        if(!obj[key]) arr.push(key);

    return arr;
}

module.exports.clearArgs = function fn(obj, recurse) {
    for (var i in obj) {
        if (obj[i] == undefined || obj[i] == '') {
            delete obj[i];
        } else if (recurse && typeof obj[i] === 'object') {
            if(JSON.stringify(obj[i]) == '{}') {
                delete obj[i];
            }

            fn(obj[i], true);
        }
    }

    return obj;
}