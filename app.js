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


app.use((req,res,next) => {  
  console.log("One");        
  next();                    
  },                         
  (req,res,next) => {           
  console.log("One point one"); 
  next();                       
  }
);

app.use((req,res,next) => {  
  console.log("Two");        
  next();                    
});                          

app.use((req,res,next) => {
  req.message = 'This message made it!' 
  next();
});
app.use((req,res,next) => {
  console.log(`Three: ${req.message}`);
  next(); 
          
});

app.use((req,res,next) => {
  console.log("Hello");
  const err = new Error("Nick's patent test hingmy, with a deliberate error in the first bit of middleware...");
  err.status = 500; 
  next(); // Use the line after this one to test the error-handling middleware instead of the not-found
          // default app.use().
  //next(err); 
})           
            
app.use((req,res,next) => {
  console.log("world");
  next();
})


// Main methods

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

// Error-handling middleware:



app.use((req,res,next) => {
  const err = new Error("Not found... :-(");
  err.status = 404;
  next(err);
})

app.use((err,req,res,next) => {
  res.locals.error = err; 
  res.status(err.status); 
                          
  res.render('error',err) 
})

//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

app.listen(3000, () => {
  console.log('The application is running on localhost.3000');
});


