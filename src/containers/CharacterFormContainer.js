import React from "react";
import CharacterForm from "../components/CharacterForm/CharacterForm";
import { addToTracker } from "../actions/trackerActions";
import { connect } from "react-redux";
import { v4 } from "node-uuid";

class AddCharacterForm extends React.Component {
  submit = values => {
    // Do something with the form values
    values.id = v4();
    this.props.addToTracker(values);
  };
  render() {
    return <CharacterForm onSubmit={this.submit} />;
  }
}

export default connect(
  null,
  { addToTracker }
)(AddCharacterForm);
