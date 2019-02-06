import React from "react";
import { connect } from "react-redux";
import * as actionTypes from "../../../constants/actionTypes";
import {
  Card,
  Col,
  CardBody,
  CardTitle,
  CardSubtitle,
  Badge
} from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./CharacterCard.css";
import { Modal } from "reactstrap";
import CharacterEditor from "../../CharacterEditor/CharacterEditor";
import HealthBar from "./HealthBar/HealthBar";
import { handleCharacterIcon } from "../../../utils/characterIconUtil";
import AC from "../../../assets/icons/AC";

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
      <Col sm="6" md="4">
        <Card>
          <CardBody>
            <div className="d-flex justify-content-between mb-2">
              <div className="d-flex">
                <div className="characterIcon">
                  {handleCharacterIcon(this.props.characterClass)}
                </div>
                <div className="d-flex flex-column">
                  <CardTitle>{this.props.characterName}</CardTitle>
                  <CardSubtitle>{this.props.playerName}</CardSubtitle>
                </div>
              </div>
              <AC id="acIcon" ac={this.props.stats.ac} />
            </div>
            <HealthBar className="my-3" {...this.props} />
            <div className="d-flex justify-content-between py-2">
              <Badge color="secondary">Status</Badge>
              <Badge color="secondary">Reaction Used</Badge>
            </div>
            <div className="float-right">
              <FontAwesomeIcon
                className="mr-2"
                icon="edit"
                onClick={this.toggleEditor}
              />
              <FontAwesomeIcon
                icon="times"
                onClick={this.props.removeFromTracker}
              />
            </div>
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
