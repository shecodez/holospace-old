import React from "react";
import PropTypes from "prop-types";
import { Route } from "react-router-dom";

// components
import Home from "./components/pages/home";
import Login from "./components/pages/login";
import Register from "./components/pages/register";
import Main from "./components/pages/main";
import UserRoute from "./components/routes/userRoute";
import GuestRoute from "./components/routes/guestRoute";

const App = ({ location }) => (
  <div className="App">
    <Route location={location} path="/" exact component={Home} />
    <GuestRoute location={location} path="/login" exact component={Login} />
    <GuestRoute location={location} path="/register" exact component={Register} />
    <UserRoute location={location} path="/channels/@me" exact component={Main} />
  </div>
);

App.propTypes = {
  location: PropTypes.shape({
    pathname: PropTypes.string.isRequired
  }).isRequired
};

export default App;
