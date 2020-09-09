const express = require('express');
const app = express();
const bodyParser = require('body-parser');

const colours = [
  'red',
  'orange',
  'yellow',
  'green',
  'blue',
  'purple'
  ];

app.set('view engine', 'pug'); // app.set defines settings in express. By default, it looks in a folder called
							   // views; you can re-set this using 'views' and a path. This is what is used when you
							   // call res.render, as distinct fae res.send (which just sends a string).
app.use(bodyParser.urlencoded({extended:false})); // This is specific to handling browser HTML requests. By default, req.body
												  // is 'undefined', and it has to be parsed (a bit like JSON.parse) before
												  // it's readable. Dinnae fuss about the syntax of this line. It's just one
												  // of those things you just have to remember to include (and you'll probably 
												  // need to look it up every time).
												  // Including this line is all you need to do: this signals to express that it
												  // should use this format to understand req.body, which will now become a 
												  // readable object containing all of the element names and their values as
												  // set up in the HTML form - in this case, in hello.pug.

// app.get() HANDLES get-requests: it's NOT sending one!
app.get('/', (req, res) => { // request, response - by convention
  res.send('<h1 style="font-family: sans-serif">I love TreeHouse...</h1>');
}); 

app.get('/cards', (req, res) => {
	const tryThis = () => {
		const prompts = [
			"Who is buried in Grant's tomb?",
			"How do you install a dependency locally in npm?",
			"How do you install a development dependency locally in npm?"
		]
		return prompts[Math.floor(Math.random() * prompts.length)];
	}
	const locals = {
		prompt: tryThis(),
		hint: "Try searching for it...",
		colours
	}
	// res.locals.prompt = tryThis(); // res.locals is a built-in reference to the local variables. This is
	// 									 another way of doing what's on the next line.
	// res.render('card',{prompt: tryThis(),userName: "Nick"}); // Otherwise, store the local variables in an object.
	res.render('card',locals);
})

app.get('/index', (req, res) => { // request, response - by convention
  // res.send('<h2 style="font-family: sans-serif">Hello Nick, JS developer!</h1>'); // this will send whatever's
  																				     // in the string. Or:
  res.render('index') // that is, the view engine (pug) looks for the (opinionated) path views/index.pug.
}); 

app.get('/sandbox', (req, res) => {
	const locals = {
		names: [
				["Nick", "Bulbeck"],
				["Lesley", "Bulbeck"],
				["Nathan", "Bulbeck"],
				["Bryony", "Bulbeck"],
				]
	}
	res.render('sandbox',locals);
})

app.get('/hello', (req,res) => {
  res.render('hello');
})

app.post('/hello', (req,res) => {
  res.render('hello',{name:req.body.username}); // name is foadyb, but we'll use it in the pug template; req.body
  console.dir(req.body);						// is express standard, and the .username property is set up by the
})												// fact that our hello.pug form has an element with a 'name' of 
												// 'username'.	
app.listen(3000, () => {
  console.log('The application is running on localhost.3000');
});


