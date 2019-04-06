import React, { Component } from 'react'
import { Row, Col, Button, Modal, Card, CardBody, Input } from 'reactstrap'
import { connect } from 'react-redux'
import { saveEncounter, saveCampaign } from '../../actions/campaignActions'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import AddFromSavedNPCs from './AddFromSavedNPCs/AddFromSavedNPCs'
import './styles.css'

class EncounterBuilder extends Component {
   constructor(props) {
      super(props)
      this.state = {
         encounter: {
            ...this.props.encounter,
         },
         campaign: {
            ...this.props.campaign,
         },
         app: {
            savedAdd: false,
            templateAdd: false,
            editingEncounterName: false,
            newEncounterName: '',
         },
      }
   }

   toggleSavedModal = () => {
      this.setState({
         app: { ...this.state.app, savedAdd: !this.state.app.savedAdd },
      })
   }

   toggleTemplateModal = () => {
      this.setState({
         app: { ...this.state.app, templateAdd: !this.state.app.templateAdd },
      })
   }

   editEncounterName = () => {
      this.setState({
         app: {
            ...this.state.app,
            editingEncounterName: !this.state.app.editingEncounterName,
         },
      })
   }

   handleEncounterName = e => {
      this.setState({
         app: {
            ...this.state.app,
            newEncounterName: e.target.value,
         },
      })
   }

   submitEncounterName = () => {
      const name = this.state.app.newEncounterName
      this.setState({
         encounter: {
            ...this.state.encounter,
            name: name,
         },
      })
      this.editEncounterName()
   }

   handleAddToEncounter = list => {
      const newList = [...list]
      this.setState({
         encounter: { ...this.state.encounter, list: [...newList] },
      })
   }

   deleteFromEncounter = e => {
      let id =
         e.target.dataset.listid !== undefined
            ? e.target.dataset.listid
            : e.target.parentNode.dataset.listid
      this.setState({
         encounter: {
            ...this.state.encounter,
            list: this.state.encounter.list.filter(
               npc => npc.listId !== Number(id)
            ),
         },
      })
   }

   saveEncounter = () => {
      let exp = this.encounterExp(this.state.encounter.list)
      const encounter = { ...this.state.encounter, totalExp: exp }
      let savedEncounters = this.state.campaign.encounters.filter(encounter => {
         return encounter.id !== this.props.encounterId
      })
      this.setState(
         {
            campaign: {
               ...this.state.campaign,
               encounters: [encounter, ...savedEncounters],
            },
            app: { savedAdd: false, templateAdd: false },
         },
         () => {
            this.props.saveCampaign(this.state.campaign)
            this.props.unloadEncounter()
         }
      )
   }

   encounterExp = arr => {
      let experienceTotal = 0
      arr.forEach(npc => {
         return (experienceTotal += npc.xp)
      })
      return experienceTotal
   }

   render() {
      return (
         <div>
            <p className="font-weight-light mb-1">Editing Encounter:</p>

            {!this.state.app.editingEncounterName ? (
               <div className="d-flex justify-content-between">
                  <h5 className="font-weight-bold mb-2">
                     {this.state.encounter.name}
                  </h5>
                  <FontAwesomeIcon
                     icon="edit"
                     className="mt-1"
                     onClick={this.editEncounterName}
                  />
               </div>
            ) : (
               <div className="mb-2">
                  <Input
                     className="mb-2"
                     onChange={this.handleEncounterName}
                     placeholder={this.props.encounter.name}
                     onKeyPress={e => {
                        if (e.key === 'Enter') {
                           this.submitEncounterName()
                        }
                     }}
                  />
                  <Button
                     onClick={this.submitEncounterName}
                     className="mr-2"
                     color="success">
                     Save
                  </Button>
                  <Button onClick={this.editEncounterName} color="warning">
                     Cancel
                  </Button>
               </div>
            )}
            <hr className="mt-1 mb-3" />
            <div className="buttonbar">
               <span className="font-weight-light d-block">
                  Add an NPC to the encounter:
               </span>
               <div className="d-flex justify-content-between my-2">
                  <Button color="primary" onClick={this.toggleSavedModal}>
                     Saved NPCs
                  </Button>
                  <Button color="primary" onClick={this.toggleTemplateModal}>
                     Template NPCs
                  </Button>
               </div>
            </div>

            {this.state.encounter.list &&
            this.state.encounter.list.length > 0 ? (
               <div className="mb-2">
                  <div className="my-3">
                     <span className="font-weight-bold">
                        Total Encounter Experience
                     </span>
                     : {this.encounterExp(this.state.encounter.list)} xp
                  </div>
                  <hr />
                  <Row>
                     {this.state.encounter.list.map(npc => {
                        return (
                           <Col
                              key={npc.listId}
                              sm="12"
                              md="4"
                              className="my-2">
                              <Card>
                                 <CardBody>
                                    <div className="d-flex align-items-center justify-content-between">
                                       <div className="d-flex justify-content-between">
                                          <div>
                                             <p className="font-weight-bold mb-1">
                                                {npc.name}
                                             </p>
                                             <div>
                                                <span className="d-block mb-1">
                                                   {npc.size} {npc.type}
                                                </span>
                                                <span>
                                                   {npc.challenge_rating} CR - (
                                                   {npc.xp} xp)
                                                </span>
                                             </div>
                                          </div>
                                       </div>
                                       <FontAwesomeIcon
                                          icon="times"
                                          className="mt-1"
                                          data-listid={npc.listId}
                                          onClick={this.deleteFromEncounter}
                                       />
                                    </div>
                                 </CardBody>
                              </Card>
                           </Col>
                        )
                     })}
                  </Row>
               </div>
            ) : (
               "This encounter doesn't have any NPCs added yet, add some from your saved NPCs or the templates."
            )}
            <hr />
            <div className="d-flex justify-content-start">
               <Button
                  color="success"
                  className="mr-2"
                  onClick={this.saveEncounter}>
                  Save
               </Button>
               <Button color="warning" onClick={this.props.unloadEncounter}>
                  Cancel
               </Button>
            </div>

            <Modal
               isOpen={this.state.app.savedAdd}
               toggle={this.toggleSavedModal}>
               <AddFromSavedNPCs
                  list={this.state.encounter.list}
                  addToEncounter={this.handleAddToEncounter}
                  toggle={this.toggleSavedModal}
                  npcs={this.props.npcs}
               />
            </Modal>
            <Modal
               isOpen={this.state.app.templateAdd}
               toggle={this.toggleTemplateModal}>
               <h2>NPC LIST GOES HERE ONCE REFACTORED</h2>
            </Modal>
         </div>
      )
   }
}

const mapStateToProps = (state, ownProps) => ({
   encounter: state.campaign.loadedCampaign.encounters.find(
      encounter => encounter.id === ownProps.encounterId
   ),
   campaign: state.campaign.loadedCampaign,
})

const mapDispatchToProps = dispatch => {
   return {
      saveEncounter: encounter => {
         dispatch(saveEncounter(encounter))
      },
      saveCampaign: campaign => {
         dispatch(saveCampaign(campaign))
      },
   }
}

export default connect(
   mapStateToProps,
   mapDispatchToProps
)(EncounterBuilder)
