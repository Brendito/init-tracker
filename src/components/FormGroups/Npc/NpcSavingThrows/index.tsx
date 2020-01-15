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
import {
  attributeTypes,
  statNumbers
} from "../../../../constants/npcInformation";
import { Npc } from "../../../../models";

interface Props {
  listener: (name: string, value: any) => void;
  onDelete: (name: string, value: any) => void;
  npc: Npc;
  className: string;
}

interface SavingThrow {
  name: string;
  id: string;
}

class NpcSavingThrows extends Component<Props> {
  state = {
    npc: { ...this.props.npc },
    savingThrowAdd: false
  };

  toggleModal = () => {
    this.setState({ savingThrowAdd: !this.state.savingThrowAdd });
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

    let savingThrowType = (document as HTMLDocument).getElementById(
      "savingThrowType"
    ) as HTMLInputElement;

    console.log("savingThrowType: ", savingThrowType.value);
    let savingThrowAmount = (document as HTMLDocument).getElementById(
      "savingThrowAmount"
    ) as HTMLInputElement;

    console.log("savingThrowAmount: ", savingThrowAmount.value);

    if (savingThrowType.value && savingThrowAmount.value) {
      return this.props.listener(
        savingThrowType.value,
        Number(savingThrowAmount.value)
      );
    } else {
      //  TODO: Add error handling
      console.log("Error on Saving Throw");
    }
  };

  handleDelete = (e: any) => {
    const name = e.target.dataset.name;
    console.log(name);
    this.props.onDelete(name, null);
  };

  render() {
    return (
      <div className="my-2">
        <div className="d-flex justify-content-between">
          <h5>Saving Throws</h5>
          <span onClick={this.toggleModal} className="font-weight-light">
            Add New Saving Throw
            <FontAwesomeIcon icon="plus" className="ml-2" size="1x" />
          </span>
        </div>
        <hr className="mt-1" />
        <ListGroup>
          {attributeTypes.map((type: SavingThrow, i) => {
            if (this.state.npc[type.id]) {
              return (
                <ListGroupItem key={i} className="mt-1">
                  <div className="d-flex justify-content-between align-content-center">
                    <div>
                      <span className="font-weight-bold mr-2">
                        +{this.state.npc[type.id]}
                      </span>
                      <span>{type.name}</span>
                    </div>
                    <span onClick={this.handleDelete} data-name={type.id}>
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

        <Modal isOpen={this.state.savingThrowAdd} toggle={this.toggleModal}>
          <div className="p-3">
            <h4>Add New Saving Throw</h4>
            <FormGroup>
              <Label for="savingThrowType">Saving Throw Type</Label>
              <Input type="select" name="savingThrowType" id="savingThrowType">
                {attributeTypes.map((type: SavingThrow, i) => {
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
            <div className="d-flex justify-content-end">
              <Button
                color="success"
                className="mr-3"
                onClick={this.handleSubmit}
              >
                Add Saving Throw
              </Button>
              <Button color="warning" onClick={this.toggleModal}>
                Cancel
              </Button>
            </div>
          </div>
        </Modal>
      </div>
    );
  }
}

export default NpcSavingThrows;
