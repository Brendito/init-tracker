import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { PLAYER_PAGE } from '../../constants/routes'
import * as charTypes from '../../constants/characterTypes'
import { savePlayer } from '../../actions/loadedActions'
import { Form, FormGroup, Button, Row, Col, Container } from 'reactstrap'
import {
   CharacterInformation,
   Stats,
   Attributes,
   CharacterClass,
} from '../FormGroups'

class PlayerForm extends Component {
   constructor(props) {
      super(props)
      this.state = {
         characterType: charTypes.PC,
         ...this.props.player,
      }
   }

   // Submit redux action to save player to campaign, replacing players via ID
   handleSubmit = e => {
      if (this.state.name) {
         this.props.savePlayer(this.state)
      } else {
         // TODO: Error state
         console.log('No name')
      }
   }

   // Listen to changes made in formGroups and update state
   formGroupListener = (name, value) => {
      this.setState({ ...this.state, [name]: value })
   }

   // Detect if editing a player or creating a new player and adjust messaging
   handleMessage = () => {
      return this.state.name === undefined
         ? 'Create New Player Character'
         : this.state.name
   }

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
                     <Attributes
                        listener={this.formGroupListener}
                        {...this.state}
                     />
                  </Col>
               </Row>
               <FormGroup>
                  <Link to={PLAYER_PAGE}>
                     <Button
                        type="submit"
                        onClick={this.handleSubmit}
                        color="primary">
                        {this.props.player === undefined
                           ? 'Add Player'
                           : 'Save'}
                     </Button>
                  </Link>
                  <Link to={PLAYER_PAGE}>
                     <Button className="mx-2" color="warning">
                        Cancel
                     </Button>
                  </Link>
               </FormGroup>
            </Form>
         </Container>
      )
   }
}

const mapStateToProps = (state, ownProps) => ({
   player: state.loaded.players.find(player => {
      if (ownProps.location.state.playerId) {
         return player.id === ownProps.location.state.playerId
      } else {
         return null
      }
   }),
})

const mapDispatchToProps = dispatch => {
   return {
      savePlayer: player => dispatch(savePlayer(player)),
   }
}

export default connect(
   mapStateToProps,
   mapDispatchToProps
)(PlayerForm)
