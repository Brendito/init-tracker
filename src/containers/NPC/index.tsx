import React, { Component } from "react";
import { Link } from "react-router-dom";
import withSizes from "react-sizes";
import { Button, Container, Modal } from "reactstrap";

import { blankNpc } from "../../constants/npcInformation";
import routes from "../../constants/routes";
import { mapSizesToProps } from "../../hoc/screenSizes";
import NpcLargeLanding from "./NpcLargeLanding";
import NpcMobileLanding from "./NpcMobileLanding";

interface Props {
  isMobile: boolean;
}

class NpcContainer extends Component<Props> {
  state = {
    characterType: "",
    addModal: false
  };

  // Listen to which character type the user is interacting with
  setCharacterType = (type: string) => {
    this.setState({
      characterType: type
    });
  };

  toggleAddModal = () => {
    this.setState({
      addModal: !this.state.addModal
    });
  };

  render() {
    return (
      <Container fluid>
        {/* Render Mobile or Large - Revisit this approach later */}
        {this.props.isMobile && (
          <NpcMobileLanding
            setCharacterType={this.setCharacterType}
            toggleAddModal={this.toggleAddModal}
          />
        )}
        {!this.props.isMobile && (
          <NpcLargeLanding
            setCharacterType={this.setCharacterType}
            toggleAddModal={this.toggleAddModal}
          />
        )}
        <Modal
          isOpen={this.state.addModal}
          centered={true}
          toggle={this.toggleAddModal}
        >
          <div className="p-3">
            <h4>Add New NPC</h4>
            <hr />
            <p className="font-weight-light mb-4">
              You can create and modify a copy of an NPC included in the SRD or
              start one from scratch.
            </p>
            <div className="d-flex justify-content-between">
              {/* Send the user to either the Template list or NPC form, depending on what they selected in the Landing */}
              <Link
                to={{
                  pathname: routes.npcTemplateList,
                  state: {
                    characterType: this.state.characterType
                  }
                }}
              >
                <Button color="primary">Copy a Template</Button>
              </Link>
              <Link
                to={{
                  pathname: routes.npcForm,
                  state: {
                    npc: {
                      ...blankNpc,
                      characterType: this.state.characterType
                    }
                  }
                }}
              >
                <Button color="primary">Create from Scratch</Button>
              </Link>
            </div>
          </div>
        </Modal>
      </Container>
    );
  }
}

export default withSizes<{}, Props>(mapSizesToProps)(NpcContainer);
