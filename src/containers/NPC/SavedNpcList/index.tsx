import React, { Component } from "react";
import { connect } from "react-redux";
import { Button, ListGroup, Modal } from "reactstrap";
import { bindActionCreators } from "redux";

import { savedActionCreators, SavedActionCreators } from "../../../actions";
import SavedNpcListCard from "./SavedNpcListCard";
import { Npc, State } from "../../../models";

interface Props {
  characterType: string;
  savedActions: SavedActionCreators;
  npcs: Array<Npc>;
}

class SavedNpcList extends Component<Props> {
  state = {
    app: {
      deletingNpc: false,
      deleteId: "",
      npcName: ""
    },
    list: [...this.props.npcs]
  };

  componentWillReceiveProps = (newProps: any) => {
    this.setState({
      list: [...newProps.npcs]
    });
  };
  submitNpcDelete = () => {
    this.props.savedActions.deleteNPC(this.state.app.deleteId);
    this.toggleDeleteNpcModal();
  };

  setModalNpc = (id: string, name: string) => {
    this.setState(
      {
        deleteId: id,
        npcName: name
      },
      () => {
        this.toggleDeleteNpcModal();
      }
    );
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
      <div className="mt-2">
        <ListGroup>
          {/* Filter out all the saved NPCs of the type passed to component */}
          {this.state.list.length > 0 ? (
            this.state.list
              .filter(
                (npc: Npc) => npc.characterType === this.props.characterType
              )
              .map((npc: Npc) => {
                return (
                  <SavedNpcListCard
                    onDelete={this.toggleDeleteNpcModal}
                    {...this.props}
                    key={npc.id}
                    npc={npc}
                  />
                );
              })
          ) : (
            <span className="font-weight-light p-3">
              You don't have any NPCs of this type saved, make some!
            </span>
          )}
        </ListGroup>
        <Modal
          centered={true}
          isOpen={this.state.app.deletingNpc}
          toggle={this.toggleDeleteNpcModal}
        >
          <div className="p-3">
            <h4>Delete {this.state.app.npcName}? </h4>
            <hr />
            <span>
              Upon deletion, the data for{" "}
              <span className="font-weight-bold">{this.state.app.npcName}</span>{" "}
              cannot be recovered.
            </span>
            <div className="d-flex justify-content-between mt-3">
              <Button color="success" onClick={this.submitNpcDelete}>
                Yes
              </Button>
              <Button color="danger" onClick={this.toggleDeleteNpcModal}>
                No
              </Button>
            </div>
          </div>
        </Modal>
      </div>
    );
  }
}

const mapStateToProps = (state: State, ownProps: any) => {
  return {
    npcs: state.saved.npcs.filter(
      npc => npc.characterType === ownProps.characterType
    )
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    savedActions: bindActionCreators(savedActionCreators, dispatch)
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SavedNpcList);
