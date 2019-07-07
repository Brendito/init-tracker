import React, { Component } from 'react'
import { connect } from 'react-redux'
import { createEncounter } from '../../actions/loadedActions'
import { Container, Button, Input, Label, Modal } from 'reactstrap'
import { v4 } from 'node-uuid'
import './styles.css'
import EncounterList from './EncounterList/EncounterList'

class EncounterContainer extends Component {
   constructor(props) {
      super(props)
      this.state = {
         encounterCreateModal: false,
      }
   }

   toggleCreateModal = () => {
      this.setState({ encounterCreateModal: !this.state.encounterCreateModal })
   }

   createEncounter = () => {
      const name = document.getElementById('encounterName').value
      let encounter = {
         name: name,
         id: v4(),
         list: [],
      }
      if (encounter.name !== null) {
         this.props.createEncounter(encounter)
         this.toggleCreateModal()
      } else {
         // Handle Error
         console.log('Error')
      }
   }

   render() {
      return (
         <Container fluid>
            <EncounterList />
            <Modal
               isOpen={this.state.encounterCreateModal}
               toggle={this.toggleCreateModal}>
               <div className="p-3">
                  <h4>Create New Encounter</h4>
                  <hr />
                  <Label className="font-weight-light" for="encounterName">
                     Encounter Name
                  </Label>
                  <Input className="mb-3" type="text" id="encounterName" />
                  <Button color="success" onClick={this.createEncounter}>
                     Save Encounter
                  </Button>
               </div>
            </Modal>
            <hr />
            <Button
               className="d-block my-2"
               color="primary"
               onClick={this.toggleCreateModal}>
               Create New Encounter
            </Button>
         </Container>
      )
   }
}

const mapDispatchToProps = dispatch => {
   return {
      createEncounter: encounter => {
         dispatch(createEncounter(encounter))
      },
   }
}

export default connect(
   null,
   mapDispatchToProps
)(EncounterContainer)
