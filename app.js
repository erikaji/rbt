
/**
 * Module dependencies.
 */


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
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

// Add routes here
app.get('/', feed.view);
app.get('/profile', profile.view);
app.get('/edit', edit.view);
app.get('/login', login.view);
app.post('/profile', profile.post);

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
