const express = require('express');
const router = express.Router();
const Poll = require("../models/Poll")

router.get('/', (req, res) => {
	res.send("Trying to get vote, dummy")
})
/*


*/
router.post('/', async (req, res) => {
	//having trouble ?
	const { link, vote } = req.body;
	let sess = req.session;
	sess.votedOn = []
	if (sess.votedOn === undefined) {
		sess.votedOn = []
	}
	let hasVoted = sess.votedOn.filter(e => e.link == link).length > 0
	if (hasVoted)
		return res.json({ message: "You already voted" })
	else {
		try {
			const response = await Poll.find({ link: link });
			let obj = response[0];
			obj.answers[vote].voteCount = obj.answers[vote].voteCount + 1;
			const newRes = await Poll.findByIdAndUpdate(obj.id, obj,);

			sess.votedOn.push({ link, vote })
			console.log("voting")
			// res.json({ message: `Voted for ${vote}` });
			res.json(newRes);
		} catch (err) {
			res.send({ message: err })
		}
	}
})

module.exports = router;