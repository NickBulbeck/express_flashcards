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

console.log("Is this file even still there?");


router.get('/:id', (req, res) => {

	let id = req.params.id;
	if (id >= cards.length) {
		console.log(`id = ${id}`);
		id = Math.floor(Math.random() * cards.length);
		console.log(`id = ${id}`);
	}
	const side = req.query.side || 'question';
	const text = cards[id][side];
	let hint = cards[id].hint;
	if (side === 'answer') {
		hint = null;
	}

	const templateData = { text,hint };
	res.render('card', templateData);
});

module.exports = router;



