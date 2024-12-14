var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
require("dotenv").config();
//const pool = require("./configs/db");
const db = require("./database/models/index");
const cors = require("cors");
//const { body, validationResult } = require('express-validator')

const indexRouter = require("./routes/index");
const postikRouter = require("./routes/postik");
const commentRouter = require("./routes/comment");
const profileRouter = require("./routes/profile");
const searchRouter = require("./routes/search");
const subscriptionRouter = require("./routes/subscription");

var corsOptions = {
  origin: "http://localhost:3000",
  credentials: true,
};

var app = express();

app.use(cors(corsOptions));
// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

app.use(logger("dev"));

app.use(express.json());
app.use(express.urlencoded());
app.use(express.urlencoded({ extended: true }));
//app.use(multer().any());

app.use(cookieParser());
app.use(express.static(path.join(__dirname, "../public")));

app.use("/", indexRouter);
app.use("/profile", profileRouter);
app.use("/postik", postikRouter);
app.use("/comment", commentRouter);
app.use("/search", searchRouter);
app.use("/subscription", subscriptionRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

//db.authenticate()
//  .then(() => console.log("Database connected"))
//  .catch((err) => console.error("Error connecting to database:", err));

db.sequelize
  .sync()
  .then(() => {
    //initial();
    console.log("Synced db.");
  })
  .catch((err) => {
    console.log("Failed to sync db: " + err.message);
  });

//db.sequelize.sync({ force: true }).then(() => {
//  console.log("Drop and re-sync db.");
//});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

/*pool.query("SELECT NOW()", (err, res) => {
  if (err) {
    console.error("Error connecting to the database", err.stack);
  } else {
    console.log("Connected to the database:", res.rows);
  }
});*/

app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`);
});

function initial() {
  db.Role.create({
    id: 1,
    Name: "user",
  });

  db.Role.create({
    id: 2,
    Name: "moderator",
  });

  db.Role.create({
    id: 3,
    Name: "admin",
  });
}

module.exports = app;
