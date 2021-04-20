const fs = require("fs");
const express = require("express");
const jsonServer = require("json-server");
const index = jsonServer.create();
const router = jsonServer.router("./fixtures/database.json");
const auth = require("./middleware/auth");
const apiRouter = require('./routes/index')
const useSecure = false;
const reportsMiddleware = require('./middleware/reportsMiddleware')

index.use(express.json());
index.use(jsonServer.defaults());
index.use('/api', apiRouter)

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

index.use(router);

const port = process.env.PORT || 8090;
index.listen(port, () => {
  console.log("Run Auth API Server on port ", port);
});
