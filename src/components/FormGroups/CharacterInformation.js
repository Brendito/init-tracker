import React from "react";
import { FormGroup, Label, Input } from "reactstrap";

class CharacterInformation extends React.Component {
    constructor(props) {
        super(props);
        this.handleInfo = this.handleInfo.bind(this);
    }

    handleInfo(event) {
        const name = event.target.name;
        const value = event.target.value;
        this.props.listener(name, value, null);
    }

    render() {
        return (
            <div>
                <h4>Character Info</h4>
                <FormGroup>
                    <Label for="characterName">Character Name</Label>
                    <Input
                        type="text"
                        name="characterName"
                        id="characterName"
                        placeholder=""
                        onChange={this.handleInfo}
                    />
                </FormGroup>
                <FormGroup>
                    <Label for="playerName">Player Name</Label>
                    <Input
                        type="text"
                        name="playerName"
                        id="playerName"
                        placeholder=""
                        onChange={this.handleInfo}
                    />
                </FormGroup>
                <FormGroup>
                    <Label for="characterRace">Race</Label>
                    <Input
                        type="text"
                        name="characterRace"
                        id="characterRace"
                        placeholder=""
                        onChange={this.handleInfo}
                    />
                </FormGroup>
                <FormGroup>
                    <Label for="mini">Mini</Label>
                    <Input
                        type="text"
                        name="mini"
                        id="mini"
                        placeholder=""
                        onChange={this.handleInfo}
                    />
                </FormGroup>
            </div>
        );
    }
}

export default CharacterInformation;





