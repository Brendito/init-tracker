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
  Badge
} from "reactstrap";
import * as styles from "./CharacterCard.css";
import { Modal } from "reactstrap";
import CharacterEditor from "../../CharacterEditor/CharacterEditor";
import HealthBar from "./HealthBar/HealthBar";
import * as types from '../../../constants/characterClasses';
import {Wizard, Rogue} from '../../../assets/classes/classes';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import AC from "../../../assets/icons/AC";

class CharacterCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      editorIsOpen: false
    };
    this.toggleEditor = this.toggleEditor.bind(this);
    this.handleClassIcon = this.handleClassIcon.bind(this);
  }

  toggleEditor() {
    this.setState({ editorIsOpen: !this.state.editorIsOpen });
  }

  // Make Util
  handleClassIcon() {
    const charClass = this.props.characterClass;
    switch (charClass) {
      case types.WIZARD:
        return (<Wizard/>);
      default:
        return (<Rogue/>);
    }
  }
  render() {
    return (
      <Col sm="6" md="4">
        <Card className={styles.CharacterCard} >
          <CardBody>
            <div className="d-flex justify-content-between mb-2">
              <div>{this.handleClassIcon()}</div>
              <div className="d-flex flex-column">
                <CardTitle>{this.props.characterName}</CardTitle>
                <CardSubtitle>{this.props.playerName}</CardSubtitle>
              </div>
              <AC id="acIcon" ac={this.props.stats.ac} />
            </div>
            <HealthBar className="my-3" {...this.props} />
            <div className="d-flex justify-content-between py-2">
              <Badge color="secondary">Status</Badge>
              <Badge color="secondary">Reaction Used</Badge>
            </div>
            <div className="float-right">
              <FontAwesomeIcon className="mr-2" icon="edit" onClick={this.toggleEditor} />
              <FontAwesomeIcon icon="times" onClick={this.props.removeFromTracker} />
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
