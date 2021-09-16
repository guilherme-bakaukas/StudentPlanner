import React from "react";
import SignUpController from "./components/Auth/SignUp";
import LoginController from "./components/Auth/Login";
import Home from "./components/InitialPage/Home/Home";
import { Container } from "react-bootstrap";
import { AuthProvider } from "./context/AuthContext";
import { DatabaseProvider } from "./services/userServices";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

function App() {
  return (
      <AuthProvider>
              <Router>
                <Switch>
                  <Route exact path="/" component={LoginController} />
                  <Route exact path="/signup" component={SignUpController} />
                  <Route exact path="/home" component ={Home}/>
                </Switch>
              </Router>
      </AuthProvider>
  );
}

export default App;