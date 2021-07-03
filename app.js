const debug = require("debug")("wetransport:app");
require("dotenv").config({ path: "./config/.env" });
const winston = require("winston");
const colors = require("colors");
const path = require("path");
const fs = require("fs");
const chalk = require("chalk");
const config = require("./config");
const moment = require("moment");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const fileUpload = require("express-fileupload");
const hbs = require("hbs");
const methodOverride = require("method-override");
var session = require("express-session");

// 📊 Logging
require("./startup/logging")(winston);
require("./startup/db")(winston);
const morgan = require("morgan");
const rfs = require("rotating-file-stream");

// 🏃‍♀️💨 Express app
const express = require("express");

// 🆔 Passport
// const passport = require('passport');
// const passportAuth = require('./authentication/passportAuth');

// Middleware imports
const middleware = require("./middlewares/index.middleware");

// 🔄 Router imports
const indexRouter = require("./routes/index.route");
const dashboardRouter = require("./routes/dashboard.route");
const mainRouter = require("./routes/main.route");

try {
  const app = express();

  // ⛑ Configure CSP headers
  if (process.env.NODE_ENV === "production") {
    require("./startup/prod")(app);
  }

  // -----------
  // MIDDLEWARES
  // -----------
  // 🗂 file handling
  app.use(fileUpload());
  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));
  app.use(cookieParser());
  app.use(express.static(path.join(__dirname, "public")));

  // res.locals is an object passed to hbs engine
  app.use(function (req, res, next) {
    res.locals.session = req.session;
    next();
  });

  app.use(
    session({
      secret: "secret",
      resave: false,
      saveUninitialized: true,
    })
  );

  //view engine
  app.set("views", path.join(__dirname, "views"));
  hbs.registerPartials(__dirname + "/views/partials");
  app.set("view engine", "hbs");

  //method override
  app.use(methodOverride("_method"));
  // ------------
  // APP LOGGING
  // ------
  // See config.winston.js

  /************************************************************* */
  // Configure authentication
  // passportAuth.initializePassport(passport);
  // app.use(passport.initialize());
  // app.use(passport.session());
  /************************************************************* */

  /************************************************************* */

  // To Allow cross origin requests originating from selected origins
  var corsOptions = {
    origin: "*",
    methods: ["GET, POST, OPTIONS, PUT, DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  };

  app.use(cors(corsOptions));

  /************************************************************** */

  // ------------
  // HTTP LOGGING
  // ------------
  let accessLogStream = rfs.createStream(`application-access-${moment(new Date()).format("YYYY-MM-DD")}.log`, {
    interval: "1d", // rotate daily
    path: path.join(config.logDir(), "http"),
  });

  // log only 4xx and 5xx responses to console
  app.use(
    morgan("dev", {
      skip: function (req, res) {
        return res.statusCode < 400;
      },
      stream: accessLogStream,
    })
  );
  app.use(morgan("combined", { stream: accessLogStream }));

  //
  // ROUTES
  // ------
  app.use("/", indexRouter);
  app.use("/dashboard", dashboardRouter);
  app.use(mainRouter);

  app.use(middleware.errorHandler);
  // Boot app
  app.listen(config.sitePort(), () => {
    console.log(chalk.blue.bold(" ---------------------------------------------------------"));
    console.log(chalk.blue.bold("| ") + chalk.bold("BOOTING"));
    console.log(chalk.blue.bold("|---------------------------------------------------------"));
    console.log(chalk.blue.bold("| ") + chalk.bold.green("NODE_ENV: ") + chalk(`${process.env.NODE_ENV}`));

    for (const [key, value] of Object.entries(config)) {
      console.log(chalk.blue.bold("| ") + chalk.bold.green(`${key}: `) + chalk(`${value()}`));
    }

    console.log(chalk.blue.bold("| ") + chalk.bold.green("Public app URL: ") + chalk(`${config.siteProtocol()}${config.siteDomain()}:${config.sitePort()}`));
    console.log(chalk.blue.bold(" ---------------------------------------------------------"));
  });
} catch (error) {
  console.error(chalk.bold.red("ERROR: "), error);
}
