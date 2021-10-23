import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import { Home, City, NoMatch } from "./features";
import { Routes } from "./constants";
import { Layout } from "./components";

import "./App.css";

function App() {
  return (
    <Layout>
      <Router>
        <Switch>
          <Route exact path={Routes.HOME}>
            <Home />
          </Route>
          <Route path={Routes.CITY}>
            <City />
          </Route>
          <Route path={Routes.NO_MATCH}>
            <NoMatch />
          </Route>
        </Switch>
      </Router>
    </Layout>
  );
}

export default App;
