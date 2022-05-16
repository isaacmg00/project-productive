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

let loggedUserUUID = "0102b22f-06a6-439f-95c0-ed18d3ec5d07";

app.use(cors());
app.use(express.json());

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

//middleware for authorization to authorize the person. Making sure the token is legit
app.use((req, res, next) => {
  const jwtToken = req.header("token"); //get token from header

  if (!jwtToken) {
    //if there is no jwt token then the user is not authorized to access that entity
    return res.status(403).json("Not Authorized");
  }

  try {
    const verify = jwt.verify(jwtToken, process.env.jwtSecret); //checks to see if the jwt token is valid, if it is then we can return a payload that we can use within our routes

    req.user = verify.user; //user is from the jwtGenerator.js file
  } catch (err) {
    console.log(err.message);
    return res.status(403).json("Not Authorized");
  }
  next();
});

//authorization route
app.post("/api/v1/is-verify", async (req, res) => {
  try {
    res.json(true); //if token is valid then, return true statement that the user's token is valid
  } catch (err) {
    console.log(err.message);
    res.status(500).send("Server Error");
  }
});

app.post("/api/v1/habits", async (req, res) => {
  try {
    //1. destructure the req.body (name, email, password)
    //const { name, email, password } = req.body;
    console.log(req.body);
  } catch (err) {}
});

app.listen(port, () => {
  console.log(`server is up and listening on port ${port}`);
});
