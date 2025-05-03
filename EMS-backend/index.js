import express from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import dbConnect from "./db/dbConnect.js";
import router from "./routes/index.js";
import bodyParser from "body-parser";
import cors from "cors";

const app = express();
dotenv.config();

const port = process.env.PORT || 3000;

app.use(morgan("common"));
app.use(express.json()); // Already handles JSON bodies
app.use(bodyParser.urlencoded({ extended: true })); // Optional, for form data
app.use(cors());

app.use("/", router);

app.get("/", (req, res) => {
  console.log("Server is running on homepage");
  res.send("We are on the home page");
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
  dbConnect();
});
