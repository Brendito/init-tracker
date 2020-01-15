import React from "react";
import { FormGroup, Input, Label } from "reactstrap";
import characterClasses from "../../../constants/characterClasses";

interface Props {
  listener: (name: string, value: any) => void;
  characterClass: string;
}

class CharacterClass extends React.Component<Props> {
  handleChange = (event: React.ChangeEvent<any>) => {
    const name = event.target.name;
    const value = event.target.value;
    this.props.listener(name, value);
  };

  render() {
    return (
      <div>
        <FormGroup>
          <Label for="characterClass">Class</Label>
          <Input
            onChange={this.handleChange}
            type="select"
            name="characterClass"
            id="characterClass"
            defaultValue={this.props.characterClass}
          >
            <option value="">Select Class</option>
            <option value={characterClasses.BARBARIAN}>Barbarian</option>
            <option value={characterClasses.BARD}>Bard</option>
            <option value={characterClasses.CLERIC}>Cleric</option>
            <option value={characterClasses.DRUID}>Druid</option>
            <option value={characterClasses.FIGHTER}>Fighter</option>
            <option value={characterClasses.MONK}>Monk</option>
            <option value={characterClasses.PALADIN}>Paladin</option>
            <option value={characterClasses.RANGER}>Ranger</option>
            <option value={characterClasses.ROGUE}>Rogue</option>
            <option value={characterClasses.SORCERER}>Sorcerer</option>
            <option value={characterClasses.WARLOCK}>Warlock</option>
            <option value={characterClasses.WIZARD}>Wizard</option>
          </Input>
        </FormGroup>
      </div>
    );
  }
}

export default CharacterClass;
