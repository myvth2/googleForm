require("dotenv").config();
const express = require("express");
const cors = require("cors");
const passport = require("passport");
const authRoute = require("./routes/auth");
const userRoute = require("./routes/userRouter");
const cookieSession = require("cookie-session");
const passportStrategy = require("./passport");
const app = express();


const mongoose = require("mongoose")
const bodyParser = require("body-parser")
const cookieParser = require("cookie-parser");
const errMiddle = require("./middlewares/errorMiddlewares");

mongoose.set("strictQuery", false);
mongoose.connect(process.env.DATABASE, {
	useNewUrlParser: true,
	useUnifiedTopology: true,
	// useCreateIndex: true
  }).then(() => {
	console.log("DB CONNECTED")
  }).catch((err) => {
	console.error(err)
	console.log("UNABLE to connect to DB")
  })
// DB Connection
// const DATABASE = process.env.DATABASE
// mongoose.connect(DATABASE, {
// //   useCreateIndex: true,
// //   useFindAndModify: false,
//   useNewUrlParser: true,
//   useUnifiedTopology: true
// }, err => {
//   if (err) throw err;
//   console.log("Connect to MongoDB")
// })

app.use(
	cookieSession({
		name: "session",
		keys: ["cyberwolve"],
		maxAge: 24 * 60 * 60 * 100,
	})
);

// Use parsing middleware
app.use(bodyParser.json())
app.use(cookieParser())

app.use(passport.initialize());
app.use(passport.session());
app.use(express.json());

app.use(
	cors({
		origin: "http://localhost:3000",
		methods: "GET,POST,PUT,DELETE",
		credentials: true,
	})
);

app.use("/auth", authRoute);
app.use("/api", userRoute)

app.use(errMiddle.notFound)
app.use(errMiddle.errorHandler)

const port = process.env.PORT || 8080;
app.listen(port, () => console.log(`Listenting on port ${port}...`));