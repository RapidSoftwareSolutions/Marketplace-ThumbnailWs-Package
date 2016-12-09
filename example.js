const fs = require('fs');
const RapidAPI = require('rapidapi-connect');
const rapid = new RapidAPI("Yo", "bea5ff69-5748-43dc-bf04-05ffc3842e3c");
const request = require('request');

let req = request('https://api.thumbnail.ws/api/abefacabbcd43c76555e37ad5b923fd6c771ca336b21/thumbnail/get?url=https://rapidapi.com&width=32')
.pipe(fs.createWriteStream('doodle.png'));

req.on('finish', () => {
	let test = fs.readFileSync('doodle.png');
	console.log(test.toString('base64'));
})

/*rapid.call('ThumbnailWs', 'createThumbnail', { 
    'apiKey': 'abefacabbcd43c76555e37ad5b923fd6c771ca336b21',
    'url':    'https://rapidapi.com',
    'width':  32 
}).on('success', (result) => {
    fs.writeFile('rapid_screenshot.png', result.base64, 'base64', function (err) {
        if (err) throw err;

        console.log('Success!')
    });
}).on('error', (err) => {
    throw err;
});*/