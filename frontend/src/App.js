import React from "react";
import { Route, Switch } from "react-router-dom";
import HomePage from "./pages/HomePage";
import FormsPage from "./pages/FormsPage";
import SummaryPage from "./pages/SummaryPage";
import "./App.css";
import LoginPage from "./pages/LoginPage";

function App() {
  return (
    <div className="app">
      <Switch>
        <Route path="/responses">
          <HomePage />
        </Route>
        <Route path="/forms">
          <FormsPage />
        </Route>
        <Route path="/summary">
          <SummaryPage />
        </Route>
        <Route path="/" exact>
          <LoginPage />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
