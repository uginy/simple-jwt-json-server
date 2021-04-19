const fs = require("fs");
const auth = require("../middleware/auth");

const register = (req, res) => {
  console.log("register endpoint called; request body:");
  console.log(req.body);
  const { username, password } = req.body;

  if (auth.isAuthenticated({ username, password }) === true) {
    const status = 401;
    const message = "Username and Password already exist";
    res.status(status).json({ status, message });
    return;
  }

  fs.readFile("../fixtures/users.json", (err, dataBuff) => {
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
    fs.writeFile("../fixtures/users.json", JSON.stringify(data), (err, _) => {
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
};

module.exports = {
  register,
};
