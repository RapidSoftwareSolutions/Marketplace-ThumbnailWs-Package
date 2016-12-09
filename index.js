'use strict';
global.PACKAGE_NAME = "ThumbnailWs";

global.ValidationError = function(fields) {
    this.text   = 'Please, check and fill in required fields';
    this.fields = fields || [];
}

ValidationError.prototype = Object.create(Error.prototype);
ValidationError.prototype.constructor = ValidationError;

const express       = require('express');
const bodyParser    = require('body-parser');
const API           = require('rapi-js-package');
const lib           = require('./lib/functions.js');
const _             = lib.callback;

const PORT          = process.env.PORT || 8080;
const app           = express();

const argMap = {
    "credentials|apiKey": "$!apiKey",
    "String|url":         "$url",
    "String|width":       "$width",
    "Number|delay":       "delay",
    "Bool|fullpage":      "fullpage",
    "Bool|mobile":        "mobile",
    "String|format":      "format",
    "Bool|refresh":       "refresh"
}

app.use(bodyParser.json(({limit: '50mb'})));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));
app.all(`/api/${PACKAGE_NAME}`, require('./metadata.js').do);

app.post(`/api/${PACKAGE_NAME}/createThumbnail`, _(function* (req, res) {
    let r  = {
        callback     : "",
        contextWrites: {}
    };

    let response,
        key     = req.body.args.apiKey,
        options = {},
        opts    = {};

    try {
        for(let arg in argMap) {
            let argarr      = arg.split('|');
            opts[argMap[arg] + '|' + argarr[0]] = req.body.args[argarr[1]];
        }

        options.method    = 'POST';
        options.query     = opts;
        //options.debug     = true;

        response              = yield new API(`https://api.thumbnail.ws/api/${key}/thumbnail/get`).request(options);
        r.callback            = 'success';
        r.contextWrites['to'] = {
            status: 'success',
            base64: new Buffer(response, 'binary').toString('base64')
        };
    } catch(e) {
        r.callback            = 'error';
        r.contextWrites['to'] = e.status_code ? e : {
            status_code: 'API_ERROR',
            status_msg:  e.message ? e.message : e
        };
    }

    res.status(200).send(r);
}));

app.listen(PORT);
module.exports = app;