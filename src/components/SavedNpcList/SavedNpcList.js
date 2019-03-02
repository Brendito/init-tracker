import React, { Component } from "react";
import { connect } from "react-redux";
import { deleteChar } from "../../actions/campaignActions";
import { ListGroup, Modal, Button } from "reactstrap";
import * as charTypes from "../../constants/characterTypes";
import SavedNpcListCard from "./SavedNpcListCard/SavedNpcListCard";

class SavedNpcList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      app: {
        deletingNpc: false,
        deleteId: ""
      }
    };
  }

  handleMsg = () => {
    switch (this.props.characterType) {
      case charTypes.FRIENDLY_NPC:
        return charTypes.FRIENDLY_NPC_MSG;
      case charTypes.HOSTILE_NPC:
        return charTypes.HOSTILE_NPC_MSG;
      default:
        return "Unknown Error";
    }
  };

  handleDelete = (id, name) => {
    this.setState({ deleteId: id, npcName: name });
    this.toggleDeleteNpcModal();
  };

  handleNpcDelete = () => {
    this.props.deleteChar(this.state.deleteId, charTypes.FRIENDLY_NPC);
    this.toggleDeleteNpcModal();
    this.setState({
      app: {
        deletingNpc: false,
        deleteId: ""
      }
    });
  };

  toggleDeleteNpcModal = () => {
    this.setState({
      app: {
        ...this.state.app,
        deletingNpc: !this.state.app.deletingNpc
      }
    });
  };

  render() {
    return (
      <div>
        <h4>{this.handleMsg()}s</h4>
        <ListGroup>
          {this.props.charList &&
            this.props.charList.map(npc => {
              if (
                this.props.characterType === charTypes.FRIENDLY_NPC &&
                npc.characterType === charTypes.FRIENDLY_NPC
              ) {
                return (
                  <SavedNpcListCard
                    onDelete={this.handleDelete}
                    editNpc={this.props.editNpc}
                    key={npc.id}
                    {...npc}
                  />
                );
              } else if (
                this.props.characterType === charTypes.HOSTILE_NPC &&
                npc.characterType === charTypes.HOSTILE_NPC
              ) {
                return (
                  <SavedNpcListCard
                    onDelete={this.handleDelete}
                    editNpc={this.props.editNpc}
                    key={npc.id}
                    {...npc}
                  />
                );
              }
            })}
        </ListGroup>
        <Modal
          isOpen={this.state.app.deletingNpc}
          toggle={this.toggleDeleteNpcModal}
        >
          <div className="p-3">
            <h3>Delete {this.state.npcName}? </h3>
            <Button color="success" onClick={this.handleNpcDelete}>
              Yes
            </Button>
            <Button color="danger" onClick={this.toggleDeleteNpcModal}>
              No
            </Button>
          </div>
        </Modal>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    charList: state.campaign.loadedCampaign.characters.npcs
  };
};

const mapDispatchToProps = dispatch => {
  return {
    deleteChar: (id, type) => {
      dispatch(deleteChar(id, type));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SavedNpcList);
