import React, { Component } from "react";
import { handleCharacterIcon } from "../../../utils/characterIconUtil";
import { ListGroupItem } from "reactstrap";

class PlayerListCard extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <ListGroupItem key={this.props.id} onClick={this.toggleEditor}>
        <div className="d-flex">
          <div className="characterIcon mr-2">
            {handleCharacterIcon(this.props.characterClass)}
          </div>
          <div>
            <div className="d-flex flex-column justify-content-between">
              <div>
                <h5> {this.props.characterName} </h5>
                <h6> {this.props.playerName} </h6>
              </div>
              <div>
                <span>
                  Level {this.props.characterLevel} {this.props.characterRace}{" "}
                  {this.props.characterClass}
                </span>
              </div>
            </div>
          </div>
        </div>
      </ListGroupItem>
    );
  }
}

export default PlayerListCard;
