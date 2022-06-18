import { signInWithEmailAndPassword } from "firebase/auth";
import React, { useState } from "react";
import { auth } from "../data/fireBase";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const [errorMsg, setErrorMsg] = useState(false);

  const loginHandler = () => {
    try {
      signInWithEmailAndPassword(auth, email, password);
      navigate("/");
    } catch (error) {
      console.log(error);
      setErrorMsg(true);
      setTimeout(() => {
        setErrorMsg(false);
      }, 2000);
    }
  };

  return (
    <div>
      <div className="container">
        <div className="border p-3 bg-light" style={{ marginTop: 70 }}>
          {errorMsg && <p>Please fill the inputs</p>}
          <h1>Login</h1>
          <div className="form-group mt-3">
            <label>email</label>
            <input
              type="email"
              className="form-control"
              placeholder="Enter your email"
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
          </div>
          <div className="form-group mt-3">
            <label>Password</label>
            <input
              type="password"
              className="form-control"
              placeholder="Enter your password"
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
          </div>
          <br />
          <button className="btn btn-primary" onClick={loginHandler}>
            Login
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
