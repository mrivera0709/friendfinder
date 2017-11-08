//require friends.js
var friends = require('../data/friends.js');

//Set up api routes
module.exports = function(app){

	// GET Requests
  app.get('/api/friends', function(req, res)
    {res.json(friends);});

	// POST Requests
	app.post('/api/friends', function(req, res){

//Comparing user with their best friend match 

//Set Up Best Match Object
		var bestMatch = {
			name: "",
			photo: "",
			friendDifference: 1000
		};

// Parse User survey results
		var userData 	= req.body;
		var userName 	= userData.name;
		var userPhoto 	= userData.photo;
		var userScores 	= userData.scores;

		var totalDifference = 0;

// Loop through all the possible friends 
		for  (var i=0; i< friends.length; i++) {

			//console.log(friends[i].name);
			totalDifference = 0;

			// Loop through the scores of each friend
			for (var j=0; j< friends[i].scores[j]; j++){

				// Calculate the total difference of the user and potential friends scores.
				totalDifference += Math.abs(parseInt(userScores[j]) - parseInt(friends[i].scores[j]));

				// If the current total difference less then the difference of the current "best match"
				if (totalDifference <= bestMatch.friendDifference){

					// Set the new value as the Best Match
					bestMatch.name = friends[i].name;
					bestMatch.photo = friends[i].photo;
					bestMatch.friendDifference = totalDifference;
				}
			}
		}

		// Save the users data to the database(friends.js)
		friends.push(userData);

		// Return a JSON with the user's bestMatch to be displayed in the html
		res.json(bestMatch);

	});

}