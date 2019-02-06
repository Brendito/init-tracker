import React, { Component } from "react";
import { Form, FormGroup, Label, Input, Button, Row, Col } from "reactstrap";
import * as types from '../../constants/characterClasses';


class CharacterForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      characterName: "Scanlan Shorthalt",
      playerName: "Sam Riegel",
      characterType: "PC",
      characterRace: "Halfling",
      characterClass: "Bard",
      mini: "Red",
      attributes: {
        str: 3,
        dex: 2,
        int: 1,
        wis: 5,
        con: 2,
        cha: 1
      },
      stats: {
        maxHP: 45,
        currentHP: 45,
        ac: 15,
        init: {
          initMod: 0,
          initRoll: 0,
          initTotal: 0
        }
      },
      statuses: []
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleStats = this.handleStats.bind(this);
    this.handleAttributes = this.handleAttributes.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event) {
    event.preventDefault();
    this.props.onSubmit(this.state);
  }

  handleChange(event) {
    const target = event.target;
    const value =
      target.type === "number" ? Number(target.value) : target.value;
    const name = target.name;
    this.setState({
      [name]: value
    });
  }

  handleStats(event) {
    const name = event.target.name;
    const value = Number(event.target.value);
    if (event.target.name === "initMod") {
      this.setState({
        stats: {
          ...this.state.stats,
          init: {
            ...this.state.stats.init,
            [name]: value
          }
        }
      });
    } else if (event.target.name === 'maxHP') {
      let currentHP = value;
      this.setState({
        stats: {
          ...this.state.stats,
          [name]: value,
          currentHP: currentHP
        }
      })
    } else {
      this.setState({
        stats: {
          ...this.state.stats,
          [name]: value
        }
      });
    }
  }

  handleAttributes(event) {
    const name = event.target.name;
    const value = Number(event.target.value);
    this.setState({
      attributes: {
        ...this.state.attributes,
        [name]: value
      }
    })
  }

  render() {
    return (
      <div className="p-5">
        <Row className="pt-2">
          <Col sm="12">
            <Form id="charForm" onSubmit={this.handleSubmit}>
              <FormGroup>
                <h2>Add to Encounter</h2>
                <Input
                  onChange={this.handleCharType}
                  type="select"
                  name="charType"
                  id="charType"
                >
                  <option value="enemy">Enemy</option>
                  <option value="npc">Non Player Character</option>
                  <option value="pc">Player Character</option>
                </Input>
              </FormGroup>
              <Row>
                <Col md="6">
                  <h4>Character Info</h4>
                  <FormGroup>
                    <Label for="characterName">Character Name</Label>
                    <Input
                      type="text"
                      name="characterName"
                      id="characterName"
                      placeholder=""
                      onChange={this.handleChange}
                    />
                  </FormGroup>
                  <FormGroup>
                    <Label for="playerName">Player Name</Label>
                    <Input
                      type="text"
                      name="playerName"
                      id="playerName"
                      placeholder=""
                      onChange={this.handleChange}
                    />
                  </FormGroup>
                  <FormGroup>
                    <Label for="characterRace">Race</Label>
                    <Input
                      type="text"
                      name="characterRace"
                      id="characterRace"
                      placeholder=""
                      onChange={this.handleChange}
                    />
                  </FormGroup>
                  <FormGroup>
                    <Input
                      onChange={this.handleChange}
                      type="select"
                      name="characterClass"
                      id="characterClass"
                    >
                      <option value={types.BARBARIAN}>Barbarian</option>
                      <option value={types.BARD}>Bard</option>
                      <option value={types.CLERIC}>Cleric</option>
                      <option value={types.DRUID}>Druid</option>
                      <option value={types.FIGHTER}>Fighter</option>
                      <option value={types.MONK}>Monk</option>
                      <option value={types.PALADIN}>Paladin</option>
                      <option value={types.RANGER}>Ranger</option>
                      <option value={types.ROGUE}>Rogue</option>
                      <option value={types.SORCERER}>Sorcerer</option>
                      <option value={types.WARLOCK}>Warlock</option>
                      <option value={types.WIZARD}>Wizard</option>
                      
                    </Input>
                  </FormGroup>
                  <FormGroup>
                    <Label for="mini">Mini</Label>
                    <Input
                      type="text"
                      name="mini"
                      id="mini"
                      placeholder=""
                      onChange={this.handleChange}
                    />
                  </FormGroup>
                  <h4>Character Stats</h4>
                  <FormGroup>
                    <Label for="maxHP">Max HP</Label>
                    <Input
                      type="number"
                      name="maxHP"
                      id="maxHP"
                      placeholder=""
                      onChange={this.handleStats}
                    />
                  </FormGroup>
                  <FormGroup>
                    <Label for="init">AC</Label>
                    <Input
                      type="number"
                      name="ac"
                      id="ac"
                      placeholder=""
                      onChange={this.handleStats}
                    />
                  </FormGroup>
                  <FormGroup>
                    <Label for="initMod">Initiative Modifier</Label>
                    <Input
                      type="number"
                      name="initMod"
                      id="initMod"
                      placeholder=""
                      onChange={this.handleStats}
                    />
                  </FormGroup>
                </Col>
                <Col md="6">
                  <h4> Attribute Modifiers</h4>
                  <FormGroup>
                    <Label for="str">Strength</Label>
                    <Input
                      type="number"
                      name="str"
                      id="str"
                      placeholder=""
                      onChange={this.handleAttributes}
                    />
                    <Label for="dex">Dexterity</Label>
                    <Input
                      type="number"
                      name="dex"
                      id="dex"
                      placeholder=""
                      onChange={this.handleAttributes}
                    />
                    <Label for="con">Constitution</Label>
                    <Input
                      type="number"
                      name="con"
                      id="con"
                      placeholder=""
                      onChange={this.handleAttributes}
                    />
                    <Label for="wis">Wisdom</Label>
                    <Input
                      type="number"
                      name="wis"
                      id="wis"
                      placeholder=""
                      onChange={this.handleAttributes}
                    />
                    <Label for="int">Intellect</Label>
                    <Input
                      type="number"
                      name="int"
                      id="int"
                      placeholder=""
                      onChange={this.handleAttributes}
                    />
                    <Label for="cha">Charisma</Label>
                    <Input
                      type="number"
                      name="cha"
                      id="cha"
                      placeholder=""
                      onChange={this.handleAttributes}
                    />
                  </FormGroup>
                </Col>
              </Row>
              <FormGroup>
                <Button className="mx-2" type="submit" color="primary">
                  Add
                </Button>
                <Button className="mx-2" color="warning">
                  Cancel
                </Button>
              </FormGroup>
            </Form>
          </Col>
        </Row>
      </div>
    );
  }
}

export default CharacterForm;
