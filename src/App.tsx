import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import { Home, City, NoMatch } from "./features";
import { Routes } from "./constants/routes";

function App() {
  return (
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
  );
}

export default App;
