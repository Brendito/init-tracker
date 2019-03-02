import React, { Component } from "react";
import { attributeTypes, statNumbers } from "../../constants/npcInformation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  ListGroup,
  ListGroupItem,
  Modal,
  Button,
  Input,
  Label,
  FormGroup
} from "reactstrap";

class NpcSavingThrows extends Component {
  constructor(props) {
    super(props);
    this.state = {
      savingThrowAdd: false
    };
    this.toggleModal = this.toggleModal.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
  }

  toggleModal() {
    this.setState({ savingThrowAdd: !this.state.savingThrowAdd });
  }

  handleSubmit() {
    this.toggleModal();
    let savingThrowType = document.getElementById("savingThrowType").value;
    let savingThrowAmount = document.getElementById("savingThrowAmount").value;
    if (savingThrowType !== "" && savingThrowAmount != "") {
      return this.props.listener(savingThrowType, savingThrowAmount);
    } else {
      console.log("Error on Saving Throw");
    }
  }

  handleDelete(e) {
    const name = e.target.parentNode.dataset.name !== undefined ?  e.target.parentNode.dataset.name : e.target.dataset.name;
    this.props.onDelete(name);
  }

  render() {
    return (
      <div>
        <h4>Saving Throws</h4>
        <ListGroup>
          {attributeTypes.map((type, i) => {
            if (this.props[type.id] !== undefined) {
              return (
                <ListGroupItem key={i}>
                  <div className="d-flex justify-content-between align-content-center">
                    <div>
                      <span className="mr-3">{type.name}</span>
                      <em>+{this.props[type.id]}</em>
                    </div>
                    <FontAwesomeIcon
                      icon="times"
                      className="mt-1"
                      data-name={type.id}
                      onClick={this.handleDelete}
                    />
                  </div>
                </ListGroupItem>
              );
            }
          })}
        </ListGroup>
        <Button
          className="mt-2"
          name="savingThrowAdd"
          onClick={this.toggleModal}
        >
          Add Saving Throw
        </Button>
        <Modal isOpen={this.state.savingThrowAdd} toggle={this.toggleModal}>
          <div className="p-3">
            <h4>Add New Saving Throw</h4>
            <FormGroup>
              <Label for="savingThrowType">Saving Throw Type</Label>
              <Input type="select" name="savingThrowType" id="savingThrowType">
                {attributeTypes.map((type, i) => {
                  return (
                    <option value={type.id} key={i}>
                      {type.name}
                    </option>
                  );
                })}
              </Input>
            </FormGroup>
            <FormGroup>
              <Label for="savingThrowAmount">Saving Throw Amount</Label>
              <Input
                type="select"
                name="savingThrowAmount"
                id="savingThrowAmount"
              >
                {statNumbers.map((num, i) => {
                  return <option key={i}>{num}</option>;
                })}
              </Input>
            </FormGroup>
            <Button name="savingThrow" onClick={this.handleSubmit}>
              Add Saving Throw
            </Button>
          </div>
        </Modal>
      </div>
    );
  }
}

export default NpcSavingThrows;
