import React, { Component } from "react";
import { connect } from "react-redux";
import { NavLink as RRNavLink } from "react-router-dom";
import {
  Button,
  Card,
  CardText,
  CardTitle,
  Col,
  Container,
  Jumbotron,
  NavLink,
  Row
} from "reactstrap";
import routes from "../../constants/routes";
import { Campaign } from "../../models";

interface Props {
  campaign: Campaign;
}

class CampaignPage extends Component<Props> {
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
              <NavLink tag={RRNavLink} to={routes.npcPage}>
                <Button> NPC Manager</Button>
              </NavLink>
            </Card>
          </Col>
          <Col sm="12" md="4">
            <Card body>
              <CardTitle>Saved Player Characters</CardTitle>
              <CardText>Save your party</CardText>
              <NavLink tag={RRNavLink} to={routes.playerPage}>
                <Button> Player Manager</Button>
              </NavLink>
            </Card>
          </Col>
          <Col sm="12" md="4">
            <Card body>
              <CardTitle>Encounters</CardTitle>
              <CardText>Saved Encounters</CardText>
              <NavLink tag={RRNavLink} to={routes.encountersPage}>
                <Button> Encounter Manager</Button>
              </NavLink>
            </Card>
          </Col>
        </Row>
      </Container>
    );
  }
}

const mapStateToProps = (state: any) => ({
  campaign: state.loaded
});

export default connect<{}, Props>(mapStateToProps)(CampaignPage);
