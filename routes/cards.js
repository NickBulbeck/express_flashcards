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
router.get('/:id', (req, res) => {
	// You can set up data and variables here, in as complex a fashion as you like - i.e. you can call
	// a ton of other stuff - or you can add it in as a a variable in res.render. In the previous versions
	// (in the ./notes folder) they were set up at this point in the function, before res.render(). Here, we'll
	// set up the variable - in this case a nobject - in res.render() itself. And we'll use the request parameter.
	res.render('card',{
		prompt: cards[req.params.id].question,  // We could've set up id as, e.g., a random number based on
		hint:   cards[req.params.id].hint,      // cards.length. But we're going to use set it explicitly as
		answer: cards[req.params.id].answer	    // a parameter in the route the user types into the chrome
	});											// address bar.
})

module.exports = router;


// back to 4:59.