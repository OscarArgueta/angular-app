var express  = require('express');
var app      = express();
var mongoose = require('mongoose');

//Connect database
mongoose.connect('mongodb://localhost:27017/angular-app');

//Setings
app.configure(function() {
	// Static files
	app.use(express.static(__dirname + '/public'));
	// Debug for all request
	app.use(express.logger('dev'));
	// for method POST
	app.use(express.bodyParser());
	// DELETE & PUT Simulate
	app.use(express.methodOverride());
});

// Models defined
var Todo = mongoose.model('Todo', {
	text: String
});

//API's paths
app.get('/api/todos', function(req, res){
	Todo.find(function(err, todos){
		if(err){
			res.send(err);
		}
		res.json(todos);
	});
});

// POST to create 
app.post('/api/todos', function(req, res) {
	Todo.create({
		text: req.body.text,
		done: false
	}, function(err, todo){
		if(err){
			res.send(err);
		}

		Todo.find(function(err, todos) {
			if(err){
				res.send(err);
			}
			res.json(todos);
		});
	});
});

// DELETE register
app.delete('/api/todos/:todo', function(req, res) {
	Todo.remove({
		_id: req.params.todo
	}, function(err, todo){
		if(err){
			console.log('error -> ['+ err +']');
			res.send(err);
		}

		Todo.find(function(err, todos) {
			if(err){
				res.send(err);
			}
			res.json(todos);
		});
	});
});

// Main view Angular
app.get('*', function(req, res){
	res.sendfile('./public/index.html')
});

// Port listen server
app.listen(8080, function(){
	console.log('server listening on port 8080');
});
