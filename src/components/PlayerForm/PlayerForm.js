import React, { Component } from 'react'
import { connect } from 'react-redux'
import * as charTypes from "../../constants/characterTypes"
import { saveCharToCampaign } from '../../actions/campaignActions'
import { Form, FormGroup, Button, Row, Col } from 'reactstrap'
import {
   CharacterInformation,
   Stats,
   Attributes,
   CharacterClass,
} from '../FormGroups'
import { v4 } from 'node-uuid'

class PlayerForm extends Component {
   constructor(props) {
      super(props)
      this.state = {
         id: v4(),
         characterType: charTypes.PC,
         ...this.props.char,
      }
   }

   handleSubmit = e => {
      e.preventDefault()
      this.props.saveCharToCampaign(this.state)
      this.props.toggle();
   }

   handleKeyPress = e => {
      if (e.key === 'Enter') {
         this.handleSubmit(e)
      }
   }

   formGroupListener = (name, value) => {
      return this.setState({ ...this.state, [name]: value })
   }

   handleMessage = () => {
      return this.props.newChar
         ? 'Create New Player Character'
         : 'Edit ' + this.state.name
   }

   render() {
      return (
         <div>
            <Form
               id="charForm"
               onSubmit={this.handleSubmit}
               onKeyPress={this.handleKeyPress}>
               <h2>{this.handleMessage()}</h2>
               <Row>
                  <Col md="6">
                     <CharacterInformation
                        listener={this.formGroupListener}
                        characterType={this.state.characterType}
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
               <Row>
                  <Col md="12">
                     <Attributes
                        listener={this.formGroupListener}
                        {...this.state}
                     />
                  </Col>
               </Row>
               <FormGroup>
                  <Button className="mx-2" type="submit" color="primary">
                     Add
                  </Button>
                  <Button
                     className="mx-2"
                     onClick={this.props.toggle}
                     color="warning">
                     Cancel
                  </Button>
               </FormGroup>
            </Form>
         </div>
      )
   }
}

const mapDispatchToProps = dispatch => {
   return {
      saveCharToCampaign: char => dispatch(saveCharToCampaign(char)),
   }
}

export default connect(
   null,
   mapDispatchToProps
)(PlayerForm)
