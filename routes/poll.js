const express = require('express');
const router = express.Router();
const Poll = require("../models/Poll")

router.get('/:link', async (req, res) => {

	try {
		const poll = await Poll.findOne({ link: req.params.link })
		console.log(poll);
		res.json(poll)
	} catch (err) {
		res.json({ message: err })
	}
})

module.exports = router;