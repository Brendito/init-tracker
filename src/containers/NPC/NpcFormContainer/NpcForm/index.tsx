import React, { Component } from "react";
import { Link } from "react-router-dom";
import withSizes from "react-sizes";
import {
  Button,
  Col,
  Form,
  FormGroup,
  Input,
  Label,
  Modal,
  Row
} from "reactstrap";

import {
  NpcActions,
  NpcSavingThrows,
  NpcSkills,
  NpcSpecialAbilities
} from "../../../../components/FormGroups";
import StatBlock from "../../../../components/StatBlock";
import {
  alignmentTypes,
  challengeRatings,
  npcSizes,
  npcTypes
} from "../../../../constants/npcInformation";
import routes from "../../../../constants/routes";
import { mapSizesToProps } from "../../../../hoc/screenSizes";
import { Npc } from "../../../../models";
import { sentenceCase, titleCase } from "../../../../utils/utils";
import { initialStates } from "../../../../constants/initialStates";

interface Props {
  onFormChange: (name: string, value: any) => void;
  onSpecialFormChange: (data: any, type: string) => void;
  onFormDelete: (data: any, type: string) => void;
  handleSubmit: () => void;
  isDesktop?: boolean;
  isMobile?: boolean;
  npc: Npc;
}

class NpcForm extends Component<Props> {
  state = {
    npc: {
      ...this.props.npc
    },
    app: {
      statBlockModal: false
    }
  };

  handleChange = (e: React.ChangeEvent<any>) => {
    const name = e.target.name;
    const value = e.target.value;
    this.props.onFormChange(name, value);
  };

  componentWillReceiveProps = (nextProps: any) => {
    const npc = { ...nextProps.npc };
    this.setState({
      npc: {
        ...npc
      }
    });
  };
  toggleStatBlockModal = () => {
    this.setState({
      app: {
        statBlockModal: !this.state.app.statBlockModal
      }
    });
  };

