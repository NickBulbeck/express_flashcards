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

// static middleware:
//*************************************************************
// The basic middleware in express sets up what's called a static server. It looks like this:

// app.use(express.static('public'));  

                                    // There's one other, options, argument the .static() method
                                    // can have. Otherwise, you pass it the route of the folder
                                    // containing all the static methods. It's a foadyb folder,
                                    // but by convention is called 'public'. And this means that the
                                    // 'public' folder here is the **root** folder of the public 
                                    // assets as far as the code is concerned. So, in this project,
                                    // there's a public/stylesheets/style.css which we can even read
                                    // in the browser at localhost:3000/stylesheets/style.css.
// Because the route is at the root of the site, if we actually had a route called /stylesheets there could
// theoretically be a conflict. Unlikely... but if there's any route in your public folder that could conflict
// with a route in your main app, you get round it like this:
app.use('/static',express.static('public')); // So now you visit localhost:3000/static/stylesheets/style.css
// You then want to add the line <link rel="stylesheet" href="static/stylesheets/style.css"> to the header,
// which is in views/layout.pug - you actually want link(rel='stylesheet' href='/static/stylesheets/style.css')
// and I may need to research this a bit, because it'd be punctuated differently in an actual HTML file.
// But think of it as a route - this is a static server, whose route is /static - hence the leading / in the href.


// end of static stuff
//*************************************************************

const mainRoutes = require('./routes'); // remember the convetion that if the ./routes folder 
                                    // contains a file called index.js, node will import it
                                    // automatically. We could have require('./routes/index.js')
                                    // of course.
const cardRoutes = require('./routes/cards') // again, the .js extension is assumed by node

app.use(mainRoutes); // Note that you do need this - it's what links a' the routes to the app variable.
app.use('/cards',cardRoutes) // Here, we're using a path as a first argument. cardRoutes has already been
                             // pointed to the requisite file, and the path parameter further refines the
                             // routes in ./routes/cards.js - it adds the suffix '/cards' to them all.
// As a further note, we've used the flat file ./data/flashcardsData.json within ./routes/cards.js, which
// contains further comments.

app.use((req,res,next) => {  
  // console.log("One");        
  next();                    
  },                         
  (req,res,next) => {           
  // console.log("One point one"); 
  next();                       
  }
);

app.use((req,res,next) => {  
  console.log("Two");        
  next();                    
});                          

app.use((req,res,next) => {
  // req.message = 'This message made it!' 
  next();
});
app.use((req,res,next) => {
  // console.log(`Three: ${req.message}`);
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
  // console.log("world");
  next();
})


// The routes themselves



// Error-handling middleware:

app.use((req,res,next) => {
  const err = new Error("Not found... :-(");
  err.status = 404;
  next(err);
})

app.use((err,req,res,next) => {
  res.locals.error = err;
  if (err.status) {         // pug templates create bizarre and anomalous 'undefined' error
    res.status(err.status); // status values when they crash - which they can do for the
  } else {                  // most trivial and inappropriate reasons. You need this code
    res.status(500);        // to get any kind of meaningful error message.
  }      
  res.render('error',err) 
})

//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

app.listen(3000, () => {
  console.log('The application is running on localhost.3000');
});


