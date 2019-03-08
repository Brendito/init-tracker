import React, { Component } from "react";
import { ListGroup, Button } from "reactstrap";
import PlayerListCard from "./PlayerListCard/PlayerListCard";

class PlayerList extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
      <div>
        <h4>Saved Players</h4>
        <ListGroup>
          {this.props.charList &&
            this.props.charList.map(char => {
              return (
                <PlayerListCard
                  onCharSubmit={this.handleCharSubmit}
                  key={char.id}
                  {...char}
                />
              );
            })}
        </ListGroup>

        <Button className="mt-3">
          Create New Player
        </Button>
      </div>
    );
  }
}

export default PlayerList;