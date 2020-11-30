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
app.use(cookieParser()); // Unlike bodyParser(), cookieParser() doesn't need an argument.



// app.get() HANDLES get-requests: it's NOT sending one!
app.get('/', (req, res) => { // request, response - call them req and res by convention
  // res.send('<h1 style="font-family: sans-serif">I love TreeHouse...</h1>');
  const nameFromCookie = req.cookies.username; // I think 'nameFromCookie' is a clearer eg than 'name'
  // res.render('index',{ name:nameFromCookie } ); // that is, the view engine (pug) looks for the (opinionated) path views/index.pug.
  			// Andrew called it 'name' and then set it as {name:name}, and THEN used ES6 shorthand for when the key
  			// and the value are the same, setting it as { name }. I think this is highly confusing, but it's something to
  			// be aware of.
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

/*
  And Now: re-directing.
  A re-direct is a RESPONSE sent by the server when chosen conditions are satisfied. The client then
  receives this response and sends out another request, using the re-direct URL. Here, we want to
  set up the app so that once the user has input their name, they're re-directed to the home page; 
  i.e. from localhost:3000/hello to just localhost:3000.
  So, you use the res.redirect method instead of res.render.
*/

app.get('/hello', (req,res) => {
  // Here, we're going to pass in the user's name from the cookie we've set in 
  // the cookie in app.post, if it exists.

  if (req.cookies.username) {
  	res.redirect('/');
  } else {
  	res.render('hello');
  }



  // Initially, this line was in here unconditionally:
  // res.render('hello');
  //
  // The first time the app is set up, assuming a clear cache, there's no cookie so no
  // name. Remember, in hello.pug, if there's a name, we render it; otherwise we don't.
  // You can empty cookies in devtools, but there's a better way which we'll come to.
  // DELETING COOKIES VIA DEVTOOLS:
  // elements/console/sources/network/performance/APPLICATION (i.e. select application)
  // On the left sidebar of the devtools area, you'll see Storage/Cookies. Open this, select
  // the cookie, right-click and delete.
})

app.post('/hello', (req,res) => {
  res.cookie('username', req.body.username); // 'username' is the name of the cookie, and req.body.username is the value.
                                             // The browser will send this cookie with each request.
                                             // See also the next bit...
  // res.render('hello',{name:req.body.username}); // name is foadyb, but we'll use it in the pug template; req.body
  res.redirect('/'); // Going with this instead of a direct render, commented out above
  console.dir(req.body);						// is express standard, and the .username property is set up by the
})												// fact that our hello.pug form has an element with a 'name' of 
												// 'username'.	

app.post('/goodbye', (req,res) => {
	res.clearCookie('username');
	res.redirect('/hello');
})

app.listen(3000, () => {
  console.log('The application is running on localhost.3000');
});


// pug stuff for potential pasting into index.pug
    // if name
    //   h2 Hello and welcome to TreeHouse world, #{name}!
    // else

