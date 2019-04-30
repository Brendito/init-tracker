import React, { Component } from 'react'
import { Route, Switch } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.css'
import './App.css'
import { library } from '@fortawesome/fontawesome-svg-core'
import {
   faEdit,
   faTimes,
   faCopy,
   faPlusSquare,
   faPlus,
   faMinus,
   faSearch,
   faThumbtack,
   faDiceD20,
   faShieldAlt,
   faHeartbeat,
} from '@fortawesome/free-solid-svg-icons'
import * as paths from '../../constants/routes'
import * as pages from '../../pages'
import NavigationBar from '../NavigationBar/NavigationBar'
import NpcFormContainer from '../../containers/NPC/NpcFormContainer'
import NpcContainer from '../../containers/NPC/NpcContainer'
import EncounterBuilder from '../EncounterBuilder/EncounterBuilder'
import PlayerForm from '../../components/PlayerForm/PlayerForm'
import NpcTemplateList from '../../containers/NPC/NpcTemplateList/NpcTemplateList'
require('typeface-noto-sans')
require('typeface-libre-baskerville')

library.add(
   faEdit,
   faTimes,
   faCopy,
   faPlusSquare,
   faPlus,
   faMinus,
   faSearch,
   faThumbtack,
   faDiceD20,
   faShieldAlt,
   faHeartbeat
)

class App extends Component {
   render() {
      return (
         <div className="App">
            <NavigationBar />
            <Switch>
               <Route exact path="/" component={pages.LandingPage} />
               <Route
                  path={paths.CAMPAIGN_BUILDER}
                  component={pages.Campaign}
               />
               <Route path={paths.NPC_PAGE} component={NpcContainer} />
               <Route
                  exact
                  path={paths.PLAYER_PAGE}
                  component={pages.PlayerPage}
               />
               <Route path={paths.PLAYER_FORM} component={PlayerForm} />

               <Route
                  exact
                  path={paths.ENCOUNTERS_PAGE}
                  component={pages.EncounterPage}
               />
               <Route
                  path={paths.ENCOUNTER_BUILDER}
                  component={EncounterBuilder}
               />
               <Route path={paths.NPC_FORM} component={NpcFormContainer} />
               <Route
                  path={paths.NPC_TEMPLATE_LIST}
                  component={NpcTemplateList}
               />
            </Switch>
         </div>
      )
   }
}

export default App
