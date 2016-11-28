//Load in the express nodejs module.
var express = require ('express');

//Create the express server app.
var server = express ();

//Set the public folder that can be accessed by any public user.
    //We are specifically saying to express that we only want you to serve
    //out of the public folder.
server.use (express.static ('public'));

//Make sure the body-parser has been installed (npm install body-parser --save).
    //Load the body-parser module.
var bodyParser = require ('body-parser');

//Set express to use the body parser to pull the data out of any POST requests from the browser.
server.use (bodyParser.urlencoded ({ extended: true}));



//Load in the express session handler.
var session = require ('express-session');

//Configure the session to be used by express.
server.use (session ({
    secret: 'This is my secret phrase',     //Ussed to hash / excrypt the session key.
    resave: false,
    saveUninitialized: true
}));


//Load in the connect-flash express middleware module. (npm install connect-flash --save)
var flash = require ('connect-flash');

//Set our server app to use the flash message object.
server.use (flash ());

//Set a global function that will be run BEFORE any of our other routes are run.
    //This is for showing either the dashboard or the Login part of the nav bar depending
    //on if we are logged in or not.. It will change when we login and logout.
server.use (function (request, response, next) {
    //Set the local data in the template to use the user session data.
    response.locals.user = request.session.user;

    //Set the flash object to be set and used BEFORE running any other routes or functions.
        //Run the flash method to create a new instance of the object.
    response.locals.message = request.flash ();

    //Move on to the next route.
        //We need this next function (below)
    next ();
});

//Set the port that our server will run on.
var port = 3000;

//Configure the render engine handlebars.
var handlebars = require ('express-handlebars');
server.engine ('.hbs', handlebars ({
    layoutsDir: 'templates',                //The directory of layout files
    // partialsDir: 'templates/partials',      //The directory for partials files
    defaultLayout: 'index',                 //The base / main template to always loads
    extname: '.hbs'                         //The file extension to use.
}));

//Set the default directory for express to use for the handlebar templates.
    //__dirname stores the current directory -- with two underscores
server.set ('views', __dirname + '/templates/partials');

//Set the render engine for our server.
server.set ('view engine', '.hbs');


//Bring in the Mongodb client driver and connect to the database.
var mongoClient = require ('mongodb').MongoClient;

//Create a reference to the database.
global.db;

//Create a connection to the database.
mongoClient.connect ('mongodb://localhost:27017/sample_database', function (error, database) {
    //Check if there was an error connecting to the database.
    if (error) {
        console.error ('*** ERROR: Unable to connect to the mongo database.');
        console.error (error);
    }
    else {
        //Go ahead and start the server app.
        //Launch the server app.
            //function below is called a callback function.
        server.listen (port, function (error) {
            //Check to see if the server was unable to start up.
                //if (error !==undefined) means if error is not equals to nothing than is equal to something so there will be an error
            if (error !== undefined) {
                console.error ('****ERROR: Unable to start the server.');
            }
            else {
                //Link to the database reference.
                db = database;
                //No errors found the server is good to go.
                console.log ('- The server has successfully started on port: ' + port);
            }
        });
    }
});




//----------------------------------------------------------------------------------------------
//Set the url routes that the server can use.


//Import in the routes to use.
var basicRoutes = require ('./routes/basic.js');

//Set our server to use the imported routes.
server.use ('/', basicRoutes);


//Connect the posts routes.
var postRoutes = require ('./routes/posts.js');
server.use ('/post', postRoutes);


//Connect the user routes.
var userRoutes = require ('./routes/user.js');
server.use ('/user', userRoutes);


//Test a database query.
server.get ('/test', function (request, response) {

    //Pull a set of test users from the database.
    // db.collection ('users').find ({ username: 'olivia'}).toArray (function (error, result) {
    //     console.log ('This is the result of the query: ', result);
    // });

    db.collection ('users').findOne ({ username: 'olivia'}, {}, function (error, result) {
        console.log ('This is the result of the query: ', result);

    });

    response.send ('db test was run.');
});
