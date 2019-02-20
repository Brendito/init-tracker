import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import { Container, Row, Col, Jumbotron, Button } from "reactstrap";
import CharacterList from "../CharacterList/CharacterList";
import { saveCampaign } from "../../actions/campaignActions";
import * as charTypes from "../../constants/characterTypes";
import * as contextTypes from "../../constants/contextTypes";
import "./style.css";

class CampaignBuilder extends Component {
  constructor(props) {
    super(props);
    this.state = {
      formContext: "",
      characterAddModalIsOpen: false,
      campaign: { ...this.props.campaign }
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSave = this.handleSave.bind(this);
  }

  componentWillReceiveProps() {
    this.forceUpdate();
  }

  handleSave(event) {
    event.preventDefault();
    this.props.saveCampaign(this.props.campaign);
  }

  handleChange(event) {
    const target = event.target;
    const value =
      target.type === "number" ? Number(target.value) : target.value;
    const name = target.name;
    this.setState({
      campaign: { ...this.state.campaign, [name]: value }
    });
  }

  render() {
    if (this.props.campaign === null) {
      return <Redirect to="/" />;
    }
    return (
      <Container>
        <Jumbotron>{this.props.campaign.campaignName}</Jumbotron>
        <Row>
          <Col md="4">
            <CharacterList
              characterType={charTypes.PC}
              charList={this.props.campaign.characters.players}
              context={contextTypes.CAMPAIGN_BUILDER}
            />
          </Col>
          <Col md="4">
            <CharacterList
              characterType={charTypes.NPC}
              charList={this.props.campaign.characters.npcs}
              context={contextTypes.CAMPAIGN_BUILDER}
            />
          </Col>
          <Col md="4">
            <CharacterList
              characterType={charTypes.ENEMY}
              charList={this.props.campaign.characters.enemies}
              context={contextTypes.CAMPAIGN_BUILDER}
            />
          </Col>
        </Row>
        <Button className="mt-3" onClick={this.handleSave}>Save Changes to Campaign </Button>
      </Container>
    );
  }
}
const mapStateToProps = state => {
  return { campaign: state.campaign.loadedCampaign };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    saveCampaign: campaign => dispatch(saveCampaign(campaign))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CampaignBuilder);
