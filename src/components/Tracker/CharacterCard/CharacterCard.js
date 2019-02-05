import React from "react";
import { connect } from "react-redux";
import * as actionTypes from "../../../constants/actionTypes";
import {
  Card,
  Col,
  CardText,
  CardBody,
  CardTitle,
  CardSubtitle,
  Button
} from "reactstrap";
import * as styles from "./CharacterCard.css";
import {Modal} from "reactstrap";
import CharacterEditor from "../../CharacterEditor/CharacterEditor";
import HealthBar from "./HealthBar/HealthBar";

class CharacterCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      editorIsOpen: false
    };
    this.toggleEditor = this.toggleEditor.bind(this);
  }

  toggleEditor() {
    this.setState({ editorIsOpen: !this.state.editorIsOpen });
  }
  render() {
    return (
      <Col sm="4">
        <Card className={styles.CharacterCard} onClick={this.toggleEditor}>
          <CardBody>
            <CardTitle>{this.props.characterName}</CardTitle>
            <CardSubtitle>{this.props.playerName}</CardSubtitle>
            <HealthBar {...this.props}/>
            <Button onClick={this.toggleEditor}>Edit</Button>
            <Button onClick={this.props.removeFromTracker}>Remove</Button>
          </CardBody>
        </Card>
        <Modal isOpen={this.state.editorIsOpen} toggle={this.toggleEditor}>
          <CharacterEditor closeModal={this.toggleEditor} {...this.props} />
        </Modal>
      </Col>
    );
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    removeFromTracker: () =>
      dispatch({
        type: actionTypes.REMOVE_FROM_TRACKER,
        id: ownProps.id
      })
  };
};

export default connect(
  null,
  mapDispatchToProps
)(CharacterCard);
