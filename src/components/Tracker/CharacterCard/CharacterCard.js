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
        <Card className={styles.CharacterCard}>
          <CardBody>
            <CardTitle>{this.props.characterName}</CardTitle>
            <CardSubtitle>{this.props.characterName}</CardSubtitle>
            <CardText>
              Some quick CharacterCard text to build on the card title and make
              up the bulk of the card's content.
            </CardText>
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
        key: ownProps.char.key
      })
  };
};

export default connect(
  null,
  mapDispatchToProps
)(CharacterCard);
