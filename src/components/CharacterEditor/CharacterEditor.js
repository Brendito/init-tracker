import React from "react";
import {
  Row,
  Container,
  Col,
  Button,
  Form,
  FormGroup,
  Label,
  Nav,
  NavItem,
  NavLink,
  TabContent,
  TabPane
} from "reactstrap";
import classnames from "classnames";
import * as types from "../../constants/formGroupTypes";
import {formGroupListener} from '../../utils/utils';
import Attributes from "../FormGroups/Attributes";

class CharacterEditor extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      ...props,
      activeTab: "1"
    };
    // this.formGroupListener = this.formGroupListener.bind(this);
    this.toggleTab = this.toggleTab.bind(this);
    this.onFormChange = this.onFormChange.bind(this)
  }

  // formGroupListener(name, value, type) {
  //   switch (type) {
  //     case types.ATTRIBUTES:
  //       this.setState({
  //         attributes: { ...this.state.attributes, [name]: value }
  //       });
  //       break;
  //     case types.STATS:
  //       this.setState({
  //         stats: { ...this.state.stats, [name]: value }
  //       });
  //       break;
  //     default:
  //       this.setState({ [name]: value });
  //   }
  // }

  onFormChange(name,value,type){
    const updated = formGroupListener(name,value,type,this.state);
    this.setState({ updated });
  }
  toggleTab(tab) {
    if (this.state.activeTab !== tab) {
      this.setState({
        activeTab: tab
      });
    }
  }

  render() {
    return (
      <div className="m-4">
        <Nav tabs>
          <NavItem>
            <NavLink
              className={classnames({ active: this.state.activeTab === "1" })}
              onClick={() => {
                this.toggleTab("1");
              }}
            >
              Combat
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              className={classnames({ active: this.state.activeTab === "2" })}
              onClick={() => {
                this.toggleTab("2");
              }}
            >
              Character Information
            </NavLink>
          </NavItem>
        </Nav>
        <TabContent activeTab={this.state.activeTab}>
          <TabPane tabId="1">
            <Row>
              <h3>{this.props.characterName}</h3>
              <h5>{this.props.playerName}</h5>
            </Row>
          </TabPane>
          <TabPane tabId="2">
            <Row>
              <Col sm="6">
                <Attributes {...this.props} listener={this.onFormChange} />
              </Col>
            </Row>
          </TabPane>
        </TabContent>
      </div>
    );
  }
}

export default CharacterEditor;
