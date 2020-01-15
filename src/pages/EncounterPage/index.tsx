import React, { Component } from "react";
import { Container, Jumbotron } from "reactstrap";
import EncounterContainer from "../../containers/Encounter";

class EncounterPage extends Component {
  state = {
    toggleJumbo: false
  };

  render() {
    return (
      <Container fluid>
        <Jumbotron className={!this.state.toggleJumbo ? "null" : "hidden"}>
          <h3>Encounter Manager</h3>
          <p>
            Create, edit and delete the encounters you will torment your party
            with.
          </p>
        </Jumbotron>
        <EncounterContainer />
      </Container>
    );
  }
}

export default EncounterPage;
