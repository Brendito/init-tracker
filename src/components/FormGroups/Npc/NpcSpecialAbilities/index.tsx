import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { Component } from "react";
import { ListGroup, Modal } from "reactstrap";

import { initialStates } from "../../../../constants/initialStates";
import { SpecialAbility } from "../../../../models";
import NpcSpecialAbility from "./NpcSpecialAbility";
import NpcSpecialAbilityModal from "./NpcSpecialAbilityModal";

interface Props {
  listener: (obj: SpecialAbility, type: string) => void;
  onDelete: (obj: any, type: string) => void;
  abilities: Array<SpecialAbility>;
  className: string;
}

class NpcSpecialAbilities extends Component<Props> {
  state = {
    abilities: this.props.abilities,
    abilityAdd: false,
    ability: {
      ...initialStates.specialAbility
    }
  };

  componentWillReceiveProps = (nextProps: any) => {
    if (nextProps.abilities) {
      this.setState({
        abilities: [...nextProps.abilities]
      });
    }
  };

  toggleModal = () => {
    this.setState({
      abilityAdd: !this.state.abilityAdd,
      ability: {}
    });
  };

  handleSubmit = (ability: SpecialAbility) => {
    this.toggleModal();
    if (ability.name) {
      return this.props.listener(ability, "ability");
    } else {
      //  TODO: Add Error Handling
      console.log("Error on special ability");
    }
  };

  handleLoadModal = (ability: SpecialAbility) => {
    this.toggleModal();
    this.setState({ ability: ability });
  };

  handleDelete = (ability: SpecialAbility) => {
    this.props.onDelete(ability, "ability");
  };

  render() {
    return (
      <div>
        <div className="d-flex justify-content-between">
          <h5>Special Abilities</h5>
          <span onClick={this.toggleModal} className="font-weight-light">
            Add New Ability
            <FontAwesomeIcon icon="plus" className="ml-2" size="1x" />
          </span>
        </div>
        <hr className="mt-1" />
        <ListGroup>
          {this.state.abilities &&
            this.state.abilities.length > 0 &&
            this.state.abilities.map((ability, i) => {
              return (
                <NpcSpecialAbility
                  key={i}
                  onLoadModal={this.handleLoadModal}
                  onDelete={this.handleDelete}
                  ability={ability}
                />
              );
            })}
        </ListGroup>
        <Modal isOpen={this.state.abilityAdd} toggle={this.toggleModal}>
          <NpcSpecialAbilityModal
            ability={this.state.ability}
            toggle={this.toggleModal}
            handleSubmit={this.handleSubmit}
          />
        </Modal>
      </div>
    );
  }
}

export default NpcSpecialAbilities;
