import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/"></Route>
        <Route path="/:city"></Route>
      </Switch>
    </Router>
  );
}

export default App;
