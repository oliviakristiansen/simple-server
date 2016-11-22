//Bring in express.
var express = require ('express');

//Create and express router.
var router = express.Router ();


//Define routes.
router.get ('/login', function (request, response) {

    //Build your connection point first with response.send
        //response.send ('You made it to the page');
    //Then after you establish the connection to the page use response.render to pull in the
    //information from the template page you are using.
    response.render ('login');
});

router.post ('/login', function (request, response) {

    response.send ('you have now posted to the login route.');
    // response.render ('login');

    //Run a query to pull the user from the database using the 'username' field sent down by the post data.
    db.collection ('users').findOne ({ username: request.body.username }, {}, function (error, result) {
        console.log ('Here is the result: ', result);
    });

});

router.get ('/reset', function (request, response) {
    response.send ('You are on the reset page.');
});


//Exporting the router from this module.
module.exports = router;
