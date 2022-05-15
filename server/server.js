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

app.use(cors());
app.use(express.json());

//test route
app.get("/test", async (req, res) => {
  res.status(200);
  res.send({
    name: "Bill",
  });
});

// get all todolist items
app.get("/ToDoPage", async (req, res) => {
  try {
    console.log("GET REQUEST TO /TODOPAGE");
    let todo = [];

    const data = await db.query(
      "SELECT todo_item,todo_item_order FROM user_todo WHERE linked_user::text = '" +
        loggedUserUUID +
        "';"
    );
    let numItems = data.rows.length;
    for (let i = 0; i < numItems; i++) {
      console.log(i);
      todo[i] = data.rows[i].todo_item;
    }
    console.log(todo);

    res.status(200).json({
      todoItems: todo,
      status: "success",
      todoListItems: data.rows.length,
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
    let habits = [];
    const data = await db.query(
      "SELECT user_habit FROM user_habits WHERE linked_user::text = '" +
        loggedUserUUID +
        "';"
    );
    let numHabits = data.rows.length;
    for (let i = 0; i < numHabits; i++) {
      console.log(i);
      habits[i] = data.rows[i].user_habit;
    }

    console.log(habits);

    res.status(200).json({
      habits: habits,
      status: "success",
      numHabits: data.rows.length,
    });
  } catch (err) {
    console.error(err);
  }
});

app.listen(port, () => {
  console.log(`server is up and listening on port ${port}`);
});
