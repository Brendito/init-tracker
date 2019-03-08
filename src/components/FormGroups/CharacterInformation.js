import React from "react";
import { FormGroup, Label, Input } from "reactstrap";

class CharacterInformation extends React.Component {
  handleInfo = event => {
    const name = event.target.name;
    const value = event.target.value;
    this.props.listener(name, value);
  };

  render() {
    return (
      <div>
        <h4>Character Info</h4>
        <FormGroup>
          <Label for="name">Character Name</Label>
          <Input
            type="text"
            name="name"
            id="name"
            placeholder={this.props.name}
            onChange={this.handleInfo}
          />
        </FormGroup>
        <FormGroup>
          <Label for="playerName">Player Name</Label>
          <Input
            type="text"
            name="playerName"
            id="playerName"
            placeholder={this.props.playerName}
            onChange={this.handleInfo}
          />
        </FormGroup>
        <FormGroup>
          <Label for="characterRace">Race</Label>
          <Input
            type="text"
            name="characterRace"
            id="characterRace"
            placeholder={this.props.characterRace}
            onChange={this.handleInfo}
          />
        </FormGroup>
        <FormGroup>
          <Label for="characterLevel">Level</Label>
          <Input
            type="number"
            name="characterLevel"
            id="characterLevel"
            placeholder={this.props.characterLevel}
            onChange={this.handleInfo}
          />
        </FormGroup>
      </div>
    );
  }
}

export default CharacterInformation;
