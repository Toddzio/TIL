var express = require('express');
var router = express.Router();
var request = require('request');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

// router.get('/youtube', function(req, res, next) {
// 	// router.get('/', function(nodeRequest, nodeResponse, next) {
//   request('"https://api.spotify.com/v1/search?q=year%q=year:0000-9999&type=artist&market=US&limit=1&offset=12345"', function (apiError, apiResponse, apiBody) {
//     if (!apiError && apiResponse.statusCode == 200) {
//       console.log(apiBody);
//       // var jsBody = JSON.parse(apiBody)
//       // nodeResponse.render('index', {title: "Meow-GIF!", image_url: jsBody.data.image_url, external_id: jsBody.data.id});
//   res.render('youtube', { title: 'Express' });
// };

router.get('/youtube', function(nodeRequest, nodeResponse, next) {
	function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}
var offset = getRandomInt(1, 75356);
// console.log(offset);
 function searchTerm(){request('https://api.spotify.com/v1/search?q=year%3A2001&type=artist&market=US&limit=1&offset=' + offset, function (apiError, apiResponse, apiBody) {
    if (!apiError && apiResponse.statusCode == 200) {
      // console.log(apiBody);
      var jsBody = JSON.parse(apiBody);
      // console.log(jsBody);
      var name = jsBody.artists.items[0].name;
      console.log(name);
      return name;
      // nodeResponse.render('index', {title: "Meow-GIF!", image_url: jsBody.data.image_url, external_id: jsBody.data.id});
    // nodeResponse.render('youtube', { title: 'Express' });
    }
  })
}
  request('https://www.googleapis.com/youtube/v3/search?part=' + 'nadine sutherland' + 'music&key=' + process.env.GOOGLE_ID, function (apiError, apiResponse, apiBody) {
    if (!apiError && apiResponse.statusCode == 200) {
      console.log(apiBody);
      var jsBody = JSON.parse(apiBody);
      // console.log(jsBody);
      // var name = jsBody.artists.items[0].name;
    
      // nodeResponse.render('index', {title: "Meow-GIF!", image_url: jsBody.data.image_url, external_id: jsBody.data.id});
    nodeResponse.render('youtube', { title: 'Express' });
    }
  })
});
module.exports = router;