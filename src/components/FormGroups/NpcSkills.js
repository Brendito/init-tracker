import React, { Component } from "react";
import { statNumbers, skills } from "../../constants/npcInformation";
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
      skillProfAdd: false
    };
    this.toggleModal = this.toggleModal.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
  }

  toggleModal() {
    this.setState({ skillProfAdd: !this.state.skillProfAdd });
  }

  handleSubmit() {
    this.toggleModal();
    let skillType = document.getElementById("skillType").value;
    let skillAmount = document.getElementById("skillAmount").value;
    if (skillType !== "" && skillAmount != "") {
      return this.props.listener(skillType, skillAmount);
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
        <h4>Skills</h4>
        <ListGroup>
          {skills.map((skill, i) => {
            if (this.props[skill.id] !== undefined) {
              return (
                <ListGroupItem key={i}>
                  <div className="d-flex justify-content-between align-content-center">
                    <div>
                      <span className="mr-3">{skill.name}</span>
                      <em>+{this.props[skill.id]}</em>
                    </div>
                    <FontAwesomeIcon
                      icon="times"
                      className="mt-1"
                      data-name={skill.id}
                      onClick={this.handleDelete}
                    />
                  </div>
                </ListGroupItem>
              );
            }
          })}
        </ListGroup>
        <Button className="mt-2" name="skillAdd" onClick={this.toggleModal}>
          Add Skill
        </Button>
        <Modal isOpen={this.state.skillProfAdd} toggle={this.toggleModal}>
          <div className="p-3">
          {this.state.sk}
            <h4>Add New Skill</h4>
            <FormGroup>
              <Label for="skillType">Skill Type</Label>
              <Input type="select" name="skillType" id="skillType">
                <option />
                {skills.map((skill, i) => {
                  return (
                    <option value={skill.id} key={i}>
                      {skill.name}
                    </option>
                  );
                })}
              </Input>
            </FormGroup>
            <FormGroup>
              <Label for="skillAmount">Skill Amount</Label>
              <Input type="select" name="skillAmount" id="skillAmount">
                <option />
                {statNumbers.map(num => {
                  return <option key={num}>{num}</option>;
                })}
              </Input>
            </FormGroup>
            <Button name="savingThrow" onClick={this.handleSubmit}>
              Add Skill
            </Button>
          </div>
        </Modal>
      </div>
    );
  }
}

export default NpcSavingThrows;
