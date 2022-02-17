const express = require("express");

const app = express();
const port = 3000;

app
  .get("/", (req, res) => {
    res.send("You are on the homepage");
  })
  .get("/about", (req, res) => {
    res.send("You are on the about page");
  })
  .get("/contact", (req, res) => {
    res.send({
      email: "plotkin@newpaltz.edu",
      phone: "123-456-7890",
      twitter: "@jerpaltz",
      instagram: "@jerpaltz",
    });
  });

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});

//for package.json "^4.17.3" carrot means get me the latest "~4.17.3" tilda means get me all the patches "4.17.3" means get me exact version
