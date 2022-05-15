import { useState } from "react";
import "../components/Card/Card.css";
import { Link } from "react-router-dom";

const Signup = ({ setAuth }) => {
  const [inputs, setInputs] = useState({
    email: "",
    password: "",
    name: "",
  });

  //deconstructing the values of the inputs useState object
  const { email, password, name } = inputs;

  const onChange = (e) => {
    setInputs({ ...inputs, [e.target.name]: e.target.value }); //take all inputs and take the name of the value and assign whatever is inputed to the name
  };

  const onSubmitForm = async (e) => {
    e.preventDefault(); //prevents page from refreshing

    try {
      const body = { email, password, name };

      const response = await fetch("http://localhost:3001/api/v1/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      const parseRes = await response.json();
      console.log(parseRes);

      if (parseRes.token) {
        //if there is a token generated
        localStorage.setItem("token", parseRes.token);
        setAuth(true);
      } else {
        setAuth(false);
      }
    } catch (err) {
      console.log(err.message);
    }
  };

  return (
    <div className="signup-page">
      <div className="card">
        <form onSubmit={onSubmitForm} className="signup">
          <label>
            <b>First Name</b>
          </label>
          {}
          <input
            value={name}
            onChange={(e) => onChange(e)}
            type="text"
            placeholder="Enter your first name"
            name="name"
            required
            className="form-control my-3"
          />
          <label>
            <b>Email</b>
          </label>
          {}
          <input
            value={email}
            onChange={(e) => onChange(e)}
            type="text"
            placeholder="Enter Email"
            name="email"
            required
          />

          <label>
            <b>Password</b>
          </label>
          {}
          <input
            value={password}
            onChange={(e) => onChange(e)}
            type="password"
            placeholder="Make a password"
            name="password"
            required
          />
          {}

          <button type="submit">Create Account</button>
        </form>
        <Link to="/login">Already have an account? Click here to login!</Link>
      </div>
    </div>
  );
};

export default Signup;
