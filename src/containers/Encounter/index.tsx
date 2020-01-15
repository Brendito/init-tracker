import { v4 } from "node-uuid";
import React, { Component } from "react";
import { connect } from "react-redux";
import { Button, Container, Input, Label, Modal } from "reactstrap";
import { bindActionCreators } from "redux";

import { loadedActionCreators, LoadedActionCreators } from "../../actions";
import EncounterList from "./EncounterList";

import "./styles.css";

interface Props {
  loadedActions: LoadedActionCreators;
}

class EncounterContainer extends Component<Props, {}> {
  state = {
    encounterCreateModal: false
  };

  toggleCreateModal = () => {
    this.setState({ encounterCreateModal: !this.state.encounterCreateModal });
  };

  createEncounter = () => {
    const name = (document as HTMLDocument).getElementById(
      "encounterName"
    ) as HTMLInputElement;

    const encounter = {
      name: name.value,
      id: v4(),
      list: []
    };

    if (encounter.name !== null) {
      this.props.loadedActions.createEncounter(encounter);
      this.toggleCreateModal();
    } else {
      // TODO: Handle Errors
      console.log("Error");
    }
  };

  render() {
    return (
      <Container fluid>
        <EncounterList />
        <hr />
        <Button
          className="d-block my-2"
          color="primary"
          onClick={this.toggleCreateModal}
        >
          Create New Encounter
        </Button>

        <Modal
          isOpen={this.state.encounterCreateModal}
          toggle={this.toggleCreateModal}
        >
          <div className="p-3">
            <h4>Create New Encounter</h4>
            <hr />
            <Label className="font-weight-light" for="encounterName">
              Encounter Name
            </Label>

            <Input className="mb-3" type="text" id="encounterName" />

            <Button color="success" onClick={this.createEncounter}>
              Save Encounter
            </Button>
          </div>
        </Modal>
      </Container>
    );
  }
}

const mapDispatchToProps = (dispatch: any) => {
  return {
    loadedActions: bindActionCreators(loadedActionCreators, dispatch)
  };
};

export default connect<Props, {}>(mapDispatchToProps)(EncounterContainer);
