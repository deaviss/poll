const express = require('express');
const router = express.Router();
const Poll = require("../models/Poll")

router.get('/', (req, res) => {
	res.send("Trying to get createPoll, dummy")
})
router.post('/', async (req, res) => {
	// console.log(req.body)
	const { question, answers } = req.body
	//cool 
	// done
	let alphabet = 'qazwsxedcrfvtgbyhnujmikolp1234567890QAZWSXEDCRFVTGBYHNUJMIKLOP'
	let linkLength = 13;
	let link = "";
	for (var i = 0; i < linkLength; i++) {
		link += alphabet[Math.floor(Math.random() * (alphabet.length))];
	}
	const poll = new Poll({
		question,
		answers,
		link
	})
	try {
		const savedPoll = await poll.save();
		res.json(savedPoll);
	} catch (err) {
		res.json({ message: err })
	}
})

module.exports = router;