import React, { Component } from "react";
import {connect} from 'react-redux'
import {
  Container,
  Jumbotron
} from "reactstrap";


class CampaignManager extends Component {
  render() {
    return (
      <Container>
        <Jumbotron>Campaign Manager</Jumbotron>
        <h3>List Campaigns Here</h3>

      </Container>
    );
  }
}

const mapStateToProps = (state) => {
    return {campaigns: state.savedCampaigns}
}

export default connect(mapStateToProps)(CampaignManager);