  render() {
    return (
      <div>
        {!this.props.isMobile ? (
          <div className="sticky stickybar">
            <div className="d-flex justify-content-between align-items-center py-2">
              <h4>
                {this.state.npc.name !== ""
                  ? this.state.npc.name
                  : "New Character"}
              </h4>
              <div className="d-flex justify-content-end">
                <Link to={routes.npcPage} className="mr-3">
                  <Button color="success" onClick={this.props.handleSubmit}>
                    Save
                  </Button>
                </Link>
                {!this.props.isDesktop && !this.props.isMobile && (
                  <Button
                    className="mr-3"
                    color="primary"
                    onClick={this.toggleStatBlockModal}
                  >
                    Preview
                  </Button>
                )}
                <Link to={routes.npcPage}>
                  <Button color="warning">Cancel</Button>
                </Link>
              </div>
            </div>
            <hr />
          </div>
        ) : (
          <div className="sticky stickybar">
            <h4 className="pt-2">
              {this.state.npc.name !== ""
                ? this.state.npc.name
                : "New Character"}
            </h4>
            <hr />
          </div>
        )}

        <Form>
          <FormGroup>
            <Label for="name">Name</Label>
            <Input
              type="text"
              name="name"
              id="name"
              placeholder={this.state.npc.name}
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
                  defaultValue={this.state.npc.size}
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
                  defaultValue={titleCase(this.state.npc.type)}
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
              defaultValue={sentenceCase(this.state.npc.alignment)}
              onChange={this.handleChange}
            >
              <option />
              {alignmentTypes.map(type => {
                return <option key={type}>{type}</option>;
              })}
            </Input>
          </FormGroup>
          <h4 className="mt-4">Stats</h4>
          <hr />
          <Row>
            <Col sm="12" md="6">
              <FormGroup>
                <Label for="armor_class">Armor Class</Label>
                <Input
                  type="number"
                  name="armor_class"
                  id="armor_class"
                  placeholder={String(this.state.npc.armor_class)}
                  onChange={this.handleChange}
                />
              </FormGroup>
            </Col>
            <Col sm="12" md="6">
              <FormGroup>
                <Label for="speed">Speed</Label>
                <Input
                  type="text"
                  name="speed"
                  id="speed"
                  placeholder={
                    this.state.npc.speed || "ex. 35ft ground, 40ft flying"
                  }
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
                  placeholder={String(this.state.npc.hit_points)}
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
                  placeholder={this.state.npc.hit_dice || "ex. 4d12"}
                  onChange={this.handleChange}
                />
              </FormGroup>
            </Col>
          </Row>
          <Row>
            <Col sm="12" md="6">
              <FormGroup>
                <Label for="challenge_rating">Challenge Rating</Label>
                <Input
                  type="select"
                  name="challenge_rating"
                  id="challenge_rating"
                  defaultValue={this.state.npc.challenge_rating}
                  onChange={this.handleChange}
                >
                  <option value="" />
                  {challengeRatings.map((challenge, i) => {
                    return <option key={i}>{challenge.rating} </option>;
                  })}
                </Input>
              </FormGroup>
            </Col>
            <Col sm="12" md="6">
              <FormGroup>
                <Label for="xp">Experience Points</Label>
                <Input
                  type="select"
                  name="xp"
                  id="xp"
                  defaultValue={this.state.npc.xp}
                  onChange={this.handleChange}
                >
                  {challengeRatings.map((challenge, i) => {
                    return <option key={i}>{challenge.xp}</option>;
                  })}
                </Input>
              </FormGroup>
            </Col>
          </Row>
          <h4 className="mt-4">Attributes</h4>
          <p className="font-weight-light">
            Use total of attribute, modifier will be calculated.{" "}
          </p>
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
                    placeholder={String(this.state.npc.strength)}
                    onChange={this.handleChange}
                  />
                </FormGroup>
                <FormGroup>
                  <Label for="dexterity">Dexterity</Label>
                  <Input
                    type="number"
                    name="dexterity"
                    id="dexterity"
                    placeholder={String(this.state.npc.dexterity)}
                    onChange={this.handleChange}
                  />
                </FormGroup>
                <FormGroup>
                  <Label for="constitution">Constitution</Label>
                  <Input
                    type="number"
                    name="constitution"
                    id="constitution"
                    placeholder={String(this.state.npc.constitution)}
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
                    placeholder={String(this.state.npc.wisdom)}
                    onChange={this.handleChange}
                  />
                </FormGroup>
                <FormGroup>
                  <Label for="intellect">Intellect</Label>
                  <Input
                    type="number"
                    name="intellect"
                    id="intellect"
                    placeholder={String(this.state.npc.intelligence)}
                    onChange={this.handleChange}
                  />
                </FormGroup>
                <FormGroup>
                  <Label for="charisma">Charisma</Label>
                  <Input
                    type="number"
                    name="charisma"
                    id="charisma"
                    placeholder={String(this.state.npc.charisma)}
                    onChange={this.handleChange}
                  />
                </FormGroup>
              </Col>
            </Row>
          </FormGroup>
          <h4 className="mt-4">Vulnerabilities and Immunities</h4>
          <hr />
          <Row>
            <Col sm="12" md="6">
              <FormGroup>
                <Label for="damage_vulnerabilities">
                  Damage Vulnerabilities
                </Label>
                <Input
                  type="text"
                  name="damage_vulnerabilities"
                  id="damage_vulnerabilities"
                  placeholder={this.state.npc.damage_vulnerabilities}
                  onChange={this.handleChange}
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
                  placeholder={this.state.npc.damage_resistances}
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
                  placeholder={this.state.npc.damage_immunities}
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
                  placeholder={this.state.npc.condition_immunities}
                  onChange={this.handleChange}
                />
              </FormGroup>
            </Col>
          </Row>
          <Row className="mb-2">
            <Col sm="12" md="6">
              <NpcSavingThrows
                className="mt-4"
                listener={this.props.onFormChange}
                onDelete={this.props.onFormDelete}
                npc={this.state.npc}
              />
            </Col>
            <Col sm="12" md="6">
              <NpcSkills
                className="mt-4"
                listener={this.props.onSpecialFormChange}
                onDelete={this.props.onFormDelete}
                npc={this.state.npc}
              />
            </Col>
          </Row>
          <NpcSpecialAbilities
            className="mt-4"
            abilities={this.state.npc.special_abilities}
            onDelete={this.props.onFormDelete}
            listener={this.props.onSpecialFormChange}
          />
          <NpcActions
            className="mt-4"
            actions={this.state.npc.actions}
            listener={this.props.onSpecialFormChange}
            onDelete={this.props.onFormDelete}
          />
        </Form>
        {this.props.isMobile && (
          <div className="sticky footerbar py-1">
            <hr />
            <div className="d-flex justify-content-around">
              <Link to={routes.npcPage}>
                <Button color="success" onClick={this.props.handleSubmit}>
                  Save
                </Button>
              </Link>
              <Button color="primary" onClick={this.toggleStatBlockModal}>
                Preview
              </Button>
              <Link to={routes.npcPage}>
                <Button color="warning">Cancel</Button>
              </Link>
            </div>
          </div>
        )}
        <Modal
          isOpen={this.state.app.statBlockModal}
          toggle={this.toggleStatBlockModal}
          centered={true}
          scrollable={true}
        >
          <div>
            <StatBlock npc={this.state.npc} modal={true} />
            <Button
              className="mr-3 mb-3 float-right"
              color="warning"
              onClick={this.toggleStatBlockModal}
            >
              Close
            </Button>
          </div>
        </Modal>
      </div>
    );
  }
}

export default withSizes<{}, Props>(mapSizesToProps)(NpcForm);
