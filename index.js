const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
PORT = process.env.PORT || 3000;
const path = require("path");
const Bus = require("./models/bus");

const app = express();

mongoose
  .connect(process.env.MONGO_URL)
  .then(async () => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => console.log(err));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

app.get("/", (req, res) => {
  res.render("marga");
});
app.post("/", async (req, res) => {
  const { start, end } = req.body;
  console.log(start, end);
  try {
    const buses = await Bus.find({
      $and: [
        {
          $or: [
            { start_point: start },
            { end_point: start },
            { intermediateDestinations: start },
          ],
        },
        {
          $or: [
            { start_point: end },
            { end_point: end },
            { intermediateDestinations: end },
          ],
        },
      ],
    });

    if (buses.length === 0) {
      return res.status(404).send("No buses found matching the route");
    }
    console.log(buses);

    // Return the matching buses as a response or render a new page with the results
    res.render("results", { buses });
  } catch (error) {
    console.error(error);
    res.status(500).send("An error occurred while searching for buses");
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
