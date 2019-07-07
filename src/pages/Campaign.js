import React, { Component } from "react";
import { connect } from "react-redux";
import * as paths from "../constants/routes"
import { NavLink as RRNavLink } from "react-router-dom";
import {
  Container,
  Jumbotron,
  Row,
  Col,
  Card,
  CardTitle,
  CardText,
  Button,
  NavLink
} from "reactstrap";

class CampaignPage extends Component {
  state = {};
  render() {
    return (
      <Container fluid>
        <Jumbotron>
          <h4>{this.props.campaign.campaignName}</h4>
          <p>Edit Campaign</p>
        </Jumbotron>
        <Row>
          <Col sm="12" md="4">
            <Card body>
              <CardTitle>Saved Non Player Characters</CardTitle>
              <CardText>Save custom Npc characters from templates</CardText>
              <NavLink tag={RRNavLink} to={paths.NPC_PAGE}><Button> NPC Manager</Button></NavLink>
            </Card>
          </Col>
          <Col sm="12" md="4">
            <Card body>
              <CardTitle>Saved Player Characters</CardTitle>
              <CardText>Save your party</CardText>
              <NavLink tag={RRNavLink} to={paths.PLAYER_PAGE}><Button> Player Manager</Button></NavLink>
            </Card>
          </Col>
          <Col sm="12" md="4">
            <Card body>
              <CardTitle>Encounters</CardTitle>
              <CardText>Saved Encounters</CardText>
              <NavLink tag={RRNavLink} to={paths.ENCOUNTERS_PAGE}><Button> Encounter Manager</Button></NavLink>
            </Card>
          </Col>
        </Row>
      </Container>
    );
  }
}

const mapStateToProps = state => ({
  campaign: state.loaded
});

export default connect(mapStateToProps)(CampaignPage);
