const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const server = require("./routes/Server");
const app = express();
app.use(cors({origin: '*'}));
app.use(express.json());
app.use("/server",server);
mongoose
  .connect("mongodb+srv://rohnitshriyan:rohnitvs@cluster0.weq1x.mongodb.net/JusChat?retryWrites=true&w=majority", {})
  .then(() => console.log("Connected to MongoDB database"))
  .catch((err) => console.error("Failed to connect to MongoDB database", err));

app.use("/server", server);
app.get("/", (req, res) => {
  res.send("hello");
});

app.listen(8000, () => console.log("url: http://localhost:8000/"));
