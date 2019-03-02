import React, { Component } from "react";
import NpcForm from "../components/NpcForm/NpcForm";

class NpcFormContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      char: {}
    };
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ char: { ...nextProps.char } });
  }

  handleFormChange = (name, value) => {
    this.setState({
      ...this.state,
      char: { ...this.state.char, [name]: value }
    });
  }

  handleEditSubmit = () => {
    this.props.onEditSubmit(this.state.char)
  }

  handleSubmit = () => {
    this.props.onSubmit(this.state.char)

  }

  handleSpecialFormChange = (obj, type) => {
    switch (type) {
      case "ability":
      let npcAbilities = this.state.char.special_abilities.filter(ability => ability.name !== obj.name);
        return this.setState({
          char: {
            ...this.state.char,
            special_abilities: [...npcAbilities, obj]
          }
        });
      case "action":
      let npcActions = this.state.char.actions.filter(action => action.name !== obj.name);
        return this.setState({
          char: {
            ...this.state.char,
            actions: [...npcActions, obj]
          }
        });
      default:
        return console.log("Error");
    }
  }

  handleDelete = (key, type) => {
    const prevState = this.state.char;
    switch (type) {
      case "ability":
        let updatedAbilities = prevState.special_abilities.filter(ability => {
          return ability.name != key;
        });
        return this.setState({
          char: {
            ...prevState,
            special_abilities: [...updatedAbilities]
          }
        });
      case "action":
        let updatedActions = prevState.actions.filter(action => {
          return action.name != key;
        });
        return this.setState({
          char: {
            ...prevState,
            actions: [...updatedActions]
          }
        });
      default:
        delete prevState[key];
        return this.setState({
          char: {
            ...prevState
          }
        });
    }
  }

  render() {
    return (
      <NpcForm
        onFormChange={this.handleFormChange}
        editingNpc={this.props.editingNpc}
        onCancel={this.props.onCancel}
        onEditSubmit={this.handleEditSubmit}
        className={this.props.className}
        onSpecialFormChange={this.handleSpecialFormChange}
        onDelete={this.handleDelete}
        handleSubmit={this.handleSubmit}

        {...this.state.char}
      />
    );
  }
}

export default NpcFormContainer;
