import React, { useState } from "react";
import "./Login.css";
import { LoginUtil } from "./LoginUtil";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState("");
  const [load, setLoad] = useState(false);
  const history = useNavigate();

  const disableButton = !email || password.length < 6 || load;

  const handleLogin = async (e) => {
    e.preventDefault();
    setErr(null);
    setLoad(true);
    try {
      await LoginUtil({ email, password });
      history("/home");
      setLoad(false);
    } catch (error) {
      setErr("Please enter correct password");
      setLoad(false);
    }
  };
  return (
      <>
    <form onSubmit={handleLogin}>
      <div id="loginform">
        <h2 id="headerTitle">Login</h2>
        <div>
          <div className="row">
            <label>Username</label>
            <input type="email" placeholder="Enter Your Username" value={email} onChange={(e) =>setEmail(e.target.value)} />
          </div>
          <div className="row">
            <label>Password</label>
            <input type="password" placeholder="Enter Your Password" value={password} onChange={(e) =>setPassword(e.target.value)}/>
          </div>
          <div className="error">{err}</div>
          <div id="button" className="row">
            <button type="submit" disabled={disableButton}>Log In</button>
          </div>
        </div>
      </div>
    </form>
    </>
  );
};

export default Login;
