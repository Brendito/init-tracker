import React, { Component } from "react";
import {
  Col,
  Row,
  Container,
  Form,
  FormGroup,
  Input,
  Label,
  Button
} from "reactstrap";
import {
  alignmentTypes,
  npcSizes,
  npcTypes
} from "../../constants/npcInformation";
import { NpcSavingThrows, NpcSkills } from "../../components/FormGroups";
import NpcSpecialAbilities from "../FormGroups/NpcSpecialAbilities";
import NpcActions from "../FormGroups/NpcActions";
import "../style.css";

class NpcForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      app: {
        savingThrowAdd: false,
        actionAdd: false,
        legendaryActionAdd: false,
        skillAdd: false,
        spellAdd: false,
        abilityAdd: false
      }
    };
  }

  toggleModals = () => {
    this.setState({
      app: {
        savingThrowAdd: false,
        actionAdd: false,
        legendaryActionAdd: false,
        skillAdd: false,
        spellAdd: false,
        abilityAdd: false
      }
    });
  };

  handleChange = e => {
    const name = e.target.name;
    const value = e.target.value;
    this.props.onFormChange(name, value);
  };

  handleSpecialSubmit = (name, value) => {
    this.props.onFormChange(name, value);
  };

  render() {
    return (
      <Container className={this.props.className}>
        <h4>NPC Information</h4>
        <hr />
        <Form>
          <FormGroup>
            <Label for="name">Name</Label>
            <Input
              type="text"
              name="name"
              id="name"
              placeholder={this.props.name}
              onChange={this.handleChange}
            />
          </FormGroup>
          <Row>
            <Col sm="12" md="6">
              <FormGroup>
                <Label for="size">Size</Label>
                <Input
                  type="select"
                  name="size"
                  id="size"
                  defaultValue={this.props.size}
                  onChange={this.handleChange}
                >
                  <option />
                  {npcSizes.map(size => {
                    return <option key={size}>{size}</option>;
                  })}
                </Input>
              </FormGroup>
            </Col>
            <Col sm="12" md="6">
              <FormGroup>
                <Label for="type">Type</Label>
                <Input
                  type="select"
                  name="type"
                  id="type"
                  defaultValue={this.props.type}
                  onChange={this.handleChange}
                >
                  <option />
                  {npcTypes.map(type => {
                    return <option key={type}>{type}</option>;
                  })}
                </Input>
              </FormGroup>
            </Col>
          </Row>
          <FormGroup>
            <Label for="alignment">Alignment</Label>
            <Input
              type="select"
              name="alignment"
              id="alignment"
              defaultValue={this.props.alignment}
              onChange={this.handleChange}
            >
              <option />
              {alignmentTypes.map(type => {
                return <option key={type}>{type}</option>;
              })}
            </Input>
          </FormGroup>
          <h4>Stats</h4>
          <hr />
          <Row>
            <Col sm="12" md="6">
              <FormGroup>
                <Label for="armor_class">Armor Class</Label>
                <Input
                  type="number"
                  name="armor_class"
                  id="armor_class"
                  placeholder={this.props.armor_class}
                  onChange={this.handleChange}
                />
              </FormGroup>
            </Col>
            <Col sm="12" md="6">
              <FormGroup>
                <Label for="speed">Speed</Label>
                <Input
                  type="number"
                  name="speed"
                  id="speed"
                  placeholder={this.props.speed}
                  onChange={this.handleChange}
                />
              </FormGroup>
            </Col>
          </Row>
          <Row>
            <Col sm="12" md="6">
              <FormGroup>
                <Label for="hit_points">Max HP</Label>
                <Input
                  type="number"
                  name="hit_points"
                  id="hit_points"
                  placeholder={this.props.hit_points}
                  onChange={this.handleChange}
                />
              </FormGroup>
            </Col>
            <Col sm="12" md="6">
              <FormGroup>
                <Label for="hit_dice">Hit Dice</Label>
                <Input
                  type="text"
                  name="hit_dice"
                  id="hit_dice"
                  placeholder={this.props.hit_dice}
                  onChange={this.handleChange}
                />
              </FormGroup>
            </Col>
          </Row>
          <h4>Attribute Modifiers</h4>
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
                    placeholder={this.props.strength}
                    onChange={this.handleChange}
                  />
                </FormGroup>
                <FormGroup>
                  <Label for="dexterity">Dexterity</Label>
                  <Input
                    type="number"
                    name="dexterity"
                    id="dexterity"
                    placeholder={this.props.dexterity}
                    onChange={this.handleChange}
                  />
                </FormGroup>
                <FormGroup>
                  <Label for="constitution">Constitution</Label>
                  <Input
                    type="number"
                    name="constitution"
                    id="constitution"
                    placeholder={this.props.constitution}
                    onChange={this.handleChange}
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
                    placeholder={this.props.wisdom}
                    onChange={this.handleChange}
                  />
                </FormGroup>
                <FormGroup>
                  <Label for="intellect">Intellect</Label>
                  <Input
                    type="number"
                    name="intellect"
                    id="intellect"
                    placeholder={this.props.intelligence}
                    onChange={this.handleChange}
                  />
                </FormGroup>
                <FormGroup>
                  <Label for="charisma">Charisma</Label>
                  <Input
                    type="number"
                    name="charisma"
                    id="charisma"
                    placeholder={this.props.charisma}
                    onChange={this.handleChange}
                  />
                </FormGroup>
              </Col>
            </Row>
          </FormGroup>
          <h4>Vulnerabilities and Immunities</h4>
          <hr />
          <Row>
            <Col sm="12" md="6">
              <FormGroup>
                <Label for="damage_vulnerabilites">
                  Damage Vulnerabilities
                </Label>
                <Input
                  type="text"
                  name="damage_vulnerabilites"
                  id="damage_vulnerabilites"
                  placeholder={this.state.damage_vulnerabilites}
                  onChange={this.handleResistances}
                />
              </FormGroup>
            </Col>
            <Col sm="12" md="6">
              <FormGroup>
                <Label for="damage_resistances">Damage Resistances</Label>
                <Input
                  type="text"
                  name="damage_resistances"
                  id="damage_resistances"
                  placeholder={this.props.damage_resistances}
                  onChange={this.handleChange}
                />
              </FormGroup>
            </Col>
          </Row>
          <Row>
            <Col sm="12" md="6">
              <FormGroup>
                <Label for="damage_immunities">Damage Immunities</Label>
                <Input
                  type="text"
                  name="damage_immunities"
                  id="damage_immunities"
                  placeholder={this.props.damage_immunities}
                  onChange={this.handleChange}
                />
              </FormGroup>
            </Col>
            <Col sm="12" md="6">
              <FormGroup>
                <Label for="condition_immunities">Condition Immunities</Label>
                <Input
                  type="text"
                  name="condition_immunities"
                  id="condition_immunities"
                  placeholder={this.props.condition_immunities}
                  onChange={this.handleChange}
                />
              </FormGroup>
            </Col>
          </Row>
          <Row className="my-3">
            <Col sm="12" md="6">
              <NpcSavingThrows
                listener={this.handleSpecialSubmit}
                onDelete={this.props.onDelete}
                {...this.props}
              />
            </Col>
            <Col sm="12" md="6">
              <NpcSkills
                listener={this.handleSpecialSubmit}
                onDelete={this.props.onDelete}
                {...this.props}
              />
            </Col>
          </Row>

          <NpcSpecialAbilities
            abilities={this.props.special_abilities}
            onDelete={this.props.onDelete}
            listener={this.props.onSpecialFormChange}
          />

          <NpcActions
            actions={this.props.actions}
            listener={this.props.onSpecialFormChange}
            onDelete={this.props.onDelete}
          />
          {!this.props.editingNpc ? (
            <Button onClick={this.props.handleSubmit}>Add To Campaign</Button>
          ) : (
            <Button onClick={this.props.onEditSubmit}>Save</Button>
          )}
          <Button onClick={this.props.onCancel}>Cancel</Button>
        </Form>
      </Container>
    );
  }
}

export default NpcForm;
