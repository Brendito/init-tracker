import React from 'react'
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
   TabPane,
} from 'reactstrap'
import classnames from 'classnames'
import { connect } from 'react-redux'
import * as types from '../../../../../constants/formGroupTypes'
import Attributes from '../../../../../components/FormGroups/Attributes'
import CharacterInformation from '../../../../../components/FormGroups/CharacterInformation'
import HealthController from '../../../../../components/FormGroups/HealthController'

class CharacterEditor extends React.Component {
   constructor(props) {
      super(props)
      this.state = {
         char: props,
         activeTab: '1',
      }
      this.formGroupListener = this.formGroupListener.bind(this)
      this.toggleTab = this.toggleTab.bind(this)
      this.submitEdit = this.submitEdit.bind(this)
   }

   // TODO: Extract this to util so it can be reused easily, difficulties with passing an object back without knowing the object structure
   formGroupListener(name, value, type) {
      switch (type) {
         case types.ATTRIBUTES:
            this.setState({
               char: {
                  ...this.state.char,
                  attributes: { ...this.state.char.attributes, [name]: value },
               },
            })
            break
         case types.STATS:
            this.setState({
               char: {
                  ...this.state.char,
                  stats: { ...this.state.char.stats, [name]: value },
               },
            })
            break
         case 'current_hit_points':
            this.setState({
               char: {
                  ...this.state.char,
                  tracker: {
                     ...this.state.char.tracker,
                     current_hit_points: value,
                  },
               },
            })
            break
         default:
            this.setState({ char: { ...this.state.char, [name]: value } })
      }
   }

   submitEdit() {
      this.props.editCharacter(this.state.char)
      this.props.closeModal()
   }

   toggleTab(tab) {
      if (this.state.activeTab !== tab) {
         this.setState({
            activeTab: tab,
         })
      }
   }

   render() {
      return (
         <div className="m-4">
            <Nav tabs>
               <NavItem>
                  <NavLink
                     className={classnames({
                        active: this.state.activeTab === '1',
                     })}
                     onClick={() => {
                        this.toggleTab('1')
                     }}>
                     Combat
                  </NavLink>
               </NavItem>
               <NavItem>
                  <NavLink
                     className={classnames({
                        active: this.state.activeTab === '2',
                     })}
                     onClick={() => {
                        this.toggleTab('2')
                     }}>
                     Character Information
                  </NavLink>
               </NavItem>
            </Nav>
            <TabContent activeTab={this.state.activeTab}>
               <TabPane tabId="1">
                  <Row>
                     <Col sm="12">
                        <CharacterInformation
                           listener={this.formGroupListener}
                        />
                        <HealthController
                           listener={this.formGroupListener}
                           {...this.state.char}
                        />
                     </Col>
                  </Row>
               </TabPane>
               <TabPane tabId="2">
                  <Row>
                     <Col sm="6">
                        <Attributes
                           {...this.props}
                           listener={this.formGroupListener}
                        />
                     </Col>
                  </Row>
               </TabPane>
            </TabContent>
            <Button color="primary" onClick={this.submitEdit} />
         </div>
      )
   }
}

export default connect(null)(CharacterEditor)
