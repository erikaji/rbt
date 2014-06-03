
/**
 * Module dependencies.
 */


//passportjs
var passport = require('passport')
, FacebookStrategy = require('passport-facebook').Strategy;

passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(obj, done) {  
  done(null, obj);
});

passport.use(new FacebookStrategy({
  clientID: '1432100480389043',
  clientSecret: '72a751f898169178438ef3a698a8aee3',
     //callbackURL: "http://www.rosebt.herokuapp.com/auth/facebook/callback" //***CURRENTLY LOCALHOST, UPDATE HERE AND IN FB DEV ACCOUNT***
     callbackURL: "http://localhost:3000/auth/facebook/callback"
   },
   function(accessToken, refreshToken, profile, done) {
   //   User.findOrCreate(..., function(err, user) {
   //     if (err) { return done(err); }
       // done(null, user);
       
       done(null, profile); //see http://passportjs.org/guide/facebook/
   //   });
}
));


var express = require('express');
var http = require('http');
var path = require('path');
var handlebars = require('express3-handlebars');
var crypto = require('crypto');

//mysql reference - https://github.com/felixge/node-mysql
var mysql      = require('mysql');
var pool = mysql.createPool({
    host: "us-cdbr-east-05.cleardb.net",
    user: "ba3bd950dbfbed", 
    password: "573b449f",
    database: "heroku_f6c3e56bf244b8e"
});

var edit = require('./routes/edit');
var feed = require('./routes/feed');
var profile = require('./routes/profile');
var login = require('./routes/login');
var friend = require('./routes/friend');

var app = express();
var hbs = handlebars.create({
    // Specify helpers which are only registered on this instance.
    helpers: {
        getValueByKey: function (array, key) {
        	if (key in array) return array[key];
        	return null;
        },
        eachExcept: function (context, exclude, options) {
        	var ret = "";
            var counter = 0;

            for(var i=0, j=context.length; i<j; i++) {
            	if (exclude.indexOf(context[i]) == -1) {
            	  ret = ret + options.fn(context[i]);
                  counter = counter + 1;
                  if (counter == 2) break;
                }   
            }
            return ret;
            }
    }
});

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('pool', pool);
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(express.cookieParser('rosebt secret key'));
app.use(express.session());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.bodyParser());
app.use(passport.initialize());
app.use(passport.session());
app.use(app.router);


// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

// Add routes here
app.get('/', function(req, res){            
  if(req.isAuthenticated()){
    res.redirect('/feed');
  } else {
    res.redirect('/login');
  }
});

app.get('/feed', feed.view);
app.get('/profile', profile.view);
app.get('/friend/:id', friend.view);
app.get('/edit', edit.view);
app.get('/login', login.view);
app.post('/post', profile.post);
app.post('/feed', feed.post);
app.post('/friend/:id', friend.post);


// Redirect the user to Facebook for authentication.
app.get('/auth/facebook', passport.authenticate('facebook'));

// Facebook will redirect the user to this URL after approval.
app.get('/auth/facebook/callback', 
  passport.authenticate('facebook', { successRedirect: '/feed',
    failureRedirect: '/login' }));

app.get('/logout', function(req, res){
  req.logout();
  res.redirect('/');
});


http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
