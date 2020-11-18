// This part of the code was cut/pasted in from app.js, via ./routes/index.js; it's normal
// to have more than one routes file.

const express = require('express');		
const router = express.Router();		


// Note that this variable, as required into app.js, has a path of '/cards' set up for it.
// Thus, every route in this file will automatically be prefixed with '/cards', and will
// be accessed by the browser using routes beginning localhost:3000/cards.
router.get('/', (req, res) => {
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
		colours: ["red","blue"]
	}
	res.render('card',locals);
})

module.exports = router;