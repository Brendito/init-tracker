import * as React from "react"
import * as pages from '../pages'
import * as routes from '../constants/routes';
import { Route, Switch } from 'react-router-dom';
import NpcFormContainer from '../containers/NPC/NpcFormContainer'
import NpcContainer from '../containers/NPC/NpcContainer'
import EncounterBuilder from '../containers/Encounter/EncounterBuilder/EncounterBuilder'
import PlayerForm from '../containers/Player/PlayerForm/PlayerForm'
import NpcTemplateList from '../containers/NPC/NpcTemplateList/NpcTemplateList'

const router = [
    {
        exact: true,
        path: routes.LANDING_PAGE,
        component: pages.LandingPage
    },
    {
        exact: false,
        path: routes.CAMPAIGN_BUILDER,
        component: pages.Campaign,
    },
    {
        exact: false,
        path: routes.NPC_PAGE,
        component: NpcContainer,
    },
    {
        exact: false,
        path: routes.NPC_FORM,
        component: NpcFormContainer,
    },
    {
        exact: true,
        path: routes.PLAYER_PAGE,
        component: pages.PlayerPage
    },
    {
        exact: false,
        path: routes.PLAYER_FORM,
        component: PlayerForm,
    },
    {
        exact: true,
        path: routes.ENCOUNTERS_PAGE,
        component: pages.EncounterPage,
    },
    {
        exact: false,
        path: routes.ENCOUNTER_BUILDER,
        component: EncounterBuilder,
    },
    {
        exact: false,
        path: routes.NPC_TEMPLATE_LIST,
        component: NpcTemplateList,
    },
];


const RouteManager = () => {
    return (
        <Switch>
            {router.map((route, i) => {
                return (
                    route.exact ?
                        <Route key={i} exact path={route.path} component={route.component} />
                        :
                        <Route key={i} path={route.path} component={route.component} />
                )
            })}

        </Switch>
    )
}

export default RouteManager;

