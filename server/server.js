require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();
const { db } = require("./db");

const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.listen(port, () => {
  console.log(`server is up and listening on port ${port}`);
});

//todo page
app.get("/ToDoPage", async (req, res) => {
  try {
    console.log("GET REQUEST TO /TODOPAGE");
    const data = await db.query("SELECT * FROM user_habits;");

    res.status(200).json({
      status: "success",
      results: data.rows.length,
      data: {
        habits: data.rows,
      },
    });
  } catch (err) {
    console.error(err);
  }
});

//habit-tracker
app.get("/habit-tracker", async (req, res) => {
  try {
    console.log("GET REQUEST TO HABIT TRACKER");
    const data = await db.query("SELECT * FROM user_habits;");

    res.status(200).json({
      status: "success",
      results: data.rows.length,
      data: {
        habits: data.rows,
      },
    });
  } catch (err) {
    console.error(err);
  }
});

//signup
app.get("/signup", async (req, res) => {
  try {
    console.log("GET REQUEST TO SIGNUP");
    const data = await db.query("SELECT * FROM user_habits;");

    res.status(200).json({
      status: "success",
      results: data.rows.length,
      data: {
        habits: data.rows,
      },
    });
  } catch (err) {
    console.error(err);
  }
});
