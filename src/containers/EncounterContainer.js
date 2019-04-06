import React, { Component } from 'react'
import { connect } from 'react-redux'
import {
   createEncounter,
   deleteEncounter,
   saveCampaign,
} from '../actions/campaignActions'
import {
   Container,
   Row,
   Col,
   Card,
   CardBody,
   CardTitle,
   CardSubtitle,
   Button,
   Input,
   Label,
   Modal,
} from 'reactstrap'
import { v4 } from 'node-uuid'
import EncounterBuilder from '../components/EncounterBuilder/EncounterBuilder'

class EncounterContainer extends Component {
   constructor(props) {
      super(props)
      this.state = {
         loadedEncounter: {},
         campaign: {
            ...this.props.campaign,
         },
         encounters: [...this.props.encounters],
      }
   }

   componentWillReceiveProps = newProps => {
      this.setState({
         campaign: {
            ...newProps.campaign,
         },
         encounters: [...newProps.encounters],
      })
   }

   editEncounter = e => {
      const encounterId = e.target.dataset.id
      let encounter = this.props.encounters.filter(
         encounter => encounter.id === encounterId
      )[0]
      this.setState({ loadedEncounter: { ...encounter } })
      this.props.toggleJumbo()
   }

   unloadEncounter = () => {
      this.setState({ loadedEncounter: {} })
      this.props.toggleJumbo()
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
      this.props.createEncounter(encounter)
      this.toggleCreateModal()
   }

   deleteEncounter = e => {
      const encounterId = e.target.dataset.id
      this.props.deleteEncounter(encounterId)
   }

   render() {
      return (
         <Container fluid>
            {!this.state.loadedEncounter.id && (
               <div className="my-2">
                  <h3>List of Encounters</h3>
                  <hr />
                  {this.state.encounters.length > 0 ? (
                     <Row>
                        {this.state.encounters.map(encounter => {
                           return (
                              <Col key={encounter.id} md="4" className="my-2">
                                 <Card>
                                    <CardBody>
                                       <CardTitle>{encounter.name}</CardTitle>
                                       {encounter.totalExp !== undefined && (
                                          <CardSubtitle>
                                             Total Exp -{' '}
                                             <span className="font-weight-light">
                                                {encounter.totalExp}
                                             </span>
                                          </CardSubtitle>
                                       )}
                                       <div className="my-2">
                                          <CardSubtitle>NPCs:</CardSubtitle>
                                          <ul>
                                             {encounter.list.map((npc, i) => {
                                                return (
                                                   <li
                                                      className="font-weight-light"
                                                      key={i}>
                                                      {npc.name}
                                                   </li>
                                                )
                                             })}
                                          </ul>
                                       </div>
                                       <div className="d-flex justify-content-between">
                                          <Button
                                             data-id={encounter.id}
                                             onClick={this.editEncounter}>
                                             Edit
                                          </Button>
                                          <Button
                                             data-id={encounter.id}
                                             onClick={this.deleteEncounter}>
                                             Delete
                                          </Button>
                                          <Button>Run</Button>
                                       </div>
                                    </CardBody>
                                 </Card>
                              </Col>
                           )
                        })}
                     </Row>
                  ) : (
                     "You haven't made any encounters yet, make one!"
                  )}

                  <Modal
                     isOpen={this.state.encounterCreateModal}
                     toggle={this.toggleCreateModal}>
                     <div className="p-3">
                        <h4>Create New Encounter</h4>
                        <hr />
                        <Label
                           className="font-weight-light"
                           for="encounterName">
                           Encounter Name
                        </Label>
                        <Input
                           className="mb-3"
                           type="text"
                           onKeyPress={e => {
                              if (e.key === 'Enter') {
                                 this.createEncounter()
                              }
                           }}
                           id="encounterName"
                        />
                        <Button
                           color="success"
                           onClick={this.createEncounter}>
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
               </div>
            )}

            {this.state.loadedEncounter.id && (
               <EncounterBuilder
                  encounterId={this.state.loadedEncounter.id}
                  unloadEncounter={this.unloadEncounter}
               />
            )}
         </Container>
      )
   }
}

const mapStateToProps = state => ({
   encounters: state.campaign.loadedCampaign.encounters,
   campaign: state.campaign.loadedCampaign,
})

const mapDispatchToProps = dispatch => {
   return {
      createEncounter: encounter => {
         dispatch(createEncounter(encounter))
      },
      deleteEncounter: id => {
         dispatch(deleteEncounter(id))
      },
      saveCampaign: campaign => {
         dispatch(saveCampaign(campaign))
      },
   }
}

export default connect(
   mapStateToProps,
   mapDispatchToProps
)(EncounterContainer)
