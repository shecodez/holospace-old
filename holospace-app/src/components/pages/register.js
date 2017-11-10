import React from "react";
import { Link } from "react-router-dom";

const Register = () => (
  <div className="register-page">
    <h1>Create an Account</h1>

    <Link to="/login">Login</Link>
  </div>
);

export default Register;
