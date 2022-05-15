import { useState } from "react";
import "../App.css";

const Login = ({ setAuth }) => {
  const [inputs, setInputs] = useState({
    email: "", //defaults the email as blank
    password: "", //defaults the password as blank
  });

  const { email, password } = inputs;

  const onChange = (e) => {
    setInputs({ ...inputs, [e.target.name]: e.target.value }); //changes the name of the input to the current state of the input field
  };

  const onSubmitForm = async (e) => {
    e.preventDefault();

    try {
      const body = { email, password };
      const response = await fetch(
        "http://localhost:3001/api/v1/restaurants/login",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body),
        }
      );

      const parseRes = await response.json(); //getting the token and storing it in a variable

      if (parseRes.token) {
        //if there is a token generated
        localStorage.setItem("token", parseRes.token); //storing the token in the local storage
        setAuth(true);
        toast.success("login successfull!");
      } else {
        setAuth(false);
        toast.error(parseRes); //returning the error created in the login route in server.js
      }
    } catch (err) {
      console.error(err.message);
    }
  };
  return (
    <div className="signup-page">
      <div className="card">
        <div className="signup">
          <label>
            <b>Email</b>
          </label>
          <input type="text" placeholder="Enter Email" required />
          <label>
            <b>Password</b>
          </label>
          <input type="text" placeholder="Enter your password" required />

          <button type="submit">Login</button>
        </div>
      </div>
    </div>
  );
};

export default Login;
