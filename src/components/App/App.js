import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";
import "./App.css";
import "bootstrap/dist/css/bootstrap.css";
import AddCharacterForm from "../../containers/CharacterFormContainer";
import Tracker from "../Tracker/Tracker";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faEdit, faTimes } from "@fortawesome/free-solid-svg-icons";
import * as paths from "../../constants/routes";
import LandingPage from "../../pages/LandingPage";
import CampaignManager from "../../pages/CampaignManager";

library.add(faEdit, faTimes);

class App extends Component {
  render() {
    return (
      <div className="App">
        <AddCharacterForm />
        <Tracker />
        <Switch>
          <Route exact path="/" component={LandingPage} />
          <Route path={paths.CAMPAIGN_MANAGER} component={CampaignManager} />
        </Switch>
      </div>
    );
  }
}

export default App;
