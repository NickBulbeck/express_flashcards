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



app.use('/static',express.static('public')); 

const mainRoutes = require('./routes');  
                                   
const cardRoutes = require('./routes/cards') 

app.use(mainRoutes); 
app.use('/cards',cardRoutes) 


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


