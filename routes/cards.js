// This part of the code was cut/pasted in from app.js, via ./routes/index.js; it's normal
// to have more than one routes file.

const express = require('express');		
const router = express.Router();		
const data = require('../data/flashcardData.json').data; // Notice how you get the top-level object
const cards = data.cards;								 // out of a .json file.

// ES6 syntax: There's an unhelpful shorthand for the above, which is { data } and { cards }. It goes:
// const { cards } = data; - the braces add the name inside them as a property to data. More trouble than
// it's worth, to my mind.


// Note that this route file, as required into app.js, has a path of '/cards' set up for it.
// Thus, every route in this file will automatically be prefixed with '/cards', and will
// be accessed by the browser using routes beginning localhost:3000/cards.


// Now: we'll use a request parameter here. It's prefixed with a colon in the route, and is part of the
// request object's 'params' property. Express does this for us; that is, we create a foadyb variable, in
// this case id, and express inserts it into req.params for us.
// We'll also use a query string, like url?key1=value1&key2=value2
// You check for a query string using req.query.foadybKey - req.query is a built-in property

// This first yin redirects the user to a random card from the basic route
// <<website>>/cards with no id:

router.get('/', (req,res) => {	
	const randomID = Math.floor(Math.random() * cards.length);
	res.redirect(`/cards/${randomID}?side=question`); 
});													  

router.get('/blub', (req,res) => { // Part of my attempts to see what, if
	console.log("Blub");						 // anything, was going on with node
	res.send("<p>Blub</p>");				 // while I was trying to get a root
});																 // redirect to work.

router.get('/blubRedirect', (req,res) => {
	console.log("Blub redirect");
	res.redirect('/cards/2');
})


router.get('/:id', (req, res) => {

	let id = req.params.id;
	if (id >= cards.length) {
		console.log(`id = ${id}`);
		id = Math.floor(Math.random() * cards.length);
		console.log(`id = ${id}`);
	}
	const side = req.query.side || 'question';
	const text = cards[id][side];
	const hint = cards[id].hint;
	const name = req.cookies.username;

	const templateData = { id, text, name };

	if (side === 'question') {
		templateData.hint = hint;
		templateData.sideToShow = 'answer';
		templateData.sideToShowDisplay = 'Show the answer...';
	} else if (side === 'answer') {
		templateData.sideToShow = 'question';
		templateData.sideToShowDisplay = 'Show the question...';
	}

// You can't put comments in a pug template, so note what's going on in ../views/card.pug.
// the href for the <a> is set up as the last part of a route - that is, id followed by the
// query string. This works because it's rendered from here, which already has the route
// <<website>>/cards built in.

	res.render('card', templateData);
});

module.exports = router;



