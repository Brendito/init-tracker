import React, { Component } from "react";
import { FormGroup, Label, Input } from "reactstrap";
import { Player } from "../../../models";

interface Props {
  listener: (name: string, value: any) => void;
}

class Stats extends Component<Props & Player> {
  handleChange = (e: React.ChangeEvent<any>) => {
    const name = e.target.name;
    const value = Number(e.target.value);
    this.props.listener(name, value);
  };

  render() {
    return (
      <>
        <h5>Character Stats</h5>
        <hr />
        <FormGroup>
          <Label for="hit_points">Max HP</Label>
          <Input
            type="number"
            name="hit_points"
            id="hit_points"
            placeholder={String(this.props.hit_points)}
            onChange={this.handleChange}
          />
        </FormGroup>
        <FormGroup>
          <Label for="armor_class">AC</Label>
          <Input
            type="number"
            name="armor_class"
            id="armor_class"
            placeholder={String(this.props.armor_class)}
            onChange={this.handleChange}
          />
        </FormGroup>
        <FormGroup>
          <Label for="initMod">Initiative Modifier</Label>
          <Input
            type="number"
            name="initMod"
            id="initMod"
            placeholder={String(this.props.initMod)}
            onChange={this.handleChange}
          />
        </FormGroup>
        <FormGroup>
          <Label for="characterLevel">Level</Label>
          <Input
            type="number"
            name="characterLevel"
            id="characterLevel"
            placeholder={String(this.props.characterLevel)}
            onChange={this.handleChange}
          />
        </FormGroup>
      </>
    );
  }
}

export default Stats;
