var express = require('express');
var router = express.Router();
var request = require('request');
var wtf_wikipedia = require("wtf_wikipedia")
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Mr Modal', text: '', ingredients: '', url: '', video: '', art: '' });
});
router.get('/youtube', function(nodeRequest, nodeResponse, next) {
  function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
  }
  var offset = getRandomInt(1, 75356);
  request('https://api.spotify.com/v1/search?q=year%3A2000&type=artist&market=US&limit=1&offset=' + offset, function(apiError, apiResponse, apiBody) {
    if (!apiError && apiResponse.statusCode == 200) {
      var jsBody = JSON.parse(apiBody);
      var name = jsBody.artists.items[0].name;
      console.log(name);
      wtf_wikipedia.from_api(name, "en", function(markup) {
        var obj = wtf_wikipedia.plaintext(markup)
        var disc = "may refer to:"
        console.log(obj);
        if (obj.indexOf(disc) !== -1) {
          nodeResponse.redirect('/youtube');
        } else {
          request('https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=25&q=' + name + '&type=video&videoCategoryId=10&key=' + process.env.GOOGLE_ID, function(apiError, apiResponse, apiBody) {
            if (!apiError && apiResponse.statusCode == 200) {
              var jsBody = JSON.parse(apiBody)
              if (jsBody.pageInfo.totalResults > 25) {
                var upper = 25
              } else {
                var upper = jsBody.pageInfo.totalResults
              }

              function getRandomInt(min, max) {
                return Math.floor(Math.random() * (max - min)) + min;
              }
              rand = getRandomInt(1, upper);
              var debug = jsBody
              if (rand !== 0) {
                var video = (jsBody.items) ? jsBody.items[rand].id.videoId : 'dQw4w9WgXcQ';
              } else {
                var video = 'dQw4w9WgXcQ'
              }
              nodeResponse.render('youtube2', {
                video: video,
                text: obj
              });
            }
          });
        }
      });
    };
  });
});
router.get('/recipes', function(req, res, next) {
  function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
  }
  var offset = getRandomInt(1, 999);
  request('https://api.edamam.com/search?q=recipe&from=' + offset, function(apiError, apiResponse, apiBody) {
    var jsBody = JSON.parse(apiBody);
    var image = jsBody.hits[0].recipe.image;
    var link = jsBody.hits[0].recipe.url;
    var ingredients = jsBody.hits[0].recipe.ingredientLines;
    res.render('recipe', {
      image: image,
      url: link,
      ingredients: ingredients
    });
  });
});
router.get('/art', function(nodeRequest, nodeResponse, next) {
  function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
  }
  rand = getRandomInt(1, 99999);
  var options = {
    url: 'https://api.art.rmngp.fr:443/v1/works/suggested?page=' + rand + '&per_page=1',
    headers: {
      'ApiKey': process.env.ART_ID
    },
    json: true
  };
  console.log(options);

  function callback(error, response, body) {
    if (!error && response.statusCode == 200) {
      var imageURL = body.hits.hits[0]._source.images[0].urls.large.url
      var debug = body.hits.hits[0]._source
      var title = (body.hits.hits[0]._source.title) ? body.hits.hits[0]._source.title.fr : 'Default title';
      nodeResponse.render('art', {
        imageURL: imageURL,
        title: title
      })
    }
  }
  request(options, callback);
});
module.exports = router;
