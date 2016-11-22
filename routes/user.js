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

    // response.send ('you have now posted to the login route.');
    // response.render ('login');

    //Run a query to pull the user from the database using the 'username' field sent down by the post data.
    db.collection ('users').findOne (
        //The filter or fields to search by.
        {
            username: request.body.username,
            password: request.body.password
        },

        //Additional query options.
        {},

        function (error, result) {

            //Check for errors.
            if (error) {
                console.error ('***ERROR: Problem finding the user.');
                console.error (error);
            }

            //! means 'not' so below is 'not a result' or 'not an object'
            else if (!result) {
                //Our query was run but did NOT find a matching object.
                // response.send ('Your username or password is NOT correct.');
                response.render ('login');
            }
            else {
                //The query was run and did find a matching object.
                // response.send ('Found the user by the name: ' + result.username);
                response.render ('posts');
            }

            console.log ('Here is the result: ', result);
    });

});

router.get ('/register', function (request, response) {
    response.render ('register')
});

router.post ('/register', function (request, response) {

    db.collection ('users').insertOne (
        //Data to save to collection.
        request.body,
            //use above rather than getting them one by one.
        // {
        //     username: request.body.username,
        //     password: request.body.password,
        //     email: request.body.email,
        // },

        //The callback function to run once the save is complete.
        function (error, result) {
            //Check for an error.
            if (error) {
                console.error ('***ERROR: Unable to register user.');
                response.sned ('Server error, unable to register user.');
            }
            else{
                //Redirect to the login page.
                response.redirect ('/user/login');
            }


    })
});



router.get ('/reset', function (request, response) {
    response.send ('You are on the reset page.');
});


//Exporting the router from this module.
module.exports = router;
