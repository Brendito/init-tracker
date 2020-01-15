import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { Component } from "react";
import {
  Button,
  FormGroup,
  Input,
  Label,
  ListGroup,
  ListGroupItem,
  Modal
} from "reactstrap";

import { skills, statNumbers } from "../../../../constants/npcInformation";
import { Npc } from "../../../../models";

interface Props {
  listener: (name: any, value: any) => void;
  onDelete: (name: string, type: any) => void;
  npc: Npc;
  className: string;
}

class NpcSavingThrows extends Component<Props> {
  state = {
    npc: { ...this.props.npc },
    skillProfAdd: false
  };

  toggleModal = () => {
    this.setState({ skillProfAdd: !this.state.skillProfAdd });
  };

  componentWillReceiveProps = (nextProps: any) => {
    this.setState({
      npc: {
        ...nextProps.npc
      }
    });
  };

  handleSubmit = () => {
    this.toggleModal();

    let skillType = (document as HTMLDocument).getElementById(
      "skillType"
    ) as HTMLInputElement;

    let skillAmount = (document as HTMLDocument).getElementById(
      "skillAmount"
    ) as HTMLInputElement;

    if (skillType.value !== "" && skillAmount.value !== "") {
      return this.props.listener(skillType.value, Number(skillAmount.value));
    } else {
      //  TODO: Add error handling
      console.log("Error on Saving Throw");
    }
  };

  handleDelete = (e: React.ChangeEvent<any>) => {
    const name = e.target.dataset.name;
    this.props.onDelete(name, "");
  };

  render() {
    return (
      <div className="my-2">
        <div className="d-flex justify-content-between">
          <h5>Skills</h5>
          <span onClick={this.toggleModal} className="font-weight-light">
            Add New Skill
            <FontAwesomeIcon icon="plus" className="ml-2" size="1x" />
          </span>
        </div>
        <hr className="mt-1" />
        <ListGroup>
          {skills.map((skill, i) => {
            if (this.state.npc[skill.id]) {
              return (
                <ListGroupItem className="mt-1" key={i}>
                  <div className="d-flex justify-content-between align-content-center">
                    <div>
                      <span className="font-weight-bold mr-3">
                        +{this.state.npc[skill.id]}
                      </span>
                      <span>{skill.name}</span>
                    </div>
                    <span data-name={skill.id} onClick={this.handleDelete}>
                      <FontAwesomeIcon icon="times" className="mt-1" />
                    </span>
                  </div>
                </ListGroupItem>
              );
            } else {
              return null;
            }
          })}
        </ListGroup>

        <Modal isOpen={this.state.skillProfAdd} toggle={this.toggleModal}>
          <div className="p-3">
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
                {statNumbers.map((num: number) => {
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
