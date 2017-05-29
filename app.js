var express = require('express');
var app = express();
var fs = require('fs');
var bodyParser = require('body-parser');

app.use(bodyParser());
app.use(express.static('public'));
app.set('views', './views');
app.set('view engine', 'pug');


// route 1: renders a page that displays all your users.
app.get('/', function(request, response) {
	fs.readFile('./users.json', function(err, data) {
		if (err) {
			console.log(err);
		}
		var parsedData = JSON.parse(data);
		response.render("./users/index", {
			user: parsedData
		});
	});
});

// route 2: renders a page that displays a form which is your search bar.

app.get('/form', function(request, response) {
	response.render("./users/form")
});

// route 3: takes in the post request from your form, then displays matching users on a new page. Users should be matched based on whether either their first or last name contains the input string.

app.post('/search', function(request, response) {
	userName = request.body.searching;
	fs.readFile('./users.json', function(error, data) {
		if (error) {
			console.log(error);
		}
		var parsedData = JSON.parse(data);
		for (i = 0; i < parsedData.length; i++) {
			if (parsedData[i].firstname === userName || userName === parsedData[i].lastname) {
				response.send("Firstname: " + parsedData[i].firstname + '</br>' + "Lastname: " + parsedData[i].lastname + '</br>' + "Email: " + parsedData[i].email)
				return;
			}
		}
	});
});

// // route 4: renders a page with three forms on it (first name, last name, and email) that allows you to add new users to the users.json file.

app.get('/create', function(request, response) {
	response.render("./users/create")
});

// route 5: takes in the post request from the 'create user' form, then adds the user to the users.json file. Once that is complete, redirects to the route that displays all your users (from part 0).

app.post('/addNew', bodyParser.urlencoded({
	extended: true
}), function(request, response) {

			new user(
			request.body.firstname,
			request.body.lastname,
			request.body.email)

		function user(firstname, lastname, email) {
		this.firstname = firstname;
		this.lastname = lastname;
		this.email = email;

		var inputNewUser = this

		fs.readFile('./users.json', function(error, data) {
			if (error) {
				console.log(error);
			}
			var DataNewUser = JSON.parse(data);
			DataNewUser.push(inputNewUser)

			var newUserStringified = JSON.stringify(DataNewUser)
			fs.writeFile('./users.json', newUserStringified, function(error) {
				console.log("New user is created")
				if (error) {
					throw error;
				}

				response.redirect('/')
			});
		});
	};
});

// Ajax!
app.post('/autocomplete', bodyParser.urlencoded({extended: true
	}), function (request, response) {
		var input = request.body.input;
		findUsers(input, function (results){
			response.send(results);
		});
	});
		function findUsers(input, onComplete) {
		fs.readFile('./users.json', function (error, data) {
		users = JSON.parse(data);

		var results = [];
		users.forEach(function (user){
			if(user.firstname.startsWith(input) || user.lastname.startsWith(input)) {
		 	results.push(user);
		 }
		});
		onComplete(results);
	});
	};



var server = app.listen(3000, function() {
	console.log('Example app listening on port: ' + server.address().port);
});
