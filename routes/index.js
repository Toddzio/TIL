var express = require('express');
var router = express.Router();
var request = require('request');
var wtf_wikipedia = require("wtf_wikipedia")

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Mr Modal', text: '', ingredients: '', url: '', video: '',art:''});
});

router.get('/youtube', function(nodeRequest, nodeResponse, next) {
            function getRandomInt(min, max) {
                return Math.floor(Math.random() * (max - min)) + min;
            }
            var offset = getRandomInt(1, 75356);
            request('https://api.spotify.com/v1/search?q=year%3A2001&type=artist&market=US&limit=1&offset=' + offset, function(apiError, apiResponse, apiBody) {
                        if (!apiError && apiResponse.statusCode == 200) {
                            // console.log(apiBody);
                            var jsBody = JSON.parse(apiBody);
                            // console.log(jsBody);
                            var name = jsBody.artists.items[0].name;
                            // nodeResponse.render('youtube', {
                            //     title: 'Express'
                            // });

                            wtf_wikipedia.from_api(name, "en", function(markup) {
                                var obj = wtf_wikipedia.plaintext(markup)
                                var disc = "may refer to:"
                                // console.log(obj.indexOf(disc));
                                if (obj.indexOf(disc) !== -1) {
                                    res.redirect('/youtube');
                                } else {
                                    function getRandomInt(min, max) {
                                        return Math.floor(Math.random() * (max - min)) + min;
                                    }
                                    rand = getRandomInt(1, 25);
                                    // var city = nodeRequest.params.city;
                                    // console.log(name);
                                    request('https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=25&q=' + name + '&type=video&videoCategoryId=10&key=AIzaSyBbBsJIi7O9hIk_tTo-XU5T8AMmiEopfVM', function(apiError, apiResponse, apiBody) {
                                        if (!apiError && apiResponse.statusCode == 200) {
                                            // console.log(apiBody);
                                            var jsBody = JSON.parse(apiBody)
                                            // console.log(jsBody)
                                            var video = jsBody.items[rand].id.videoId
                                                // console.log(video);
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
router.get('/recipes', function(req, res, next){
    function getRandomInt(min, max) {
                return Math.floor(Math.random() * (max - min)) + min;
            }
            var offset = getRandomInt(1, 999);
 request('https://api.edamam.com/search?q=recipe&from=' + offset, function(apiError, apiResponse, apiBody){
     var jsBody = JSON.parse(apiBody);
     // console.log(jsBody);
     var image = jsBody.hits[0].recipe.image;
     var link = jsBody.hits[0].recipe.url;
     var ingredients = jsBody.hits[0].recipe.ingredientLines;
     // console.log(link)
     // console.log(jsBody.hits[0].recipe.ingredientLines);
     res.render('recipe',{
        image: image,
        url: link,
        ingredients: ingredients
     });
   // console.log(apiError);
 });
});


// };
router.get('/youtube2/:city', function(nodeRequest, nodeResponse, next) {
    function getRandomInt(min, max) {
        return Math.floor(Math.random() * (max - min)) + min;
    }
    rand = getRandomInt(1, 25);
    var city = nodeRequest.params.city;
    console.log(city);
    request('https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=25&q=' + city + '&type=video&videoCategoryId=19&key=' + process.env.GOOGLE_ID, function(apiError, apiResponse, apiBody) {
        if (!apiError && apiResponse.statusCode == 200) {
            // console.log(apiBody);
            var jsBody = JSON.parse(apiBody)
            var video = jsBody.items[rand].id.videoId
                // console.log(video);
            nodeResponse.render('youtube2', {
                video: video
            });
        }
    })
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
            // console.log(debug);
            // var title = body.hits.hits[0]._source.title.fr
            var title = (body.hits.hits[0]._source.title) ? body.hits.hits[0]._source.title.fr : 'Default title';
            // var data = body.hits.hits[0]._source.title.fr
            // console.log(imageURL);

            // console.log(title);
            nodeResponse.render('art', {
                imageURL: imageURL,
                title: title
            })
        }
    }
    request(options, callback);
});


// router.get('/recipes', function(req, res, next){
//   request('https://edamam-recipe-search-and-diet-v1.p.mashape.com/search?_app_id=8e53019b&_app_key=bb975334e672c4d3ae73d1ce90c3804a&q=chicken', function(apiError, apiResponse, apiBody){
//     if(!apiError && apiResponse.statusCode == 200) {
//       var jsBody = JSON.parse(apiBody);
//       console.log('test');
//       console.log(jsBody);
//       res.render('index');
//     }
//   });
// });




module.exports = router;
