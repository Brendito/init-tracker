import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import {
   Col,
   Card,
   CardBody,
   CardTitle,
   CardSubtitle,
   Button,
} from 'reactstrap'
import { deleteEncounter } from '../../../../actions/loadedActions'
import { loadEncounter } from '../../../../actions/trackerActions'
import { ENCOUNTER_BUILDER, TRACKER } from '../../../../constants/routes'
import { slugify } from '../../../../utils/utils'

class EncounterListCard extends Component {
   deleteEncounter = () => {
      this.props.deleteEncounter(this.props.encounter.id)
   }

   runEncounter = () => {
      this.props.loadEncounter(this.props.encounter)
   }

   render() {
      return (
         <Col md="4" className="my-2">
            <Card>
               <CardBody>
                  <CardTitle className="font-weight-bolder">
                     {this.props.encounter.name}
                  </CardTitle>
                  <hr />
                  {this.props.encounter.totalExp !== undefined && (
                     <CardSubtitle>
                        Total Exp -{' '}
                        <span className="font-weight-light">
                           {this.props.encounter.totalExp}
                        </span>
                     </CardSubtitle>
                  )}
                  <div className="my-3">
                     {this.props.encounter.list.length > 0 ? (
                        <div>
                           <CardSubtitle>NPCs:</CardSubtitle>
                           <ul>
                              <div className="d-flex flex-column flex-wrap npclist">
                                 {this.props.encounter.list.map((npc, i) => {
                                    return (
                                       <li
                                          className="font-weight-light"
                                          key={i}>
                                          {npc.name}
                                       </li>
                                    )
                                 })}
                              </div>
                           </ul>
                        </div>
                     ) : (
                        'This encounter does not have any NPCs added yet.'
                     )}
                  </div>

                  <hr />
                  <div className="d-flex justify-content-between">
                     {/* LINK TO BUILDER */}
                     <Link
                        to={{
                           pathname: `${ENCOUNTER_BUILDER}${slugify(
                              this.props.encounter.name
                           )}`,
                           state: {
                              encounterId: this.props.encounter.id,
                           },
                        }}>
                        <Button color="primary" onClick={this.editEncounter}>
                           Edit
                        </Button>
                     </Link>
                     <Link to={TRACKER}>
                        <Button color="success" onClick={this.runEncounter} />
                     </Link>
                     {/* SEND DELETE ACTION */}
                     <Button color="danger" onClick={this.deleteEncounter}>
                        Delete
                     </Button>
                  </div>
               </CardBody>
            </Card>
         </Col>
      )
   }
}

const mapDispatchToProps = dispatch => {
   return {
      deleteEncounter: id => {
         dispatch(deleteEncounter(id))
      },
      loadEncounter: encounter => {
         dispatch(loadEncounter(encounter))
      },
   }
}

export default connect(
   null,
   mapDispatchToProps
)(EncounterListCard)
