const express = require("express");
const cors = require("cors");
const app = express();

const http = require("http").createServer(app);
http.listen(8081, function () {
  console.log(`listening port 8081`);
});

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../client/src/App.js"));
});
