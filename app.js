const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

const colours = [
  'red',
  'orange',
  'yellow',
  'green',
  'blue',
  'purple'
  ];

app.set('view engine', 'pug'); 
app.use(bodyParser.urlencoded({extended:false})); 
app.use(cookieParser()); 

app.get('/', (req, res) => { 
  const nameFromCookie = req.cookies.username;
  if (nameFromCookie) {
  	res.render('index',{ name:nameFromCookie } );
  } else {
  	res.redirect('/hello');
  }
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
	res.render('card',locals);
})

app.get('/index', (req, res) => { 
  res.render('index') 
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
  if (req.cookies.username) {
  	res.redirect('/');
  } else {
  	res.render('hello');
  }
})

app.post('/hello', (req,res) => {
  res.cookie('username', req.body.username); 
  res.redirect('/'); 
})
												
app.post('/goodbye', (req,res) => {
	res.clearCookie('username');
	res.redirect('/hello');
})

app.listen(3000, () => {
  console.log('The application is running on localhost.3000');
});


