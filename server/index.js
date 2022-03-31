const express = require("express");
//tell professor to send a message to get classsroom fixed
const usersController = require("./controllers/users");

const app = express();
//needed process.env.PORT because every server has a different PORT heroku needs to run on that PORT they assign to use, they use environement variables
//every process has a bunch of environemnt variables in it that can be accessed, the process gets you the environemnt variables. .env has many environment variables in it.
//reverse proxy we come in to all the exact same server that handles thousands of different websites and based off the url, im going to execute another server and pass it back to the client
const port = process.env.PORT || 3000;
//if no environment variable exists then put us on port 3000
//Heroku will set that port
console.log(process.env);

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
