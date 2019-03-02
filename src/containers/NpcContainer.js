import React, { Component } from "react";
import { connect } from "react-redux";
import { saveCharToCampaign, saveCampaign } from "../actions/campaignActions";
import { Container, Row, Col, Modal, Button } from "reactstrap";
import npcData from "../assets/data/npcData";
import NpcFormContainer from "./NpcFormContainer";
import NpcListContainer from "./NpcListContainer";
import * as charTypes from "../constants/characterTypes";
import SavedNpcList from "../components/SavedNpcList/SavedNpcList";
import { v4 } from "node-uuid";

let npcs = npcData;

class NpcContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      char: {},
      app: {
        loadedNpc: false,
        addingNpc: false
      },
      npcs: []
    };
  }

  componentDidMount() {
    npcs = npcData.filter(npc => npc.dataType !== "Custom");
    npcs.push(...this.props.npcs);
    npcs.sort(function(a, b) {
      if (a.name.toLowerCase() < b.name.toLowerCase()) {
        return -1;
      }
      if (a.name.toLowerCase() > b.name.toLowerCase()) {
        return 1;
      }
      return 0;
    });
    this.setState({ npcs: npcs });
  }

  componentWillReceiveProps(nextProps) {
    npcs = npcData.filter(npc => npc.dataType !== "Custom");
    npcs.push(...nextProps.npcs);
    npcs.sort(function(a, b) {
      if (a.name.toLowerCase() < b.name.toLowerCase()) {
        return -1;
      }
      if (a.name.toLowerCase() > b.name.toLowerCase()) {
        return 1;
      }
      return 0;
    });
    this.setState({ npcs: npcs });
  }

  loadNpc = id => {
    this.setState({ char: {} });
    const loadedNpc = this.state.npcs.filter(
      npc => String(npc.id) === String(id)
    )[0];
    this.setState({
      char: {
        ...loadedNpc
      },
      app: {
        ...this.state.app,
        loadedNpc: true
      }
    });
    window.scrollTo(0, 0);
  };

  resetForm = () => {
    this.setState({
      char: {},
      app: {
        ...this.state.app,
        loadedNpc: false,
        editingNpc: false
      }
    });
    window.scrollTo(0, 0);
  };

  editNpc = id => {
    const editedNpc = npcs.filter(npc => String(npc.id) === String(id))[0];
    this.setState({
      char: {
        ...editedNpc
      },
      app: {
        ...this.state.app,
        loadedNpc: true,
        editingNpc: true
      }
    });
  };

  handleEditSubmit = char => {
    this.setState({ char: { ...char } });
    setTimeout(() => {
      this.props.saveCharToCampaign(char);
      this.props.saveCampaign(this.props.campaign);
      this.resetForm();
    }, 500);
  };

  handleNpcAddFromForm = char => {
    this.setState({
      char: {
        ...this.state.char,
        ...char,
        id: v4(),
        dataType: "Custom"
      }
    });
    this.toggleNpcAddModal();
  };

  handleNpcAddToCampaign = e => {
    // Find alternative
    const type = e.target.dataset.type;
    this.handleNpcType(type);
    setTimeout(() => {
      this.props.saveCharToCampaign(this.state.char);
      this.props.saveCampaign(this.props.campaign);
      this.resetForm();
    }, 500);
    this.toggleNpcAddModal();
  };

  handleNpcType = type => {
    this.toggleNpcAddModal();
    switch (type) {
      case charTypes.FRIENDLY_NPC:
        return this.setState({
          char: {
            ...this.state.char,
            characterType: charTypes.FRIENDLY_NPC,
            id: v4()
          }
        });
      case charTypes.HOSTILE_NPC:
        return this.setState({
          char: {
            ...this.state.char,
            characterType: charTypes.HOSTILE_NPC,
            id: v4()
          }
        });
      default:
        return console.log("Error on Npc Type");
    }
  };

  toggleNpcAddModal = () => {
    this.setState({
      app: {
        ...this.state.app,
        addingNpc: !this.state.app.addingNpc
      }
    });
  };

  render() {
    return (
      <Container fluid>
        <Row>
          <Col sm="12" md="4">
            <SavedNpcList
              characterType={charTypes.FRIENDLY_NPC}
              editNpc={this.editNpc}
            />
            <SavedNpcList
              characterType={charTypes.HOSTILE_NPC}
              editNpc={this.editNpc}
            />
          </Col>
          <Col sm="12" md="8">
            <NpcFormContainer
              className={!this.state.app.loadedNpc ? "hidden" : ""}
              onSubmit={this.handleNpcAddFromForm}
              onCancel={this.resetForm}
              onEditSubmit={this.handleEditSubmit}
              editingNpc={this.state.app.editingNpc}
              char={this.state.char || npcs}
            />
            <NpcListContainer
              className={this.state.app.loadedNpc ? "hidden" : ""}
              loadNpc={this.loadNpc}
              npcs={this.state.npcs}
            />
            <Modal
              isOpen={this.state.app.addingNpc}
              toggle={this.toggleNpcAddModal}
            >
              <div className="p-3">
                <h3>Adding - {this.state.char.name}</h3>
                <p>Is {this.state.char.name} a Friendly or Hostile NPC?</p>
                <Button
                  onClick={this.handleNpcAddToCampaign}
                  data-type={charTypes.FRIENDLY_NPC}
                >
                  Friendly
                </Button>
                <Button
                  onClick={this.handleNpcAddToCampaign}
                  data-type={charTypes.HOSTILE_NPC}
                >
                  Hostile
                </Button>
              </div>
            </Modal>
          </Col>
        </Row>
      </Container>
    );
  }
}

const mapStateToProps = state => {
  return {
    npcs: state.campaign.loadedCampaign.characters.npcs,
    campaign: state.campaign.loadedCampaign
  };
};

const mapDispatchToProps = dispatch => {
  return {
    saveCharToCampaign: char => {
      dispatch(saveCharToCampaign(char));
    },
    saveCampaign: campaignId => {
      dispatch(saveCampaign(campaignId));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NpcContainer);
