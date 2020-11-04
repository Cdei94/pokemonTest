import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Layout from "./Views/Layout";
import Pokemons from "./Views/Pokemons";

function App() {
  return (
    <Router>
      <Layout />
      <Switch>
        <Route path="/pokemons" exact component={Pokemons} />
      </Switch>
    </Router>
  );
}

export default App;
