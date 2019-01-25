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
import * as styles from "./CharCard.css";

const CharCard = props => {
  return (
    <Col sm="4">
      <Card className={styles.charCard}>
        <CardBody>
          <CardTitle>{props.char.characterName}</CardTitle>
          <CardSubtitle>{props.char.characterName}</CardSubtitle>
          <CardText>
            Some quick CharCard text to build on the card title and make up the
            bulk of the card's content.
          </CardText>
          <Button onClick={props.removeFromTracker}>Remove</Button>
        </CardBody>
      </Card>
    </Col>
  );
};

const mapDispatchToProps = (dispatch, ownProps) => {
  console.log('THIS', ownProps);
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
)(CharCard);
