import React from 'react'
import { Col, Button, Jumbotron } from 'reactstrap'
import SavedNpcList from '../../../components/SavedNpcList/SavedNpcList'
import * as charTypes from '../../../constants/characterTypes'

export default props => {
   return (
      <div>
         <Jumbotron>
            <h3>Saved NPC Manager</h3>
            <p className="font-weight-light">
               Manage your saved non player characters in your campaign.
            </p>
         </Jumbotron>
         <div className="d-flex justify-content-center">
            <Col sm="12" md="6">
               <div className="d-flex justify-content-between">
                  <h4 className="d-inline-block mt-2">Hostile NPCs</h4>
                  <Button
                     color="primary"
                     onClick={e => {
                        props.setCharacterType(charTypes.HOSTILE_NPC)
                        props.toggleAddModal()
                     }}>
                     New
                  </Button>
               </div>
               <hr />
               <SavedNpcList characterType={charTypes.HOSTILE_NPC} />
            </Col>
            <div className="border-left mx-2" />
            <Col sm="12" md="6">
               <div className="d-flex justify-content-between">
                  <h4 className="d-inline-block mt-2">Friendly NPCs</h4>
                  <Button
                     color="primary"
                     onClick={e => {
                        props.setCharacterType(charTypes.FRIENDLY_NPC)
                        props.toggleAddModal()
                     }}>
                     New
                  </Button>
               </div>
               <hr />
               <SavedNpcList characterType={charTypes.FRIENDLY_NPC} />
            </Col>
         </div>
      </div>
   )
}
