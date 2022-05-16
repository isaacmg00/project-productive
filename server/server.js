require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
const { db } = require("./db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const jwtGenerator = require("./utils/jwtGenerator");

const port = process.env.PORT || 5000;

let loggedUserUUID = "d4a7681c-bf50-478d-816f-cf535d871dfc";

app.use(cors());
app.use(express.json());

// get all todolist items
app.get("/ToDoPage", async (req, res) => {
  try {
    console.log("GET REQUEST TO /TODOPAGE");
    console.log(loggedUserUUID);

    let todo = [];

    const data = await db.query(
      "SELECT todo_item,todo_item_order FROM user_todo WHERE linked_user::text = '" +
        loggedUserUUID +
        "';"
    );
    console.log(data);
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

app.get("/api/v1/getName", async (req, res) => {
  try {
    const name = await db.query(
      "SELECT name FROM users WHERE user_id::text = '" + loggedUserUUID + "';"
    );
    res.status(200).json({
      name: name,
    });
  } catch (err) {
    console.error(err);
  }
});

//middleware for registration and login veryfication
app.use((req, res, next) => {
  const { email, name, password } = req.body; //destructure

  function validEmail(userEmail) {
    return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(userEmail); //checks if email is valid format
  }

  if (req.path === "/signup") {
    //if we go to the register page
    if (![email, name, password].every(Boolean)) {
      //if any input field is empty, throw error
      return res.status(401).json("Missing Credentials");
    } else if (!validEmail(email)) {
      //if email is not in valid format, throw error
      return res.status(401).json("Invalid Email");
    }
  } else if (req.path === "/login") {
    //if we go to the login page
    if (![email, password].every(Boolean)) {
      //if any input field is empty, throw error
      return res.status(401).json("Missing Credentials");
    } else if (!validEmail(email)) {
      //if email is not in valid format, throw error
      return res.status(401).json("Invalid Email");
    }
  }

  next();
});

app.post("/api/v1/register", async (req, res) => {
  console.log("WE GOT DATA");
  try {
    //1. destructure the req.body (name, email, password)
    const { name, email, password } = req.body;

    //2. Check if user exists (if user exist then throw error)
    const user = await db.query("SELECT * FROM users WHERE email = $1", [
      email,
    ]);

    if (user.rows.length !== 0) {
      return res.status(401).json("User already exists"); //401 = unauthenticated
    }
    //3. Bcrypt the user password
    const saltRound = 10; //how encrypted the password will be
    const salt = await bcrypt.genSalt(saltRound);

    //4. Enter the new user inside our database
    const newUser = await db.query(
      "INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING *",
      [name, email, password]
    );

    //5. generating our jwt token
    const token = jwtGenerator(newUser.rows[0].user_id); //passing in the new user's user_id to the jason web token generator

    res.json({ token });
    console.log("we added a user to the db");
    uuidQuery = await db.query(
      "select user_id from users where email='" + email + "';"
    );
    loggedUserUUID = uuidQuery.rows[0].user_id;
  } catch (err) {
    console.log(err.message);
    res.status(500).json("Server Error");
  }
});

//login route
app.post("/api/v1/login", async (req, res) => {
  try {
    //1. destructure the req.body
    const { email, password } = req.body;
    console.log("login hit");

    //2. check if user doesn't exist (if not then we throw error)
    const user = await db.query("SELECT * from users where email = $1", [
      email,
    ]);

    if (user.rows.length === 0) {
      return res.status(401).json("Password or Email is incorrect");
    }

    let validPassword;
    const query = await db.query(
      "SELECT password from users where email ='" + email + "';"
    );
    const dbPW = query.rows[0].password;
    if (dbPW === password) {
      validPassword = true;
    } else {
      validPassword = false;
    }
    //Comparing inputed password with the password in the database
    if (!validPassword) {
      return res.status(401).json("Password or Email is incorrect");
    }

    //4. give them the jwt token
    const token = jwtGenerator(user.rows[0].user_id);

    res.json({ token });
    uuidQuery = await db.query(
      "select user_id from users where email='" + email + "';"
    );
    loggedUserUUID = uuidQuery.rows[0].user_id;
  } catch (err) {
    console.log(err.message);
  }
});

//authorization route
app.post("/api/v1/restaurants/is-verify", async (req, res) => {
  try {
    res.json(true); //if token is valid then, return true statement that the user's token is valid
  } catch (err) {
    console.log(err.message);
    res.status(500).send("Server Error");
  }
});

app.options("*", (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type"); // Add other headers here
  res.setHeader("Access-Control-Allow-Methods", "POST"); // Add other methods here
  res.send();
});

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Methods", "POST, GET, OPTIONS");
  next();
});

app.post("/api/v1/habits", async (req, res) => {
  res.status(201).send("post to habits");
  const formInput = req.body.input;
  console.log(loggedUserUUID);
  console.log(req.body.input);
  insertTodo = await db.query(
    "INSERT INTO user_habits (linked_user, user_habit) values ('" +
      loggedUserUUID +
      "','" +
      formInput +
      "');"
  );
});

app.post("/api/v1/todo", async (req, res) => {
  res.status(201).send("post to todo");
  const formInput = req.body.input;
  console.log(loggedUserUUID);
  console.log(req.body.input);
  insertTodo = await db.query(
    "INSERT INTO user_todo (linked_user, todo_item, todo_item_order) values ('" +
      loggedUserUUID +
      "','" +
      formInput +
      "','1');"
  );
});

app.listen(port, () => {
  console.log(`server is up and listening on port ${port}`);
});
