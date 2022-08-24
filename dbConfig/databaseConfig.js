const mongoose = require("mongoose");

const url =
	"mongodb+srv://shotkode:shotkode@cluster0.2kfdg.mongodb.net/TwitterDB?retryWrites=true&w=majority";
mongoose.connect(url).then(() => {
	console.log("database is connected");
});
