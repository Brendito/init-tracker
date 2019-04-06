import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";
import "./App.css";
import "bootstrap/dist/css/bootstrap.css";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faEdit, faTimes, faCopy, faPlusSquare, faPlus, faMinus } from "@fortawesome/free-solid-svg-icons";
import * as paths from "../../constants/routes";
import * as pages from "../../pages"
import NavigationBar from "../NavigationBar/NavigationBar"

library.add(faEdit, faTimes, faCopy, faPlusSquare, faPlus, faMinus);

class App extends Component {
  render() {
    return (
      <div className="App">
      <NavigationBar/>
        <Switch>
          <Route exact path="/" component={pages.LandingPage} />
          <Route path={paths.CAMPAIGN_BUILDER} component={pages.Campaign} />
          <Route path={paths.NPC_PAGE} component={pages.NpcPage}/>
          <Route path={paths.PLAYER_PAGE} component={pages.PlayerPage}/>
          <Route path={paths.ENCOUNTERS_PAGE} component={pages.EncounterPage}/>
        </Switch>
      </div>
    );
  }
}

export default App;
