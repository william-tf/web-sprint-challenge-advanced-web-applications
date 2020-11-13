import React, { useState } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import BubblePage from './components/BubblePage'
import Login from "./components/Login";
import {PrivateRoute} from './components/PrivateRoute'
import "./styles.scss";

function App() {
  return (
    <Router>
      <div className="App">
        <Route exact path="/" component={Login} />
       <PrivateRoute exact path ='/colors' component={BubblePage}/>
      </div>
    </Router>
  );
}

export default App;
