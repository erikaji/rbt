
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
var connection = mysql.createConnection({
    host: "us-cdbr-east-05.cleardb.net",
    user: "ba3bd950dbfbed", 
    password: "573b449f"
});
connection.query('USE heroku_f6c3e56bf244b8e');

var edit = require('./routes/edit');
var feed = require('./routes/feed');
var profile = require('./routes/profile');

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

/*
 * Respond to GET requests to /sign_s3.
 * Upon request, return JSON containing the temporarily-signed S3 request and the
 * anticipated URL of the image.
 */
 /*
app.get('/sign_s3', function(req, res){
    var object_name = req.query.s3_object_name;
    var mime_type = req.query.s3_object_type;

    var now = new Date();
    var expires = Math.ceil((now.getTime() + 10000)/1000); // 10 seconds from now
    var amz_headers = "x-amz-acl:public-read";  

    var put_request = "PUT\n\n"+mime_type+"\n"+expires+"\n"+amz_headers+"\n/"+S3_BUCKET+"/"+object_name;

    var signature = crypto.createHmac('sha1', AWS_SECRET_KEY).update(put_request).digest('base64');
    signature = encodeURIComponent(signature.trim());
    signature = signature.replace('%2B','+');

    var url = 'https://'+S3_BUCKET+'.s3.amazonaws.com/'+object_name;

    var credentials = {
        signed_request: url+"?AWSAccessKeyId="+AWS_ACCESS_KEY+"&Expires="+expires+"&Signature="+signature,
        url: url
    };
    res.write(JSON.stringify(credentials));
    res.end();
});
*/

/*
 * Respond to POST requests to /submit_form.
 * This function needs to be completed to handle the information in 
 * a way that suits your application.
 */
 /*
app.post('/submit_form', function(req, res){
    //rose = req.body.rose;
    //update_account(username, full_name, avatar_url); // TODO: create this function
    // TODO: Return something useful or redirect
});
*/


// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('connection', connection);
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
app.post('/profile', profile.post);

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
