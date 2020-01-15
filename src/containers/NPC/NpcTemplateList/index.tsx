import React, { Component } from "react";
import withSizes from "react-sizes";
import { Col, Container, Row } from "reactstrap";

import StatBlock from "../../../components/StatBlock";
import { mapSizesToProps } from "../../../hoc/screenSizes";
import NpcList from "./NpcList";
import { Npc } from "../../../models";
import { initialStates } from "../../../constants/initialStates";

interface Props {
  npc: Npc;
  isDesktop?: boolean;
}

class NpcTemplateList extends Component<Props> {
  state = {
    npc: { ...initialStates.npc }
  };

  handleView = (data: Npc) => {
    this.setState({
      npc: data
    });
  };

  render() {
    return (
      <Container fluid>
        <Row>
          <Col md={this.props.isDesktop ? "5" : "12"}>
            <h4>Copy NPC Template</h4>
            <hr />
            <NpcList viewListener={this.handleView} {...this.props} />
          </Col>
          {this.props.isDesktop && (
            <Col md="7">
              {this.state.npc.id !== undefined && (
                <StatBlock npc={this.state.npc} modal={false} />
              )}
            </Col>
          )}
        </Row>
      </Container>
    );
  }
}

export default withSizes<{}, Props>(mapSizesToProps)(NpcTemplateList);
