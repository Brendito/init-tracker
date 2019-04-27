import React, { Component } from 'react'
import classnames from 'classnames'
import {
   Row,
   Col,
   Nav,
   NavItem,
   NavLink,
   TabContent,
   TabPane,
   Button,
} from 'reactstrap'
import SavedNpcList from '../../../components/SavedNpcList/SavedNpcList'
import * as charTypes from '../../../constants/characterTypes'

export default class NpcMobileLanding extends Component {
   constructor(props) {
      super(props)

      this.state = {
         app: {
            activeTab: '1',
         },
      }
   }

   toggleTab = e => {
      const tab = e.target.dataset.tab
      if (this.state.app.activeTab !== tab) {
         this.setState({
            app: { ...this.state.app, activeTab: tab },
         })
      }
   }
   handleAdd = e => {
      const type = e.target.dataset.type
      this.props.setCharacterType(type)
      this.props.toggleAddModal()
   }
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
                        active: this.state.app.activeTab === '1',
                     })}
                     data-tab="1"
                     onClick={this.toggleTab}>
                     Hostile NPCs
                  </NavLink>
               </NavItem>
               <NavItem>
                  <NavLink
                     className={classnames({
                        active: this.state.app.activeTab === '2',
                     })}
                     data-tab="2"
                     onClick={this.toggleTab}>
                     Friendly NPCs
                  </NavLink>
               </NavItem>
            </Nav>
            <TabContent activeTab={this.state.app.activeTab}>
               <TabPane tabId="1">
                  <Row>
                     <Col sm="12">
                        <SavedNpcList characterType={charTypes.HOSTILE_NPC} />
                        <hr />
                        <Button
                           data-type={charTypes.HOSTILE_NPC}
                           onClick={this.handleAdd}
                           color="primary">
                           Add Hostile NPC
                        </Button>
                     </Col>
                  </Row>
               </TabPane>
               <TabPane tabId="2">
                  <Row>
                     <Col sm="12">
                        <SavedNpcList characterType={charTypes.FRIENDLY_NPC} />
                        <hr />
                        <Button
                           data-type={charTypes.FRIENDLY_NPC}
                           onClick={this.handleAdd}
                           color="primary">
                           Add Friendly NPC
                        </Button>
                     </Col>
                  </Row>
               </TabPane>
            </TabContent>
         </div>
      )
   }
}
