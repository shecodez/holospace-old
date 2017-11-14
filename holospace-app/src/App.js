import React from "react";
import PropTypes from "prop-types";
import { Route } from "react-router-dom";

// components
import Home from "./components/pages/home";
import Login from "./components/pages/login";
import Register from "./components/pages/register";
import Main from "./components/pages/main";
import Confirmation from "./components/pages/confirmation";
import ResetPassword from "./components/pages/resetPassword";
import UserRoute from "./components/routes/userRoute";
import GuestRoute from "./components/routes/guestRoute";

const App = ({ location }) => (
  <div className="App">
    <Route location={location} path="/" exact component={Home} />
    <Route location={location} path="/confirmation/:token" exact component={Confirmation} />
    <GuestRoute location={location} path="/login" exact component={Login} />
    <GuestRoute location={location} path="/register" exact component={Register} />
    <GuestRoute location={location} path="/reset_password/:token" exact component={ResetPassword} />
    <UserRoute location={location} path="/channels/@me" exact component={Main} />
  </div>
);

App.propTypes = {
  location: PropTypes.shape({
    pathname: PropTypes.string.isRequired
  }).isRequired
};

export default App;
