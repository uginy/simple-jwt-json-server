const fs = require("fs");
const express = require("express");
const jsonServer = require("json-server");
const index = jsonServer.create();
const router = jsonServer.router("./fixtures/database.json");
const auth = require("./middleware/auth");
const countries = require("./middleware/countries");
const translate = require("./middleware/reverso");
const notifications = require("./middleware/notifications");
const rules = require("./middleware/rules");
const useSecure = false;

index.use(express.json());
index.use(jsonServer.defaults());

// Register New User
index.post("/auth/register", (req, res) => {
  console.log("register endpoint called; request body:");
  console.log(req.body);
  const { username, password } = req.body;

  if (auth.isAuthenticated({ username, password }) === true) {
    const status = 401;
    const message = "Username and Password already exist";
    res.status(status).json({ status, message });
    return;
  }

  fs.readFile("./fixtures/users.json", (err, dataBuff) => {
    if (err) {
      const status = 401;
      const message = err;
      res.status(status).json({ status, message });
      return;
    }
    // Get current users data
    const data = JSON.parse(dataBuff.toString());

    // Get the id of last user
    const last_item_id = data.users[data.users.length - 1].id;

    //Add new user
    data.users.push({ id: last_item_id + 1, username: username, password: password }); //add some data
    fs.writeFile("./fixtures/users.json", JSON.stringify(data), (err, _) => {
      // WRITE
      if (err) {
        const status = 401;
        const message = err;
        res.status(status).json({ status, message });
      }
    });
  });

  // Create token for new user
  const access_token = auth.createToken({ username, password });
  console.log("Access Token:" + access_token);
  res.status(200).json({ access_token, expires: auth.expiresIn, token_created: new Date(), username });
});

// Login to one of the users from ./users.json
index.post("/auth/login", (req, res) => {
  console.log("login endpoint called; request body:");
  console.log(req.body);
  const { username, password } = req.body;
  if (auth.isAuthenticated({ username, password }) === false) {
    const status = 401;
    const message = "Incorrect username or password";
    res.status(status).json({ status, message });
    return;
  }
  const access_token = auth.createToken({ username, password });
  console.log("Access Token:" + access_token);
  const user = auth.userProfile({ username });
  res.status(200).json({
    access_token,
    expires: auth.expiresIn,
    token_created: new Date(),
    username,
    language: user.language,
  });
});

index.use(/^(?!\/auth).*$/, (req, res, next) => {
  if (!useSecure) {
    next();
    return;
  }
  if (req.headers.authorization === undefined || req.headers.authorization.split(" ")[0] !== "Bearer") {
    const status = 401;
    const message = "Error in authorization format";
    res.status(status).json({ status, message });
    return;
  }
  try {
    let verifyTokenResult;
    verifyTokenResult = auth.verifyToken(req.headers.authorization.split(" ")[1]);

    if (verifyTokenResult instanceof Error) {
      const status = 401;
      const message = "Access token not provided";
      res.status(status).json({ status, message });
      return;
    }
    next();
  } catch (err) {
    const status = 401;
    const message = "Error access_token is revoked";
    res.status(status).json({ status, message });
  }
});

index.post("/reports-new", (req, res) => {
  const result = auth.databaseDB.reports.filter(auth.search, req.body);
  res.status(200).json({ count: result.length, data: result });
});

index.get("/countries", (req, res) => {
  const result = countries.countries();
  res.status(200).json({ count: result.length, data: result });
});

index.post("/countries", (req, res) => {
  const { country } = req.body;
  const result = countries.cities(country);
  res.status(200).json({ country, count: result.length, data: result });
});

// Rules helpers
index.get("/rule_types", (req, res) => {
  const result = rules.ruleTypes();
  res.status(200).json(result);
});

index.get("/rule_types/:id", (req, res) => {
  const result = rules.algorithmTypes(req.params.id);
  res.status(200).json(result);
});

index.post("/translate/:id", (req, res) => {
  const text = req.body.text;
  const to = req.params.id;
  translate.translate({ text, to }).then((result) => {
    res.status(200).json({ translated: result.translation[0] });
  });
});

index.get("/report-notifications/:date/:person_id", (req, res) => {
  const result = notifications.notificationsReport({ date: req.params.date, person_id: req.params.person_id });
  res.status(200).json(result);
});

index.use(router);

const port = process.env.PORT || 8090;
index.listen(port, () => {
  console.log("Run Auth API Server on port ", port);
});
