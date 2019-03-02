import React, { Component } from "react";
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

class NpcSpecialAbilities extends Component {
  constructor(props) {
    super(props);
    this.state = {
      abilityAdd: false,
      abilityName: "",
      abilityDesc: ""
    };
    this.toggleModal = this.toggleModal.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.handleLoadModal = this.handleLoadModal.bind(this);
  }

  toggleModal() {
    this.setState({
      abilityAdd: !this.state.abilityAdd,
      abilityName: "",
      abilityDesc: ""
    });
  }

  handleSubmit() {
    this.toggleModal();
    let abilityName = document.getElementById("abilityName").value;
    let abilityDesc = document.getElementById("abilityDesc").value;
    let abilityObj = {
      name: abilityName,
      desc: abilityDesc
    };

    if (abilityName !== "" && abilityDesc != "") {
      return this.props.listener(abilityObj, "ability");
    } else {
      console.log("Error on special ability");
    }
  }

  handleLoadModal(e) {
    let name = "";
    let desc = "";
    if (e.target.parentNode.dataset.name === undefined) {
      name = e.target.dataset.name;
      desc = e.target.dataset.desc;
    } else if (e.target.parentNode.dataset.name !== undefined) {
      name = e.target.parentNode.dataset.name;
      desc = e.target.parentNode.dataset.desc;
    }
    this.toggleModal();
    this.setState({ abilityName: name, abilityDesc: desc });
  }

  handleDelete(e) {
    const name =
      e.target.parentNode.dataset.name !== undefined
        ? e.target.parentNode.dataset.name
        : e.target.dataset.name;
    console.log("name", name);
    this.props.onDelete(name, "ability");
  }

  render() {
    return (
      <div>
        <h4>Abiities</h4>
        <ListGroup>
          {this.props.abilities !== undefined &&
            this.props.abilities.map((ability, i) => {
              return (
                <ListGroupItem key={i}>
                  <div className="d-flex flex-column align-content-center">
                    <span className="mr-3">{ability.name}</span>
                    <p>{ability.desc}</p>
                  </div>
                  <div className="d-flex m-1">
                    <FontAwesomeIcon
                      icon="edit"
                      className="m-1"
                      data-name={ability.name}
                      data-desc={ability.desc}
                      onClick={this.handleLoadModal}
                    />
                    <FontAwesomeIcon
                      icon="times"
                      className="m-1"
                      data-name={ability.name}
                      onClick={this.handleDelete}
                    />
                  </div>
                </ListGroupItem>
              );
            })}
        </ListGroup>
        <Button className="mt-2" name="skillAdd" onClick={this.toggleModal}>
          Add Ability
        </Button>
        <Modal isOpen={this.state.abilityAdd} toggle={this.toggleModal}>
          <div className="p-3">
            {this.state.abilityName === "" ? (
              <h4>Add New Ability</h4>
            ) : (
              <h4>Edit - {this.state.abilityName}</h4>
            )}

            <FormGroup>
              <Label for="abilityName">Ability Name</Label>
              <Input
                type="text"
                name="abilityName"
                id="abilityName"
                defaultValue={this.state.abilityName}
              />
            </FormGroup>
            <FormGroup>
              <Label for="abilityDesc">Ability Description</Label>
              <Input
                type="textarea"
                name="abilityDesc"
                id="abilityDesc"
                defaultValue={this.state.abilityDesc}
              />
            </FormGroup>
            <Button onClick={this.handleSubmit}>Save</Button>
          </div>
        </Modal>
      </div>
    );
  }
}

export default NpcSpecialAbilities;
