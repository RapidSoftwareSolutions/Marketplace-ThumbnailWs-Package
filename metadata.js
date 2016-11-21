module.exports.do = function(req, res){
res.status(200).send({
  "package": "ThumbnailWs",
  "tagline": "ThumbnailWs API Package",
  "description": "Looking for a reliable web service to create thumbnails from websites? Take a look at the result on the left and enter your own url to see the result. ",
  "image": "http://simpleicon.com/wp-content/uploads/camera.png",
  "repo": "https://github.com/RapidSoftwareSolutions/Marketplace-ThumbnailWs-Package",
  "accounts": {
    "domain": "thumbnail.ws",
    "credentials": ['apiKey']
  },
  "blocks": [
    {
      "name": "createThumbnail",
      "description": "Creates a thumbnail.",
      "args": [
        {
          "name": "apiKey",
          "type": "credentials",
          "info": "Required: API Key."
        },
        {
          "name": "url",
          "type": "String",
          "info": "Required: The URL of the website you want to capture. E.g. `http://www.reddit.com/` or `https://www.google.com/`"
        },
        {
          "name": "width",
          "type": "String",
          "info": "Required: The width of the image. E.g. 400."
        },
        {
          "name": "delay",
          "type": "String",
          "info": "How long should thumbnail.ws wait after the page has loaded to create a screenshot. Value must be given in milliseconds between 0 and 5000. Default is `2500`, (2.5 second). E.g. `3000`"
        },
        {
          "name": "fullpage",
          "type": "String",
          "info": "Return the mobile version by setting the width of the screen to 640 and identify ourselves as an iPhone. E.g. `true`"
        },
        {
          "name": "mobile",
          "type": "String",
          "info": "Return the full page and not only the part above the fold. An endless page can result in a very large image. E.g. `true` mobile (Premium only). "
        },
        {
          "name": "refresh",
          "type": "String",
          "info": "Deliver a fresh screenshot even if a cached version is available. E.g. `true`"
        }
      ],
      "callbacks": [
        {
          "name": "error",
          "info": "Error"
        },
        {
          "name": "success",
          "info": "Success"
        }
      ]
    }
  ]
});
};