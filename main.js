const express = require("express")
const mongoose = require('mongoose');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

var conf = {
	db: {
		dbName: 'poll',
		host: 'cluster0.moegj.mongodb.net',
		// port: 27017,  // optional, default: 27017
		username: 'admin', // optional
		password: 'admin1', // optional
		collection: 'sessi0ns' // optional, default: sessions
	},
	secret: '074a6f5sd894sfda5ea872411e433b9'
};


// var dbUrl = 'mongodb+srv://';
// dbUrl += conf.db.username + ':' + conf.db.password + '@';
// dbUrl += conf.db.host + ':' + conf.db.port;
// dbUrl += '/' + conf.db.db;

dbUrl = "mongodb+srv://admin:admin1@cluster0.moegj.mongodb.net/poll?retryWrites=true&w=majority"

app.use(session({
	resave: false,
	saveUninitialized: false,
	secret: conf.secret,
	store: MongoStore.create({ mongoUrl: dbUrl })
}));






mongoose.connect(dbUrl, {
	useNewUrlParser: true,
	useUnifiedTopology: true,
}, () => {
	console.log("DB connected")
	app.listen(1234);
	console.log("server listening at http://localhost:1234");
})


app.use("/createPoll", require("./routes/createPoll"))
app.use("/poll", require("./routes/poll"))
app.use("/vote", require("./routes/vote"))
app.use("/test", require("./routes/test.js"))