import React, { Component } from "react";
import { connect } from "react-redux";
import { saveCharToCampaign } from "../../actions/campaignActions";
import { Form, FormGroup, Label, Input, Button, Row, Col } from "reactstrap";
import * as formTypes from "../../constants/formGroupTypes";
import * as charTypes from "../../constants/characterTypes";
import {
  CharacterInformation,
  Stats,
  Attributes,
  CharacterClass
} from "../FormGroups";
import { v4 } from "node-uuid";

class CharacterForm extends Component {
  constructor(props) {
    super(props);
    // Set id and character type to cover new characters but overide from props for updating characters
    this.state = {
      id: v4(),
      characterType: this.props.characterType,
      ...this.props.char
    };
    this.formGroupListener = this.formGroupListener.bind(this);
    this.handleMessage = this.handleMessage.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.closeModal();
    this.props.saveCharToCampaign(this.state);
  }

  handleKeyPress = e => {
    if (e.key === "Enter") {
      this.handleSubmit(e);
    }
  };

  // TODO: Extract this to util so it can be reused easily, difficulties with passing an object back without knowing the object structure
  formGroupListener(name, value, type) {
    switch (type) {
      case formTypes.ATTRIBUTES:
        return this.setState({
          ...this.state,
          attributes: { ...this.state.attributes, [name]: value }
        });
      case formTypes.STATS:
        return this.setState({
          ...this.state,
          stats: { ...this.state.stats, [name]: value }
        });
      case formTypes.INIT:
        return this.setState({
          ...this.state,
          init: { ...this.state.init, [name]: value }
        });
      default:
        return this.setState({ ...this.state, [name]: value });
    }
  }

  handleMessage() {
    if (this.props.characterType === charTypes.PC) {
      return this.props.newChar
        ? "Create New Player Character"
        : "Edit " + this.state.characterName;
    } else if (this.props.characterType === charTypes.NPC) {
      return this.props.newChar
        ? "Create New Non-Player Character"
        : "Edit " + this.state.characterName;
    } else if (this.props.characterType === charTypes.ENEMY) {
      return this.props.newChar
        ? "Create New Enemy"
        : "Edit " + this.state.characterName;
    }
  }

  render() {
    return (
      <div className="p-5">
        <Row className="pt-2">
          <Col sm="12">
            <Form
              id="charForm"
              onSubmit={this.handleSubmit}
              onKeyPress={this.handleKeyPress}
            >
              <h2>{this.handleMessage()}</h2>
              <Row>
                <Col md="6">
                  <CharacterInformation
                    listener={this.formGroupListener}
                    characterType={this.state.characterType}
                    {...this.state}
                  />

                  {/* If PC, allow choice of class */}
                  {this.props.characterType === charTypes.PC && (
                    <CharacterClass
                      listener={this.formGroupListener}
                      charClass={this.state.characterClass}
                    />
                  )}

                  {/* If not a PC, allow choice of mini */}
                  {this.props.characterType !== charTypes.PC && (
                    <FormGroup>
                      <Label for="mini">Mini</Label>
                      <Input
                        type="text"
                        name="mini"
                        id="mini"
                        placeholder={this.state.mini}
                        onChange={this.handleChange}
                      />
                    </FormGroup>
                  )}
                  <Stats
                    listener={this.formGroupListener}
                    {...this.state.stats}
                  />
                </Col>
                <Col md="6">
                  <Attributes
                    listener={this.formGroupListener}
                    {...this.state.attributes}
                  />
                </Col>
              </Row>
              <FormGroup>
                <Button className="mx-2" type="submit" color="primary">
                  Add
                </Button>
                <Button
                  className="mx-2"
                  onClick={this.props.closeModal}
                  color="warning"
                >
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

const mapDispatchToProps = dispatch => {
  return {
    saveCharToCampaign: char => dispatch(saveCharToCampaign(char))
  };
};

export default connect(
  null,
  mapDispatchToProps
)(CharacterForm);
