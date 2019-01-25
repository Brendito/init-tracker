import React from "react";
import {
  Row,
  Container,
  Col,
  Button,
  Form,
  FormGroup,
  Label,
  Input
} from "reactstrap";
import Attributes from "../FormGroups/Attributes";

class CharacterEditor extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      ...props.char
    };
    this.formGroupListener = this.formGroupListener.bind(this);
  }

  formGroupListener(payload) {

    // this.setState({ attributes: ...this.state.attributes, payload });
  }
  render() {
    console.log(this.state);

    return (
      <div className="m-4">
        <Container>
          <h3>{this.props.characterName}</h3>
          <h5>{this.props.playerName}</h5>
          <Attributes listener={this.formGroupListener} />
        </Container>
      </div>
    );
  }
}

export default CharacterEditor;
