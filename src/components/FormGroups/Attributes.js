import React from "react";
import * as types from "../../constants/formGroupTypes";
import { FormGroup, Label, Input } from "reactstrap";

class Attributes extends React.Component {
  constructor(props) {
    super(props);
    this.handleAttributes = this.handleAttributes.bind(this);
  }

  handleAttributes(event) {
    const name = event.target.name;
    const value = Number(event.target.value);
    this.props.listener(name,value,types.ATTRIBUTES);
  }

  render() {
    return (
      <div>
        <h4> Attribute Modifiers</h4>
        <FormGroup>
          <Label for="str">Strength</Label>
          <Input
            type="number"
            name="str"
            id="str"
            placeholder={this.props.str}
            onChange={this.handleAttributes}
          />
          <Label for="dex">Dexterity</Label>
          <Input
            type="number"
            name="dex"
            id="dex"
            placeholder={this.props.dex}
            onChange={this.handleAttributes}
          />
          <Label for="con">Constitution</Label>
          <Input
            type="number"
            name="con"
            id="con"
            placeholder={this.props.con}
            onChange={this.handleAttributes}
          />
          <Label for="wis">Wisdom</Label>
          <Input
            type="number"
            name="wis"
            id="wis"
            placeholder={this.props.wis}
            onChange={this.handleAttributes}
          />
          <Label for="int">Intellect</Label>
          <Input
            type="number"
            name="int"
            id="int"
            placeholder={this.props.int}
            onChange={this.handleAttributes}
          />
          <Label for="cha">Charisma</Label>
          <Input
            type="number"
            name="cha"
            id="cha"
            placeholder={this.props.cha}
            onChange={this.handleAttributes}
          />
        </FormGroup>
      </div>
    );
  }
}

export default Attributes;
