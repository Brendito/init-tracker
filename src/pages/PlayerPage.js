import React, { Component } from "react";
import { Container, Jumbotron } from "reactstrap";
import PlayerContainer from "../containers/PlayerContainer";

class PlayerPage extends Component {
  state = {};
  render() {
    return (
      <Container fluid>
        <Jumbotron>
          <h3>Player Manager</h3>
        </Jumbotron>
        <PlayerContainer />
      </Container>
    );
  }
}

export default PlayerPage;
