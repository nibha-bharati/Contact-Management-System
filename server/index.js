const express = require("express");
const connectDB = require("./dbConnect");
const userRouter = require("./routes/userRoute.js");
const contactRouter = require("./routes/contactRoute.js");
const permissionRouter = require("./routes/permissionRoute.js");
const groupRouter = require("./routes/groupRoute.js");
const loginRouter = require("./routes/authRoute.js");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const bodyParser = require("body-parser");
const homeRouter=require("./routes/homeRoute.js")

const app = express();
const PORT = 5000;

app.use(
  cors({
    origin: ["http://localhost:5173"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);
app.use(bodyParser.json());

//Connecting to database
connectDB();

//Middleware
app.use(express.json());
app.use(cookieParser());

app.get("/", (req, res) => {
  res.send("Hello there");
});

//Routes
app.use("/user", userRouter);

app.use("/contact", contactRouter);

app.use("/permission", permissionRouter);

app.use("/group", groupRouter);

app.use("/login", loginRouter);

app.use("/home", homeRouter);

app.listen(PORT, () => console.log(`MongoDB server running on port ${PORT}`));
