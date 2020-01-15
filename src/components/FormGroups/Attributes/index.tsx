import React from "react";
import { Col, FormGroup, Input, Label, Row } from "reactstrap";
import { Player } from "../../../models";

interface Props {
  listener: (name: string, value: any) => void;
}

export default class Attributes extends React.Component<Player & Props> {
  handleAttributes = (event: React.ChangeEvent<any>) => {
    const name = event.target.name;
    const value = Number(event.target.value);
    this.props.listener(name, value);
  };

  render() {
    return (
      <>
        <h5>Attribute Modifiers</h5>
        <span className="font-italic font-weight-light">Optional Fields</span>
        <hr />
        <FormGroup>
          <Row>
            <Col sm="12" md="6">
              <FormGroup>
                <Label for="strength">Strength</Label>
                <Input
                  type="number"
                  name="strength"
                  id="strength"
                  placeholder={String(this.props.strength)}
                  onChange={this.handleAttributes}
                />
              </FormGroup>
              <FormGroup>
                <Label for="dexterity">Dexterity</Label>
                <Input
                  type="number"
                  name="dexterity"
                  id="dexterity"
                  placeholder={String(this.props.dexterity)}
                  onChange={this.handleAttributes}
                />
              </FormGroup>
              <FormGroup>
                <Label for="constitution">Constitution</Label>
                <Input
                  type="number"
                  name="constitution"
                  id="constitution"
                  placeholder={String(this.props.constitution)}
                  onChange={this.handleAttributes}
                />
              </FormGroup>
            </Col>
            <Col sm="12" md="6">
              <FormGroup>
                <Label for="wisdom">Wisdom</Label>
                <Input
                  type="number"
                  name="wisdom"
                  id="wisdom"
                  placeholder={String(this.props.wisdom)}
                  onChange={this.handleAttributes}
                />
              </FormGroup>
              <FormGroup>
                <Label for="intellect">Intellect</Label>
                <Input
                  type="number"
                  name="intellect"
                  id="intellect"
                  placeholder={String(this.props.intelligence)}
                  onChange={this.handleAttributes}
                />
              </FormGroup>
              <FormGroup>
                <Label for="charisma">Charisma</Label>
                <Input
                  type="number"
                  name="charisma"
                  id="charisma"
                  placeholder={String(this.props.charisma)}
                  onChange={this.handleAttributes}
                />
              </FormGroup>
            </Col>
          </Row>
        </FormGroup>
      </>
    );
  }
}
