import React, { Component } from 'react'
import { connect } from 'react-redux'
import { compose } from 'redux'
import {saveNPC} from "../../actions/savedActions"
import { v4 } from 'node-uuid'
import { Container, Col, Row } from 'reactstrap'
import NpcForm from '../../components/NpcForm/NpcForm'
import StatBlock from '../../components/StatBlock/StatBlock'
import { mapSizesToProps } from '../../hoc/screenSizes'
import withSizes from 'react-sizes'

class NpcFormContainer extends Component {
   constructor(props) {
      super(props)
      this.state = {
         npc: { ...this.props.npc, ...this.props.location.state.npc },
      }
   }

   componentWillReceiveProps(nextProps) {
      const npc = nextProps.npc ? nextProps.npc : nextProps.location.state.npc
      this.setState({
         npc: { ...npc },
         characterType: nextProps.characterType,
      })
   }

   handleFormChange = (name, value) => {
      this.setState({
         ...this.state,
         npc: { ...this.state.npc, [name]: value },
      })
   }

   handleSubmit = () => {
      let npc
      if (this.props.location.state.editing) {
         npc = { ...this.state.npc, dataType: 'Custom' }
      } else {
         npc = { ...this.state.npc, dataType: 'Custom', id: v4() }
      }
      this.props.saveNPC(npc)
   }

   handleSpecialFormChange = (obj, type) => {
      switch (type) {
         case 'ability':
            let npcAbilities = this.state.npc.special_abilities.filter(
               ability => ability.name !== obj.name
            )
            return this.setState({
               npc: {
                  ...this.state.npc,
                  special_abilities: [obj, ...npcAbilities],
               },
            })
         case 'action':
            let npcActions = this.state.npc.actions.filter(
               action => action.name !== obj.name
            )
            return this.setState({
               npc: {
                  ...this.state.npc,
                  actions: [obj, ...npcActions],
               },
            })
         default:
            return console.log('Error')
      }
   }
   handleFormDelete = (key, type) => {
      const prevState = { ...this.state.npc }
      switch (type) {
         case 'ability':
            let updatedAbilities = prevState.special_abilities.filter(
               ability => {
                  return ability.name !== key.name
               }
            )
            return this.setState({
               npc: {
                  ...prevState,
                  special_abilities: [...updatedAbilities],
               },
            })
         case 'action':
            let updatedActions = prevState.actions.filter(action => {
               return action.name !== key
            })
            return this.setState({
               npc: {
                  ...prevState,
                  actions: [...updatedActions],
               },
            })
         default:
            delete prevState[key]

            return this.setState({
               npc: {
                  ...prevState,
               },
            })
      }
   }

   render() {
      return (
         <Container fluid>
            <Row>
               <Col md={this.props.isDesktop ? '6' : '12'}>
                  <NpcForm
                     onFormChange={this.handleFormChange}
                     onSpecialFormChange={this.handleSpecialFormChange}
                     handleSubmit={this.handleSubmit}
                     onFormDelete={this.handleFormDelete}
                     npc={{ ...this.state.npc }}
                  />
               </Col>
               {this.props.isDesktop && (
                  <Col lg="6">
                     <StatBlock npc={{ ...this.state.npc }} />
                  </Col>
               )}
            </Row>
         </Container>
      )
   }
}

const mapDispatchToProps = dispatch => {
   return {
      saveNPC: char => {
         dispatch(saveNPC(char))
      },
   }
}

export default compose(
   connect(
      null,
      mapDispatchToProps
   ),
   withSizes(mapSizesToProps)
)(NpcFormContainer)
