import classnames from "classnames";
import React, { Component } from "react";
import {
  Button,
  Col,
  Nav,
  NavItem,
  NavLink,
  Row,
  TabContent,
  TabPane
} from "reactstrap";

import characterTypes from "../../../constants/characterTypes";
import SavedNpcList from "../SavedNpcList";

interface Props {
  setCharacterType: (type: string) => void;
  toggleAddModal: () => void;
}

export default class NpcMobileLanding extends Component<Props> {
  state = {
    app: {
      activeTab: "1"
    }
  };

  toggleTab = (e: React.ChangeEvent<any>) => {
    const tab = e.target.dataset.tab;
    if (this.state.app.activeTab !== tab) {
      this.setState({
        app: { ...this.state.app, activeTab: tab }
      });
    }
  };
  handleAdd = (e: React.ChangeEvent<any>) => {
    const type = e.target.dataset.type;
    this.props.setCharacterType(type);
    this.props.toggleAddModal();
  };
  render() {
    return (
      <div>
        <h2>NPC Manager</h2>
        <p className="font-weight-light">
          Manage your saved non player characters.
        </p>
        <Nav tabs>
          <NavItem>
            <NavLink
              className={classnames({
                active: this.state.app.activeTab === "1"
              })}
              data-tab="1"
              onClick={this.toggleTab}
            >
              Hostile NPCs
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              className={classnames({
                active: this.state.app.activeTab === "2"
              })}
              data-tab="2"
              onClick={this.toggleTab}
            >
              Friendly NPCs
            </NavLink>
          </NavItem>
        </Nav>
        <TabContent activeTab={this.state.app.activeTab}>
          <TabPane tabId="1">
            <Row>
              <Col sm="12">
                <SavedNpcList characterType={characterTypes.HOSTILE_NPC} />
                <hr />
                <Button
                  data-type={characterTypes.HOSTILE_NPC}
                  onClick={this.handleAdd}
                  color="primary"
                >
                  Add Hostile NPC
                </Button>
              </Col>
            </Row>
          </TabPane>
          <TabPane tabId="2">
            <Row>
              <Col sm="12">
                <SavedNpcList characterType={characterTypes.FRIENDLY_NPC} />
                <hr />
                <Button
                  data-type={characterTypes.FRIENDLY_NPC}
                  onClick={this.handleAdd}
                  color="primary"
                >
                  Add Friendly NPC
                </Button>
              </Col>
            </Row>
          </TabPane>
        </TabContent>
      </div>
    );
  }
}
