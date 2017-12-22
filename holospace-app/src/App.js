import React from "react";
import PropTypes from "prop-types";
import { Route, Switch } from "react-router-dom";

// components
import Home from "./components/pages/home";

import Login from "./components/pages/login";
import Register from "./components/pages/register";
import Confirmation from "./components/pages/confirmation";
import ResetPassword from "./components/pages/resetPassword";

import Profile from "./components/pages/profile";
import Main from "./components/pages/main";
import DMsg from "./components/pages/dmsg";
import VR from "./components/pages/vr";

import UserRoute from "./components/routes/userRoute";
import GuestRoute from "./components/routes/guestRoute";

import NotFound from "./components/pages/notFound";

const App = ({ location }) => (
  <div className="App">
    <Switch>
      <Route location={location} path="/" exact component={Home} />
      <Route location={location} path="/confirmation/:token" exact component={Confirmation} />

      <GuestRoute location={location} path="/login" exact component={Login} />
      <GuestRoute location={location} path="/register" exact component={Register} />
      <GuestRoute location={location} path="/reset_password/:token" exact component={ResetPassword} />

      <UserRoute location={location} path="/@me" exact component={Profile} />
      <UserRoute location={location} path="/channels/:serverId/:channelId" exact component={Main} />
      <UserRoute location={location} path="/channels/:serverId/vr/:channelId" exact component={VR} />
      <UserRoute location={location} path="/direct/channels" exact component={DMsg} />

      <Route location={location} component={NotFound} />
    </Switch>
  </div>
);

App.propTypes = {
  location: PropTypes.shape({
    pathname: PropTypes.string.isRequired
  }).isRequired
};

export default App;
