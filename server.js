//Load in the express nodejs module.
var express = require ('express');

//Create the express server app.
var server = express ();

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

//Launch the server app.
    //function below is called a callback function.
server.listen (port, function (error) {
    //Check to see if the server was unable to start up.
        //if (error !==undefined) means if error is not equals to nothing than is equal to something so there will be an error
    if (error !== undefined) {
        console.error ('****ERROR: Unable to start the server.');
    }
    else {
        //No errors found the server is good to go.
        console.log ('- The server has successfully started on port: ' + port);
    }
});


//----------------------------------------------------------------------------------------------
//Set the url routes that the server can use.

//Home or root route.
server.get ('/', function (request, response) {
    //NOTE: The request object contains information about the user's request (ex. their ip address, headers, coodies, and params)

    //NOTE: The response objct is used to send responses back to the user who made the request.

    // response.send ('<h1>Hello World!</h1>');

    //Have express render out the string / text markup response that will go to the client.
    response.render ('home');
});

//About route
server.get ('/about', function (request, response) {
    response.render ('about');
});
