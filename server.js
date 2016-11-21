//Load in the express nodejs module.
var express = require ('express');

//Create the express server app.
var server = express ();

//Set the port that our server will run on.
var port = 3000;

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
