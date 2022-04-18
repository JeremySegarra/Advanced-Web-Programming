require("dotenv").config();

const express = require("express");

const userModel = require("./models/user");
const usersController = require("./controllers/users");
const postsController = require("./controllers/posts");

const { requireAuth } = require("./models/auth");

const app = express();

const port = process.env.PORT || 3000;

app
  .use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept"
    );
    next();
  })

  .use("/", express.static(__dirname + "/public/"))

  .use(express.json())

  .use((req, res, next) => {
    const auth = req.headers.authorization;

    if (auth) {
      //we use split because of bearer in our posts.http
      const token = auth.split(" ")[1];
      userModel
        .fromToken(token)
        .then((user) => {
          req.user = user;
          next(); //need to call next in middleware otherwise it will not go to the next middleware
        })
        .catch(next);
    } else {
      next();
    }
  })

  .get("/api/", (req, res) => {
    res.send(
      "You are at the root of the API. For the best class ever - " +
        process.env.BEST_CLASS_EVER //we are useing our own environement varaible here
    );
  })
  .use("/api/users", usersController) //user controller is a router
  .use("/api/posts", /*requireAuth,*/ postsController) //we pass requireAuth before postsController and if its true it will call next and use postsController

  //we want our error handling done here at the end

  .use((err, req, res, next) => {
    console.error(err);

    res
      .status(err.statusCode || 500)
      .send({ errors: [err.message ?? "Internal Server Error"] });
  });

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});

//for package.json "^4.17.3" carrot means get me the latest "~4.17.3" tilda means get me all the patches "4.17.3" means get me exact version

//We never store a password in our server we only save a hash of the password
//a one way hash is one way
// even if we do not know what the hash password is we can always compare the hashes to make sure they are the same.
//if a hacker can hack into your server and download all the hashes, that take the most common passwords and just match the hashes to crack the password
//so what we want to do before we hash a password do not hash it directly, if you append a name before every single password it will produce a different hash that the rainbow tables (SALTS)
//to get even better we create a hash to every single password then add it to the beginning then hash it again with a random hash.
//

//needed process.env.PORT because every server has a different PORT heroku needs to run on that PORT they assign to use, they use environement variables
//every process has a bunch of environemnt variables in it that can be accessed, the process gets you the environemnt variables. .env has many environment variables in it.
//reverse proxy we come in to all the exact same server that handles thousands of different websites and based off the url, im going to execute another server and pass it back to the client

//require("dotenv").config(); this allows us to create our own environemnt variables we downloaded in Package json too only have to do this once in the application
//the reason we do this is because we do not want to use the same port users are using your app on
//in heroku we can go to settings and set the envorionment variables that we have in our .env file

//if no environment variable exists then put us on port 3000
//Heroku will set that port
//Setting envorionment variables on your local computer will not affect the varaibles on Heroku
// console.log(process.env);

//this line returns a middleware, static is a method from express.
//this fucntion looks at the path see if any file inside public matches it and it will serve it up and call next()
//what was your home directory when we started out app (server) we can use server/public/ or dirname + the path

// .use(express.json()) this applies to all middleware so user in our created function was undefined because nothing was in the body we did not parse it
