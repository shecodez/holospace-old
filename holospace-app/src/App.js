import React from "react";
import { Route } from "react-router-dom";

// components
import Home from "./components/pages/home";
import Login from "./components/pages/login";
import Register from "./components/pages/register";

const App = () => (
  <div className="App">
    <Route path="/" exact component={Home} />
    <Route path="/login" exact component={Login} />
    <Route path="/register" exact component={Register} />
  </div>
);

export default App;
