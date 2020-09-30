var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var body_parser = require("body-parser");
const request = require("request");
const fs = require("fs");
const https = require("https");

var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");

var app = express();

const privateKey = fs.readFileSync("privkey.pem", "utf8");
const certificate = fs.readFileSync("cert.pem", "utf8");
const ca = fs.readFileSync("chain.pem", "utf8");

const credentials = {
  key: privateKey,
  cert: certificate,
  ca: ca
};

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// Serve static files from the React app
app.use(express.static(path.join(__dirname, "react-ui/build")));
app.use(body_parser.urlencoded({ extended: true }));
app.use(body_parser.json());

app.use("/", indexRouter);
app.use("/users", usersRouter);

app.post("/api/token/refresh/", (req, res) => {
  var options = {
    method: "POST",
    url: "http://saurabh9495.org:8000/api/token/refresh/",
    headers: {
      "cache-control": "no-cache",
      "Content-Type": "application/x-www-form-urlencoded"
    },
    form: { refresh: req.body.refresh }
  };
  request(options, function(error, response, body) {
    if (error) throw new Error(error);
    res.status(response.statusCode).send(body);
  });
});

app.post("/api/token/", (req, res) => {
  var options = {
    method: "POST",
    url: "http://saurabh9495.org:8000/api/token/",
    headers: {
      "cache-control": "no-cache",
      "Content-Type": "application/x-www-form-urlencoded"
    },
    form: {
      username: req.body.username,
      password: req.body.password,
      undefined: undefined
    }
  };

  request(options, function(error, response, body) {
    if (error) throw new Error(error);
    res.status(response.statusCode).send(body);
  });
});

app.get("/api/v1/data/created/", (req, res) => {
  var options = {
    method: "GET",
    url: "http://saurabh9495.org:8000" + req.url,
    headers: {
      "cache-control": "no-cache",
      "Content-Type": "application/x-www-form-urlencoded",
      Authorization: req.headers.authorization
    }
  };
  request(options, function(error, response, body) {
    if (error) throw new Error(error);
    res.status(response.statusCode).send(body);
  });
});

app.get("/api/v1/data/queued/", (req, res) => {
  console.log(req.url);
  var options = {
    method: "GET",
    url: "http://saurabh9495.org:8000" + req.url,
    headers: {
      "cache-control": "no-cache",
      "Content-Type": "application/x-www-form-urlencoded",
      Authorization: req.headers.authorization
    }
  };
  request(options, function(error, response, body) {
    if (error) throw new Error(error);
    res.status(response.statusCode).send(body);
  });
});

app.get("/api/v1/data/halt/", (req, res) => {
  console.log(req.url);
  var options = {
    method: "GET",
    url: "http://saurabh9495.org:8000" + req.url,
    headers: {
      "cache-control": "no-cache",
      "Content-Type": "application/x-www-form-urlencoded",
      Authorization: req.headers.authorization
    }
  };
  request(options, function(error, response, body) {
    if (error) throw new Error(error);
    res.status(response.statusCode).send(body);
  });
});

app.get("/api/v1/data/running/", (req, res) => {
  console.log(req.url);
  var options = {
    method: "GET",
    url: "http://saurabh9495.org:8000" + req.url,
    headers: {
      "cache-control": "no-cache",
      "Content-Type": "application/x-www-form-urlencoded",
      Authorization: req.headers.authorization
    }
  };
  request(options, function(error, response, body) {
    if (error) throw new Error(error);
    res.status(response.statusCode).send(body);
  });
});

app.get("/api/v1/data/abort/", (req, res) => {
  console.log(req.url);
  var options = {
    method: "GET",
    url: "http://saurabh9495.org:8000" + req.url,
    headers: {
      "cache-control": "no-cache",
      "Content-Type": "application/x-www-form-urlencoded",
      Authorization: req.headers.authorization
    }
  };
  request(options, function(error, response, body) {
    if (error) throw new Error(error);
    res.status(response.statusCode).send(body);
  });
});

app.get("/api/v1/data/deleted/", (req, res) => {
  console.log(req.url);
  var options = {
    method: "GET",
    url: "http://saurabh9495.org:8000" + req.url,
    headers: {
      "cache-control": "no-cache",
      "Content-Type": "application/x-www-form-urlencoded",
      Authorization: req.headers.authorization
    }
  };
  request(options, function(error, response, body) {
    if (error) throw new Error(error);
    res.status(response.statusCode).send(body);
  });
});

app.get("/api/v1/data/successful/", (req, res) => {
  console.log(req.url);
  var options = {
    method: "GET",
    url: "http://saurabh9495.org:8000" + req.url,
    headers: {
      "cache-control": "no-cache",
      "Content-Type": "application/x-www-form-urlencoded",
      Authorization: req.headers.authorization
    }
  };
  request(options, function(error, response, body) {
    if (error) throw new Error(error);
    res.status(response.statusCode).send(body);
  });
});

app.get("/api/v1/comments/:id", (req, res) => {
  var options = {
    method: "GET",
    url: "http://saurabh9495.org:8000" + req.url,
    headers: {
      "cache-control": "no-cache",
      Authorization: req.headers.authorization
    }
  };

  request(options, function(error, response, body) {
    if (error) throw new Error(error);
    res.status(response.statusCode).send(body);
  });
});

const httpsServer = https.createServer(credentials, app);

httpsServer.listen(443, () => {
  console.log("HTTPS Server running on port 443");
});
