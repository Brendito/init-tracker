import React, { Component } from "react";
import { connect } from "react-redux";
import * as contextTypes from "../../constants/contextTypes"
import CharacterList from "../CharacterList";

import CharacterListCard from "../CharacterList/CharacterListCard";
import { Col, Container, Row } from "reactstrap";

class EncounterBuilder extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <Container>
        <h1>EncounterBuilder</h1>
        <Row>
            <Col sm="4">
                <CharacterList context>

                </CharacterList>

            </Col>
        </Row>
      </Container>
    );
  }
}

const mapStateToProps = state => ({
  characters: state.loadedCampaign.characters
});

export default connect()(EncounterBuilder);
