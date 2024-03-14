const express = require("express")
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 8080;

var corsOptions = {
  origin: "http://localhost:8081"
};

app.use(cors(corsOptions));

app.use(express.json());
require("./routes/Todo.js")(app);
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}...`);
});