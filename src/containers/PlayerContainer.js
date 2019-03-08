import React, { Component } from "react";
import { connect } from "react-redux";
import { Container, Row, Col } from "reactstrap";
import PlayerList from "../components/PlayerList/PlayerList";

class PlayerContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <Container>
        <PlayerList />
      </Container>
    );
  }
}

const mapStateToProps = state => ({
  players : state.campaign.loadedCampaign.characters.players
})

export default connect(mapStateToProps)(PlayerContainer);
