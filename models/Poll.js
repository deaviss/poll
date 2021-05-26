const mongoose = require("mongoose")

const PollSchema = mongoose.Schema({
	question: String,
	answers: [
		{
			answer: String,
			voteCount: {
				type: Number,
				default: 0
			}
		}
	],
	date: {
		type: Date,
		default: Date.now
	},
	link: String
})

module.exports = mongoose.model("Polls", PollSchema);