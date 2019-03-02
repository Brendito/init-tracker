import React, { Component } from "react";
import { ListGroup, Modal, Button } from "reactstrap";
import * as charTypes from "../../constants/characterTypes";
import CharacterListCard from "./CharacterListCard/CharacterListCard";
import CharacterForm from "../CharacterForm/CharacterForm";

class CharacterList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      charModalIsOpen: false
    };
    this.toggleCharModal = this.toggleCharModal.bind(this);
    this.handleMsg = this.handleMsg.bind(this);
  }

  toggleCharModal(event) {
    this.setState({
      ...this.state,
      charModalIsOpen: !this.state.charModalIsOpen
    });
  }

  handleMsg() {
    switch (this.props.characterType) {
      case charTypes.PC:
        return charTypes.PC_MSG;
      case charTypes.FRIENDLY_NPC:
        return charTypes.FRIENDLY_NPC_MSG;
      case charTypes.HOSTILE_NPC:
        return charTypes.HOSTILE_NPC_MSG
      default:
        return "Unknown Error";
    }
  }

  render() {
    return (
      <div>
        <h4>{this.handleMsg()}s</h4>
        <ListGroup>
          {this.props.charList &&
            this.props.charList.map(char => {
              return (
                <CharacterListCard
                  onCharSubmit={this.handleCharSubmit}
                  key={char.id}
                  {...char}
                />
              );
            })}
        </ListGroup>

        <Button className="mt-3" name={this.props.formContext} onClick={this.toggleCharModal}>
          Create New {this.handleMsg()}
        </Button>

        <Modal
          isOpen={this.state.charModalIsOpen}
          toggle={this.toggleCharModal}
        >
          <CharacterForm
            closeModal={this.toggleCharModal}
            newChar={true}
            characterType={this.props.characterType}
          />
        </Modal>
      </div>
    );
  }
}

export default CharacterList;