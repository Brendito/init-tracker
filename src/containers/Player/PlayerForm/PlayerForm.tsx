import React, { Component } from "react";
import * as Redux from "redux";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { Button, Col, Container, Form, FormGroup, Row } from "reactstrap";
import { bindActionCreators } from "redux";
import { loadedActionCreators, LoadedActionCreators } from "../../../actions";
import {
  Attributes,
  CharacterClass,
  CharacterInformation,
  Stats
} from "../../../components/FormGroups";
import characterTypes from "../../../constants/characterTypes";
import routes from "../../../constants/routes";
import { Player } from "../../../models";

interface Props {
  location: any;
  player: Player;
}

interface DispatchProps {
  loadedActions: LoadedActionCreators;
}

interface StateProps {
  player: Player;
}

class PlayerForm extends Component<StateProps & DispatchProps & Props> {
  state = {
    characterType: characterTypes.PC,
    id: this.props.location.state.playerId,
    ...this.props.player
  };

  // Submit redux action to save player to campaign, replacing players via ID
  handleSubmit = (e: React.MouseEvent) => {
    if (this.state.name) {
      const player = this.state;
      player.tracker = {
        inTracker: false,
        initTotal: 0,
        current_hit_points: player.hit_points
      };
      this.props.loadedActions.savePlayer(this.state);
    } else {
      // TODO: Error state
      console.log("No name");
    }
  };

  // Listen to changes made in formGroups and update state
  formGroupListener = (name: string, value: any) => {
    this.setState({ ...this.state, [name]: value });
  };

  // Detect if editing a player or creating a new player and adjust messaging
  handleMessage = () => {
    return this.state.name === undefined
      ? "Create New Player Character"
      : this.state.name;
  };

  render() {
    return (
      <Container>
        <Form>
          <h4>{this.handleMessage()}</h4>
          <hr />
          <Row>
            <Col md="6">
              <CharacterInformation
                listener={this.formGroupListener}
                {...this.state}
              />
              <CharacterClass
                listener={this.formGroupListener}
                characterClass={this.state.characterClass}
              />
            </Col>
            <Col md="6">
              <Stats listener={this.formGroupListener} {...this.state} />
            </Col>
          </Row>
          <Row className="mt-2">
            <Col md="12">
              <Attributes listener={this.formGroupListener} {...this.state} />
            </Col>
          </Row>
          <FormGroup>
            <Link to={routes.playerPage}>
              <Button type="submit" onClick={this.handleSubmit} color="primary">
                {this.props.player === undefined ? "Add Player" : "Save"}
              </Button>
            </Link>
            <Link to={routes.playerPage}>
              <Button className="mx-2" color="warning">
                Cancel
              </Button>
            </Link>
          </FormGroup>
        </Form>
      </Container>
    );
  }
}

const mapStateToProps = (state: any, ownProps: any): StateProps => ({
  player: state.loaded.players.find((player: Player) => {
    if (ownProps.location.state.playerId) {
      return player.id === ownProps.location.state.playerId;
    }
  })
});

const mapDispatchToProps = (dispatch: Redux.Dispatch<Redux.AnyAction>) => {
  return {
    loadedActions: bindActionCreators(loadedActionCreators, dispatch)
  };
};

export default connect<StateProps, DispatchProps, Props>(
  mapStateToProps,
  mapDispatchToProps
)(PlayerForm);
