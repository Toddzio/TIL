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

// router.get('/youtube', function(nodeRequest, nodeResponse, next) {
// 	function getRandomInt(min, max) {
// 		return Math.floor(Math.random() * (max - min)) + min;
// 	}
// 	var offset = getRandomInt(1, 75356);

// 	request('https://api.spotify.com/v1/search?q=year%3A2001&type=artist&market=US&limit=1&offset=' + offset, function (apiError, apiResponse, apiBody) {
//     if (!apiError && apiResponse.statusCode == 200) {
//       // console.log(apiBody);
//       var jsBody = JSON.parse(apiBody);
//       // console.log(jsBody);
//       var name = jsBody.artists.items[0].name;
// 	  nodeResponse.render('youtube', { title: 'Express' });
// 	   } 
// 	})
// });

// function getArtist(nodeRequest, nodeResponse, next) {
	

// 	request('https://api.spotify.com/v1/search?q=year%3A2001&type=artist&market=US&limit=1&offset=' + offset, function (apiError, apiResponse, apiBody) {
//     if (!apiError && apiResponse.statusCode == 200) {
//       // console.log(apiBody);
//       var jsBody = JSON.parse(apiBody);
//       // console.log(jsBody);
//       var name = jsBody.artists.items[0].name;
//       // console.log(name);
//       return name
//       next
// 	  // nodeResponse.render('youtube', { title: 'Express' });
// 	   } 
// 	})
// };
router.get('/youtube2/:city', function(nodeRequest, nodeResponse, next) {
	function getRandomInt(min, max) {
		return Math.floor(Math.random() * (max - min)) + min;
	}
	rand = getRandomInt(1, 25);
	var city = nodeRequest.params.city;
	console.log(city);
  request('https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=25&q=' + city + '&type=video&videoCategoryId=19&key=AIzaSyBbBsJIi7O9hIk_tTo-XU5T8AMmiEopfVM', function (apiError, apiResponse, apiBody) {
    if (!apiError && apiResponse.statusCode == 200) {
      // console.log(apiBody);
      var jsBody = JSON.parse(apiBody)
      var video = jsBody.items[rand].id.videoId
      // console.log(video);
      nodeResponse.render('youtube2', { video: video });
    }
  })
});

router.get('/wiki', function(nodeRequest, nodeResponse, next) {
 request('https://en.wikivoyage.org/wiki/special:random', function (apiError,
   apiResponse, apiBody){
   if(!apiError && apiResponse.statusCode == 200) {
     console.log(apiBody);
     var jsBody = JSON.parse(apiBody);
   }
 })
});

router.get('/'), function(res, req, next) {
	render(index.ejs);
}

module.exports = router;