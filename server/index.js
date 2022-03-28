const express = require("express");
//tell professor to send a message to get classsroom fixed
const usersController = require("./controllers/users");

const app = express();
const port = 3000;

app

  //this line returns a middleware, static is a method from express.
  //this fucntion looks at the path see if any file inside public matches it and it will serve it up and call next()
  //what was your home directory when we started out app (server) we can use server/public/ or dirname + the path
  .use("/", express.static(__dirname + "/public/"))

  //this applies to all middleware so user in our created function was undefined because nothing was in the body we did not parse it
  .use(express.json())

  .get("/api/", (req, res) => {
    res.send("You are on the homepage");
  })
  .use("/api/users", usersController); //user controller is a router

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});

//for package.json "^4.17.3" carrot means get me the latest "~4.17.3" tilda means get me all the patches "4.17.3" means get me exact version
