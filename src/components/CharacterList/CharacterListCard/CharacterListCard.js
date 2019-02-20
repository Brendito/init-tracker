import React, { Component } from "react";
import * as contextTypes from "../../../constants/contextTypes";
import { handleCharacterIcon } from "../../../utils/characterIconUtil";
import { ListGroupItem, Modal } from "reactstrap";
import CharacterForm from "../../CharacterForm/CharacterForm";

class CharacterListCard extends Component {
  constructor(props) {
    super(props);
    this.state = { editorIsOpen: false };
    this.toggleEditor = this.toggleEditor.bind(this);
  }
  toggleEditor() {
    this.setState({ editorIsOpen: !this.state.editorIsOpen });
  }

  handleClick() {
      if(this.props.context === contextTypes.CAMPAIGN_BUILDER) {
        this.toggleEditor();
      } else if (this.props.context === contextTypes.ENCOUNTER_BUILDER) {
        // DO THE OTHER STUFF
      }
  }

  render() {
    return (
      <ListGroupItem key={this.props.id} onClick={this.handleClick}>
        <div className="d-flex">
          <div className="characterIcon mr-2">
            {handleCharacterIcon(this.props.characterClass)}
          </div>
          <div>
            <div className="d-flex flex-column justify-content-between">
              <div>
                <h5> {this.props.characterName} </h5>
                <h6> {this.props.playerName} </h6>
              </div>
              <div>
                <span>
                  Level {this.props.characterLevel} {this.props.characterRace}{" "}
                  {this.props.characterClass}
                </span>
              </div>
            </div>
          </div>
        </div>
        <Modal isOpen={this.state.editorIsOpen} toggle={this.toggleEditor}>
          <CharacterForm
            char={this.props}
            newChar={false}
            characterType={this.props.characterType}
            closeModal={this.toggleEditor}
          />
        </Modal>
      </ListGroupItem>
    );
  }
}

export default CharacterListCard;
