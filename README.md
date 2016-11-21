# ThumbnailWs Package
Looking for a reliable web service to create thumbnails from websites? Take a look at the result on the left and enter your own url to see the result. 
* Domain: https://thumbnail.ws
* Credentials: apiKey

## How to get credentials: 
Just fill in [Sign Up Form](https://thumbnail.ws/sign-up.html).
 
<a name="createThumbnail"/>
## ThumbnailWs.createThumbnail
Creates a thumbnail. Return image raw.

| Field   | Type       | Description
|---------|------------|----------
| apiKey  | credentials| Required: API Key.
| url     | String     | Required: The URL of the website you want to capture. E.g. `http://www.reddit.com/` or `https://www.google.com/`
| width   | String     | Required: The width of the image. E.g. 400.
| delay   | String     | How long should thumbnail.ws wait after the page has loaded to create a screenshot. Value must be given in milliseconds between 0 and 5000. Default is `2500`, (2.5 second). E.g. `3000`
| fullpage| String     | Return the mobile version by setting the width of the screen to 640 and identify ourselves as an iPhone. E.g. `true`
| mobile  | String     | Return the full page and not only the part above the fold. An endless page can result in a very large image. E.g. `true` mobile (Premium only). 
| refresh | String     | Deliver a fresh screenshot even if a cached version is available. E.g. `true`

### Usage example:

```php
$response = $rapid->call(
	'ThumbnailWs', 
	'createThumbnail', 
	[
		'apiKey' => '###',
		'url'    => 'http://rapidapi.com',
		'width'  => 400 
	]
);

header("Content-type: image/jpg");
echo $response;
exit(0);
```