const express = require('express');

const app = express();

const colours = [
  'red',
  'orange',
  'yellow',
  'green',
  'blue',
  'purple'
  ];

app.set('view engine', 'pug'); // app.set defines settings in express. By default, it looks in a folder called
							   // views; you can re-set this using 'views' and a path.

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

app.get('/hello', (req, res) => { // request, response - by convention
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

app.listen(3000, () => {
  console.log('The application is running on localhost.3000');
});
