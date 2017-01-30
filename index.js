'use strict';
global.PACKAGE_NAME = "ThumbnailWs";

const fs            = require('fs');
const Promise       = require('bluebird');
const express       = require('express');
const bodyParser    = require('body-parser');
const lib           = require('./lib/functions.js');
const _request      = require('request');
const _             = Promise.coroutine;

const PORT          = process.env.PORT || 8080;
const app           = express();

const tempFolder    = 'rapid_responses_temp';
const ERR_REQ       = 'REQUIRED_FIELDS';
const ERR_JSON      = 'JSON_VALIDATION';

app.use(bodyParser.json(({limit: '50mb'})));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));
app.all(`/api/${PACKAGE_NAME}`, require('./metadata.js').do);

app.post(`/api/${PACKAGE_NAME}/createThumbnail`, _(function* (req, res) {
    let r  = {
        callback     : "",
        contextWrites: {}
    };

    let {
        url,
        width,
        delay,
        apiKey,
        mobile,
        refresh,
        fullpage,
    } = lib.clearArgs(req.body.args);

    try {
        let requireds = lib.parseReq({ apiKey, url, width });

        if(requireds.length > 0) {
            throw {
                status_code: 'REQUIRED_FIELDS',
                status_msg:  'Please, check and fill in required fields.',
                fields:       requireds
            };
        }

        let response          = yield request(apiKey, {url, width, mobile, refresh, fullpage});
        r.callback            = 'success';
        r.contextWrites['to'] = response;
    } catch(e) {
        r.callback            = 'error';
        r.contextWrites['to'] = {
            status_code: 'API_ERROR',
            status_msg: e
        };
    }

    res.status(200).send(r);
}));

function request(key, options) { 
    let name   = lib.randomString();
    let length = 0;

    return new Promise((resolve, reject) => {
        let thumbStream = _request({
            qs:     options,
            uri:    `https://api.thumbnail.ws/api/${key}/thumbnail/get`,
            method: 'GET'
        }, (err, resp, body) => {
            length = resp.headers['content-length'];

            if(err || resp.statusCode !== 200) reject({
                status_code: 'API_ERROR',
                status_msg:  body || err,
            });
        }).pipe(fs.createWriteStream(name));

        thumbStream.on('finish', () => {
            let image = fs.readFileSync(name);

            let r = _request({
                method: 'POST',
                uri: 'http://104.198.149.144:8080'
            }, (err, resp, body) => {
                if (err) reject(err || JSON.parse(body));

                resolve(JSON.parse(body));
            })
            .form()
            r.append('file', image, {
                filename: options.url + '.jpg',
                contentType: 'image/jpg' 
            })
            r.append('length', length);

            fs.unlink(name, () => {});
        });

        thumbStream.on('error', function(err) {
            reject(err);
        })
    });
}

app.listen(PORT);
module.exports = app;