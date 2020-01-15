import { v4 } from "node-uuid";
import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import {
  Button,
  Container,
  Form,
  FormGroup,
  Input,
  Jumbotron,
  Label,
  ListGroup,
  ListGroupItem,
  Modal
} from "reactstrap";
import { bindActionCreators } from "redux";

import { savedActionCreators, SavedActionCreators } from "../../actions";
import routes from "../../constants/routes";

interface Props {
  campaigns: Array<any>;
  savedActions: SavedActionCreators;
}

class LandingPage extends Component<Props> {
  state = {
    createNewCampaignModalIsOpen: false,
    campaigns: [],
    campaign: {
      campaignName: ""
    }
  };

  toggleCampaignCreateModal = () => {
    this.setState({
      ...this.state,
      createNewCampaignModalIsOpen: !this.state.createNewCampaignModalIsOpen,
      campaign: {
        players: [],
        encounters: [],
        id: v4()
      }
    });
  };
  handleCreate = (e: React.ChangeEvent<any>) => {
    e.preventDefault();
    this.toggleCampaignCreateModal();
    this.props.savedActions.createCampaign(this.state.campaign);
  };

  handleChange = (e: React.ChangeEvent<any>) => {
    const value = e.target.value;
    const name = e.target.name;
    this.setState({
      ...this.state,
      campaign: {
        ...this.state.campaign,
        [name]: value
      }
    });
  };

  render() {
    return (
      <Container>
        <Jumbotron>Init Tracker</Jumbotron>
        {this.props.campaigns && (
          <div>
            <h3>Load Saved Campaign</h3>
            <ListGroup>
              {this.props.campaigns.map(campaign => {
                return (
                  <Link key={campaign.id} to={routes.campaignBuilder}>
                    <ListGroupItem
                      data-id={campaign.id}
                      onClick={() =>
                        this.props.savedActions.loadCampaign(campaign)
                      }
                    >
                      {campaign.campaignName}
                    </ListGroupItem>
                  </Link>
                );
              })}
            </ListGroup>
          </div>
        )}

        <Button onClick={this.toggleCampaignCreateModal}>
          Create A New Campaign
        </Button>
        <Modal
          isOpen={this.state.createNewCampaignModalIsOpen}
          toggle={this.toggleCampaignCreateModal}
        >
          <Form className="p-3" onSubmit={this.handleCreate}>
            <h3>Create New Campaign</h3>
            <FormGroup>
              <Label for="campaignName">Campaign Name</Label>
              <Input
                type="text"
                name="campaignName"
                id="campaignName"
                placeholder=""
                onChange={this.handleChange}
              />
              <Button className="mt-3" type="submit">
                Save
              </Button>
            </FormGroup>
          </Form>
        </Modal>
      </Container>
    );
  }
}

const mapStateToProps = (state: any) => ({
  campaigns: [...state.saved.campaigns],
  loaded: { ...state.loaded }
});

const mapDispatchToProps = (dispatch: any) => {
  return {
    savedActions: bindActionCreators(savedActionCreators, dispatch)
  };
};

export default connect<{}, {}, Props>(
  mapStateToProps,
  mapDispatchToProps
)(LandingPage);
