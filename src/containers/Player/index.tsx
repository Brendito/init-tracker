import { v4 } from "node-uuid";
import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Button, Container } from "reactstrap";

import routes from "../../constants/routes";
import PlayerList from "./PlayerList";

class PlayerContainer extends Component {
  render() {
    return (
      <Container fluid>
        <PlayerList className="mb-2" />
        <hr />

        <Link
          to={{
            pathname: `${routes.playerForm}${"new-player"}`,
            state: {
              playerId: v4()
            }
          }}
        >
          <Button color="primary">Create New Player</Button>
        </Link>
      </Container>
    );
  }
}

export default PlayerContainer;
