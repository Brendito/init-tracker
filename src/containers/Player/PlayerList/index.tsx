import React, { Component } from "react";
import { connect } from "react-redux";
import { Row } from "reactstrap";

import { Player } from "../../../models";
import PlayerListCard from "./PlayerListCard";

interface Props {
  className?: string;
  players?: Array<Player>;
}

interface StateProps {
  players: Array<Player>;
}

class PlayerList extends Component<Props, StateProps> {
  render() {
    return (
      <div>
        <h4>Saved Players</h4>
        <Row>
          {this.props.players &&
            this.props.players.map(char => {
              return <PlayerListCard key={char.id} {...char} />;
            })}
        </Row>
      </div>
    );
  }
}
const mapStateToProps = (state: any) => ({
  players: state.loaded.players
});

export default connect<{}, StateProps>(mapStateToProps)(PlayerList);
