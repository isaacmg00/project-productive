require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
const { db } = require("./db");

const port = process.env.PORT || 5000;

// populate this value with the UUID value of the current user that is logged in

// TEST w/uuid =  b4f1bff6-c72a-48bd-9956-298c3c8aa9ce (user1)
let loggedUserUUID = "b4f1bff6-c72a-48bd-9956-298c3c8aa9ce";

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());
app.use(express.json());

//test route
app.get("/test", (req, res) => {
  res.status(200);
  console.log(req);
  res.send({
    name: "Bill",
  });
});

// get all todolist items
app.get("/ToDoPage", async (req, res) => {
  try {
    console.log("GET REQUEST TO /TODOPAGE");
    const data = await db.query(
      "SELECT todo_item,todo_item_order FROM user_todo WHERE linked_user::text = '" +
        loggedUserUUID +
        "';"
    );
    console.log(data);

    res.status(200).json({
      status: "success",
      todoListItems: data.rows.length,
      data: {
        habits: data.rows,
      },
    });
  } catch (err) {
    console.error(err);
  }
});

// get all user habits
app.get("/habit-tracker", async (req, res) => {
  /*
  //
  //uuid must be set once login functionality is implemented
  //
  */
  try {
    console.log("GET REQUEST TO HABIT TRACKER");
    const data = await db.query(
      "SELECT user_habit FROM user_habits WHERE linked_user::text = '" +
        loggedUserUUID +
        "';"
    );
    console.log(data);

    res.status(200).json({
      status: "success",
      numHabits: data.rows.length,
      data: {
        habits: data.rows,
      },
    });
  } catch (err) {
    console.error(err);
  }
});

app.listen(port, () => {
  console.log(`server is up and listening on port ${port}`);
});
