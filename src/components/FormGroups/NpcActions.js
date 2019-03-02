import React, { Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  ListGroup,
  ListGroupItem,
  Modal,
  Button,
  Input,
  Label,
  FormGroup,
  Row,
  Col
} from "reactstrap";

class NpcActions extends Component {
  constructor(props) {
    super(props);
    this.state = {
      actionAdd: false,
      actionName: "",
      actionDesc: "",
      actionHit: "",
      actionDice: "",
      actionBonus: ""
    };
  }

  toggleModal = () => {
    this.setState({
      actionAdd: !this.state.actionAdd,
      actionName: "",
      actionDesc: "",
      actionHit: "",
      actionDice: "",
      actionBonus: ""
    });
  }

  handleSubmit = () => {
    this.toggleModal();
    let actionName = document.getElementById("actionName").value;
    let actionDesc = document.getElementById("actionDesc").value;
    let attackBonus = document.getElementById("attackBonus").value;
    let damageDice = document.getElementById("damageDice").value;
    let damageBonus = document.getElementById("damageBonus").value;

    let actionObj = {
      name: actionName,
      desc: actionDesc,
      attack_bonus: attackBonus,
      damage_dice: damageDice,
      damage_bonus: damageBonus
    };

    if (actionName !== "" && actionDesc !== "") {
      return this.props.listener(actionObj, "action");
    } else {
      console.log("Error on special ability");
    }
  }

  handleLoadModal = (e) => {
    let name = "";
    let desc = "";
    let attackbonus = "";
    let damagedice = "";
    let damagebonus = "";

    if (e.target.parentNode.dataset.name === undefined) {
      name = e.target.dataset.name;
      desc = e.target.dataset.desc;
      attackbonus = e.target.dataset.attackbonus;
      damagedice = e.target.dataset.damagedice;
      damagebonus = e.target.dataset.damagebonus;
    } else if (e.target.parentNode.dataset.name !== undefined) {
      name = e.target.parentNode.dataset.name;
      desc = e.target.parentNode.dataset.desc;
      attackbonus = e.target.parentNode.dataset.attackbonus;
      damagedice = e.target.parentNode.dataset.damagedice;
      damagebonus = e.target.parentNode.dataset.damagebonus;
    }
    this.toggleModal();
    this.setState({
      actionName: name,
      actionDesc: desc,
      attackBonus: attackbonus,
      damageDice: damagedice,
      damageBonus: damagebonus
    });
  }

  handleDelete = (e) => {
    const name =
      e.target.parentNode.dataset.name !== undefined
        ? e.target.parentNode.dataset.name
        : e.target.dataset.name;
    console.log("name", name);
    this.props.onDelete(name, "action");
  }

  render() {
    return (
      <div>
        <h4>Actions</h4>
        <ListGroup>
          {this.props.actions !== undefined &&
            this.props.actions.map((action, i) => {
              return (
                <ListGroupItem key={i}>
                  <div className="d-flex flex-column align-content-center">
                    <span className="font-weight-bold mb-2">{action.name}</span>
                    <p>{action.desc}</p>
                  </div>
                  {action.attack_bonus !== 0 && action.damage_bonus !== null && (
                    <div>
                      <span className="mr-3">
                        <span className="font-weight-bold mr-1">
                          +{action.attack_bonus}
                        </span>
                        to Hit
                      </span>
                      <span className="font-weight-bold">
                        {action.damage_dice} + {action.damage_bonus}
                      </span>
                    </div>
                  )}
                  <div className="d-flex m-1 justify-content-end">
                    <FontAwesomeIcon
                      icon="edit"
                      className="m-1"
                      data-name={action.name}
                      data-desc={action.desc}
                      data-attackbonus={action.attack_bonus}
                      data-damagedice={action.damage_dice}
                      data-damagebonus={action.damage_bonus}
                      onClick={this.handleLoadModal}
                    />
                    <FontAwesomeIcon
                      icon="times"
                      className="m-1"
                      data-name={action.name}
                      onClick={this.handleDelete}
                    />
                  </div>
                </ListGroupItem>
              );
            })}
        </ListGroup>
        <Button className="mt-2" name="skillAdd" onClick={this.toggleModal}>
          Add Action
        </Button>
        <Modal isOpen={this.state.actionAdd} toggle={this.toggleModal}>
          <div className="p-3">
            {this.state.actionName === "" ? (
              <h4>Add New Action</h4>
            ) : (
              <h4>Edit - {this.state.actionName}</h4>
            )}

            <FormGroup>
              <Label for="actionName">Action Name</Label>
              <Input
                type="text"
                name="actionName"
                id="actionName"
                defaultValue={this.state.actionName}
              />
            </FormGroup>
            <FormGroup>
              <Label for="actionDesc">Action Description</Label>
              <Input
                type="textarea"
                name="actionDesc"
                id="actionDesc"
                defaultValue={this.state.actionDesc}
              />
            </FormGroup>
            <Row>
              <Col sm="12" md="4">
                <FormGroup>
                  <Label for="attackBonus">Attack Bonus</Label>
                  <Input
                    type="number"
                    name="attackBonus"
                    id="attackBonus"
                    defaultValue={this.state.attackBonus}
                  />
                </FormGroup>
              </Col>
              <Col sm="12" md="4">
                <FormGroup>
                  <Label for="damageDice">Damage Dice</Label>
                  <Input
                    type="text"
                    name="damageDice"
                    id="damageDice"
                    defaultValue={this.state.damageDice}
                  />
                </FormGroup>
              </Col>
              <Col sm="12" md="4">
                <FormGroup>
                  <Label for="damageBonus">Damage Bonus</Label>
                  <Input
                    type="number"
                    name="damageBonus"
                    id="damageBonus"
                    defaultValue={this.state.damageBonus}
                  />
                </FormGroup>
              </Col>
            </Row>
            <Button onClick={this.handleSubmit}>Save</Button>
          </div>
        </Modal>
      </div>
    );
  }
}

export default NpcActions;
