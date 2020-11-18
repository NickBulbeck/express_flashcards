// The idea is to have your routes in a separate file. They go in a routes/ folder, and if you call it index.js
// node recognises this by default. That is, rather like index.html and index.php, if you reference a folder in
// node, if the folder contains an index.js file it will be loaded by default.

// "Relying on this convention will make my code a little simpler and easier to read" - no, it won't!

const express = require('express');		// Still need this, because it's accessed within this file.
const router = express.Router();		// This can have middleware and routes added to it.

// Routes cut and pasted in from the router.js file built up over the previous three versions. In router.js, they
// were attached to the 'app' variable which, remember, was set up as const app = express(). Here, we don't
// need the .use(), .set() or .listen() methods, which is why we're just going with express.Router().
// so, what was router.get(etc etc) in the previous versions, is now router.get().
// 
// 

router.get('/', (req, res) => { 
  const nameFromCookie = req.cookies.username;
  if (nameFromCookie) {
  	res.render('index',{ name:nameFromCookie } );
  } else {
  	res.redirect('/hello');
  }
}); 


router.get('/index', (req, res) => { 
  res.render('index') 
}); 

router.get('/sandbox', (req, res) => {
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


router.get('/hello', (req,res) => {
  if (req.cookies.username) {
  	res.redirect('/');
  } else {
  	res.render('hello');
  }
})

router.post('/hello', (req,res) => {
  res.cookie('username', req.body.username); 
  res.redirect('/'); 
})
												
router.post('/goodbye', (req,res) => {
	res.clearCookie('username');
	res.redirect('/hello');
})

module.exports = router; // don't forget this! 

