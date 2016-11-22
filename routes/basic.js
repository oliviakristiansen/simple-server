//Pull in express to make use of the framework.
var express = require ('express');

//Grab the url router from express.
//Use this object to attach additional routes for our express server app.
var router = express.Router ();

//Home or root route.
router.get ('/', function (request, response) {
    //NOTE: The request object contains information about the user's request (ex. their ip address, headers, coodies, and params)

    //NOTE: The response object is used to send responses back to the user who made the request.

    //Response.send will send to the browser what we placed in the string to make sure you got to that page.
        // response.send ('<h1>Hello World!</h1>');

    //Have express render out the string / text markup response in a template that will go to the client.
    response.render ('home');
});

//About route
router.get ('/about', function (request, response) {
    response.render ('about');
});

//Contact Route
router.get ('/contact', function (request, response) {
    response.render ('contact');
});

//FAQ route
router.get ('/faq', function (request, response) {
    response.render ('faq');
});



//Export the route from this file that is seen by NodeJs as its own module.
    //basically making it public so anyone can use it or see it.
module.exports = router;
