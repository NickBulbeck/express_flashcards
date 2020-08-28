const express = require('express');

const app = express();

// app.get() HANDLES get-requests: it's NOT sending one!
app.get('/', (req, res) => { // request, response - by convention
  res.send('<h1 style="font-family: sans-serif">I love TreeHouse...</h1>');
}); 

app.get('/hello', (req, res) => { // request, response - by convention
  res.send('<h2 style="font-family: sans-serif">Hello Nick, JS developer!</h1>');
}); 



app.listen(3000, () => {
  console.log('The application is running on localhost.3000');
});
