import { v4 } from "node-uuid";
import React, { Component } from "react";
import { connect } from "react-redux";
import withSizes from "react-sizes";
import { Col, Container, Row } from "reactstrap";
import * as Redux from "redux";
import { bindActionCreators, compose } from "redux";
import { savedActionCreators, SavedActionCreators } from "../../../actions";
import StatBlock from "../../../components/StatBlock";
import { mapSizesToProps } from "../../../hoc/screenSizes";
import { Action, Npc, SpecialAbility } from "../../../models";
import NpcForm from "./NpcForm";

interface Props {
  npc: Npc;
  location: any;
  savedActions: SavedActionCreators;
  isDesktop: boolean;
  isMobile: boolean;
}

class NpcFormContainer extends Component<Props> {
  state = {
    npc: { ...this.props.npc, ...this.props.location.state.npc }
  };

  componentWillReceiveProps(nextProps: any) {
    const npc = nextProps.npc ? nextProps.npc : nextProps.location.state.npc;
    this.setState({
      npc: { ...npc },
      characterType: nextProps.characterType
    });
  }
  // Listen for form changes
  handleFormChange = (name: string, value: any) => {
    this.setState({
      ...this.state,
      npc: { ...this.state.npc, [name]: value }
    });
  };
  // Send redux action with the npc, generate a new ID if the user is creating a new NPC
  handleSubmit = () => {
    let npc;
    if (this.props.location.state.editing) {
      npc = { ...this.state.npc, dataType: "Custom" };
    } else {
      npc = { ...this.state.npc, dataType: "Custom", id: v4() };
    }
    this.props.savedActions.saveNPC(npc);
  };

  // Listen for form changes that have specific locations in npc object structure
  handleSpecialFormChange = (data: any, type: string) => {
    switch (type) {
      case "ability":
        let npcAbilities = this.state.npc.special_abilities.filter(
          (ability: SpecialAbility) => ability.name !== data.name
        );
        return this.setState({
          npc: {
            ...this.state.npc,
            special_abilities: [data, ...npcAbilities]
          }
        });
      case "action":
        let npcActions = this.state.npc.actions.filter(
          (action: Action) => action.name !== data.name
        );
        return this.setState({
          npc: {
            ...this.state.npc,
            actions: [data, ...npcActions]
          }
        });
      default:
        // TODO: Handle error
        return console.log("Error");
    }
  };
  // Listen for any deletions of data
  handleFormDelete = (data: any, type: string) => {
    const prevState = { ...this.state.npc };
    switch (type) {
      case "ability":
        let updatedAbilities = prevState.special_abilities.filter(
          (ability: SpecialAbility) => {
            return ability.name !== data.name;
          }
        );
        return this.setState({
          npc: {
            ...prevState,
            special_abilities: [...updatedAbilities]
          }
        });
      case "action":
        let updatedActions = prevState.actions.filter((action: Action) => {
          return action.name !== data;
        });
        return this.setState({
          npc: {
            ...prevState,
            actions: [...updatedActions]
          }
        });
      default:
        delete prevState[data];
        return this.setState({
          npc: {
            ...prevState
          }
        });
    }
  };

  render() {
    return (
      <Container fluid>
        <Row>
          <Col md={this.props.isDesktop ? "6" : "12"}>
            <NpcForm
              onFormChange={this.handleFormChange}
              onSpecialFormChange={this.handleSpecialFormChange}
              handleSubmit={this.handleSubmit}
              onFormDelete={this.handleFormDelete}
              npc={{ ...this.state.npc }}
            />
          </Col>
          {this.props.isDesktop && (
            <Col lg="6">
              <StatBlock npc={{ ...this.state.npc }} modal={false} />
            </Col>
          )}
        </Row>
      </Container>
    );
  }
}

const mapDispatchToProps = (dispatch: Redux.Dispatch<Redux.AnyAction>) => {
  return {
    savedActions: bindActionCreators(savedActionCreators, dispatch)
  };
};

export default compose(
  connect(null, mapDispatchToProps),
  withSizes<{}, Props>(mapSizesToProps)
)(NpcFormContainer);
