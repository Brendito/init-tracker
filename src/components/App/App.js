import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";
import "./App.css";
import "bootstrap/dist/css/bootstrap.css";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faEdit, faTimes } from "@fortawesome/free-solid-svg-icons";
import * as paths from "../../constants/routes";
import LandingPage from "../../pages/LandingPage";
import CampaignBuilder from "../CampaignBuilder/CampaignBuilder";

library.add(faEdit, faTimes);

class App extends Component {
  render() {
    return (
      <div className="App">
        <Switch>
          <Route exact path="/" component={LandingPage} />
          <Route path={paths.CAMPAIGN_BUILDER} component={CampaignBuilder} />
        </Switch>
      </div>
    );
  }
}

export default App;
