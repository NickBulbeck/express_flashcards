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

/*  EXECUTION FLOW
  Really interesting, and important. 
  When express sets up the server, at line 2 in this case, it calls a number of functions. Many of the
  middleware functions are closures - that is, they themselves return functions. When a request is made
  by a client, it's picked up by app.listen() and the request and response objects are created. They are 
  then passed from one piece of middleware to the next, down the line. It starts with the first piece of
  middleware in the code that is compatible with its url; then goes to the next, and so on, until a response
  is sent back to the client.
*/

app.set('view engine', 'pug'); 
app.use(bodyParser.urlencoded({extended:false})); 
app.use(cookieParser()); 

/*  MIDDLEWARE
  The basic format for using middleware is a function with three parameters:
    (req,res,next) => {... blah... };
  'blah' here is the function that the middleware actually comprises. It can read and modify
   the request and response objects. 
  'next' is quite interesting... it's a function that must be called once the middleware function has
  finished; it closes off the middleware. You need next() if your middleware doesn't send a response
  to the client. If you don't send a response, with res.render/send or similar, AND you don't have a
  next(); statement, the app will hang at the point in the code where the next() should be.
  To run middleware in response to every request:
  app.use((req,res,next) => {});
  To run it for a specific route:
  app.use('/foadyb',(req,res,next) => {});
  To run it only for get-requests:
  app.get('/foadyb',(req,res,next) => {});
*/
// Our first example of middleware:

app.use((req,res,next) => {  // This (skeleton!) middleware runs every time a request comes into the app.
  console.log("One");        // Thus, 'req' is defined by virtue of the context in which JavaScript will
  next();                    // always automatically call this anonymous function.
  },                         // ... comma to separate multiple functions for the same piece of middleware
  (req,res,next) => {           // second function: must still have the argument list and the => remember.
  console.log("One point one"); // This indentation's a bit off TBH. 
  next();                       // But this logs after "One", and before "Two"
  }
);
// Once you add the argument '/one', the function only logs to the console when you go to 
// localhost:3000/one in the browser

app.use((req,res,next) => {  // There's some minor potential confusion here. next() from the previous 
  console.log("Two");        // middleware calls the next middleware function that's declared in the
  next();                    // code. In other words, this one. So, the console logs out firstly 'One',
});                          // and then 'Two'.

// Now, we'll pass information between functions.
app.use((req,res,next) => {
  req.message = 'This message made it!' // .message is a foadyb property (mind how you can do that with objects)
  next();
});
app.use((req,res,next) => {
  console.log(`Three: ${req.message}`);
  next(); // You MUST include next() after the last middleware function - if it's not there,
          // the app will hang and eventually time out.
});
// Now, we'll look at using next() to handle errors.
app.use((req,res,next) => {
  console.log("Hello");
  const err = new Error("Nick's patent test error hingmy");
  next(err); // Passing the error in as an argument triggers an error; the app falls over at this point. "Hello"
})           // is logged, but next() effectively sends the error as a response (it appears in the browser) and
             // "world" is not logged.
app.use((req,res,next) => {
  console.log("world");
  next();
})



// End of middleware examples

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


