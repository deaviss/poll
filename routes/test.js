const express = require('express');
const router = express.Router();
const Poll = require("../models/Poll")

router.get('/', (req, res) => {
	res.send("testing the vote system");
})


router.post("/vote", async (req, res) => {

	const { link, vote } = req.body;
	let sess = req.session;
	console.log(sess);
	if (sess.votedOn === undefined) {
		sess.votedOn = []
	}
	let hasVoted = sess.votedOn.filter(e => e.link == link).length > 0


	if (hasVoted)
		return res.json({ message: "You already voted" })

	try {

		const response = await Poll.find({ link: link });
		let obj = response[0];
		obj.answers[vote].voteCount = obj.answers[vote].voteCount + 1;
		try {
			const newRes = await Poll.findByIdAndUpdate(obj.id, obj);
			res.send(newRes);
		} catch (err) {
			console.log(err);
			res.send(err);
		}
	}
	catch (err) {
		return res.send(err)
	}

})



module.exports = router;