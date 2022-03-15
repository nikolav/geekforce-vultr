const express      = require("express");
const cookieParser = require("cookie-parser");
const logger       = require("morgan");
const cors         = require("cors");

const indexRouter = require("./routes/index");

const app = express();

app.use(logger("combined"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors());
// app.use(express.static(path.join(__dirname, 'public')));

app.use("/", indexRouter);


module.exports = app;
