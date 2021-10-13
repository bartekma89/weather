import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import { Home, City } from "./features";

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route path="/:city">
          <City />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
