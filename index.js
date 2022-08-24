require("dotenv").config();
require("./dbConfig/databaseConfig");
const cors = require("cors");
const express = require("express");
const mongoose = require("mongoose");
const port = process.env.PORT || 18000;
const http = require("http");
const app = express();

const server = http.createServer(app);

const { Server } = require("socket.io");

const io = new Server(server, { cors: { origin: "*" } });
const db = mongoose.connection;

io.on("connection", (socket) => {
	console.log("user connected", socket.id);
});

db.on("open", () => {
	const dbConnect = db.collection("users").watch();

	dbConnect.on("change", (change) => {
		console.log(change);
		if (change.operationType === "insert") {
			const file = {
				_id: change.fullDocument._id,
				username: change.fullDocument.username,
				email: change.fullDocument.email,
				password: change.fullDocument.password,
			};
			io.emit("observer", file);
			console.log(file);
		}
	});
});

app.use(cors());
app.use(express.json());
app.use("/api/user", require("./Route/UserRoutes"));

server.listen(port, () => {
	console.log(`listening on port ${port}`);
});
