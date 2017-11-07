var express = require('express');
var app = express();
var router = express.Router();
var missionPostsJSON = require('../mission_posts.json');
var mission_posts = missionPostsJSON.mission_posts;
var name = mission_posts.name; //title of mission
var short_desc = mission_posts.short_desc;
var desc = mission_posts.desc;

router.get('/', function(req, res, next){
  res.render('index', {title: 'Arkansas Balloon', home: true});
});

router.get('/missions', function(req, res, next){
  res.render('missions', {
  	title: 'Missions',
  	mission_posts : mission_posts
  });
});

router.get('/missions/:mission_number?', function(req, res, next){
	var mission_number = req.params.mission_number;
	var mission = mission_posts[mission_number - 47];
	var page = "Missions - ABS-" + mission_number + ": " + name; //title of page
	if(mission_number >= 47 && mission_number <= 50) {
		res.render('missions', {
			mission : mission,
			name : name,
			short_desc : short_desc,
			desc : desc
		});
	} else {
		res.render('error', {title: 'Error 404'});
	}
});

router.get('/prediction', function(req, res, next){
  res.render('prediction', {title: 'Prediction'});
});


// router.get('/recovery', function(req, res, next){
//   res.render('recovery');
// });

router.get('/found', function(req, res, next){
  res.render('found');
});


// router.get('/about', function(req, res, next){
//   res.render('about');
// }); 



// must be at the bottom, will take precedence over other views
router.get('*', function(req, res){
  res.render('error', {title: 'Error 404'});
});

module.exports = router;
