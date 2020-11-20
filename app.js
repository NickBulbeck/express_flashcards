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
// contains further comments 

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


// The routes themselves



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


