import React, { Component } from "react";
import { ListGroup, Button } from "reactstrap";
import PlayerListCard from "./PlayerListCard/PlayerListCard";

class PlayerList extends Component {

  render() {
    return (
      <div>
        <h4>Saved Players</h4>
        <ListGroup>
          {this.props.players &&
            this.props.players.map(char => {
              return (
                <PlayerListCard
                  key={char.id}
                  {...char}
                />
              );
            })}
        </ListGroup>

        <Button onClick={this.props.addPlayer} className="mt-3">
          Create New Player
        </Button>
      </div>
    );
  }
}

export default PlayerList;