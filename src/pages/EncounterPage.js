import React, { Component } from 'react'
import { Container, Jumbotron } from 'reactstrap'
import EncounterContainer from '../containers/EncounterContainer'

class EncounterPage extends Component {
   state = {
      toggleJumbo: false,
   }

   toggleJumbo = () => {
      window.scrollTo(0, 0);
      this.setState({
         toggleJumbo: !this.state.toggleJumbo
      })
   }

   render() {
      return (
         <Container fluid>
            <Jumbotron className={!this.state.toggleJumbo ? null : "hidden"}>
               <h3>Encounter Manager</h3>
               <p>List encounters that are created, create new encounters.</p>
               <p>User can add from saved NPCs or copy one from NPC List.  Players are added to encounter at the time of the run. </p>
            </Jumbotron>
            <EncounterContainer toggleJumbo={this.toggleJumbo} />
         </Container>
      )
   }
}

export default EncounterPage
