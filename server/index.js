// required modules
var express = require( "express" );
var http    = require( "http" );

// dependency injection
var config   = require( "./config.js" );
var myRoutes = require( "./routes/myRoutes.js" );
var app      = express();

//Middleware to load static files
app.use( express.static( __dirname  + '/../client' ) );
console.log(__dirname);

//routing logic
app.get('/login/:username/:password',myRoutes.login);
app.get('/signup/:uname/:pswd/:fname/:lname/:phn/:add',myRoutes.signup);
app.get('/register/:uname/:lname/:dob/:deg/:depa/:sslc/:hsc/:loc',myRoutes.register);
app.get('*', myRoutes.defaultPage);

//server listening in port
app.listen(config.port, function(){
console.log('Express server listening on port ' , config.port);
});