import * as React from "react";
import { Route, Switch } from "react-router-dom";

import routes from "../constants/routes";
import EncounterBuilder from "../containers/Encounter/EncounterBuilder";
import NpcContainer from "../containers/NPC";
import NpcFormContainer from "../containers/NPC/NpcFormContainer";
import NpcTemplateList from "../containers/NPC/NpcTemplateList";
import PlayerForm from "../containers/Player/PlayerForm/PlayerForm";
import pages from "../pages";

const router = [
  {
    exact: true,
    path: routes.landingPage,
    component: pages.LandingPage
  },
  {
    exact: false,
    path: routes.campaignBuilder,
    component: pages.Campaign
  },
  {
    exact: false,
    path: routes.npcPage,
    component: NpcContainer
  },
  {
    exact: false,
    path: routes.npcForm,
    component: NpcFormContainer
  },
  {
    exact: true,
    path: routes.playerPage,
    component: pages.PlayerPage
  },
  {
    exact: false,
    path: routes.playerForm,
    component: PlayerForm
  },
  {
    exact: true,
    path: routes.encountersPage,
    component: pages.EncounterPage
  },
  {
    exact: false,
    path: routes.encounterBuilder,
    component: EncounterBuilder
  },
  {
    exact: false,
    path: routes.npcTemplateList,
    component: NpcTemplateList
  }
];

const RouteManager = () => {
  return (
    <Switch>
      {router.map((route, i) => {
        return route.exact ? (
          <Route key={i} exact path={route.path} component={route.component} />
        ) : (
          <Route key={i} path={route.path} component={route.component} />
        );
      })}
    </Switch>
  );
};

export default RouteManager;
