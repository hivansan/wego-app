import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Header from "./molecules/header";
import Footer from "./molecules/footer.jsx";

import Marketplace from "./pages/marketplace";
import Stats from "./pages/stats";
import GetListed from "./pages/getListed";
import Home from "./pages/home";

function App() {
  return (
    <div style={{ width: "100%", height: "100%" }}>
      <Header />
      <div style={{ minHeight: "calc(90vh - 140px)" }}>
        <Router>
          <Switch>
            <Route path="/marketplace">
              <Marketplace />
            </Route>
            <Route path="/stats">
              <Stats />
            </Route>
            <Route path="/getlisted">
              <GetListed />
            </Route>
            <Route path="/">
              <Home />
            </Route>
          </Switch>
        </Router>
      </div>
      <Footer />
    </div>
  );
}

export default App;
