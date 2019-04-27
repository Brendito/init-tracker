import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Container, Modal, Button } from 'reactstrap'
import { mapSizesToProps } from '../../hoc/screenSizes'
import withSizes from 'react-sizes'
import { blankNpc } from '../../constants/npcInformation'
import * as routes from '../../constants/routes'
import NpcMobileLanding from './NpcMobileLanding/NpcMobileLanding'
import NpcLargeLanding from './NpcLargeLanding/NpcLargeLanding'

class NpcContainer extends Component {
   constructor(props) {
      super(props)
      this.state = {
         characterType: '',
         addModal: false,
      }
   }

   setCharacterType = type => {
      this.setState({
         characterType: type,
      })
   }

   toggleAddModal = () => {
      this.setState({
         addModal: !this.state.addModal,
      })
   }

   render() {
      return (
         <Container fluid>
            {this.props.isMobile && (
               <NpcMobileLanding
                  setCharacterType={this.setCharacterType}
                  toggleAddModal={this.toggleAddModal}
               />
            )}
            {!this.props.isMobile && (
               <NpcLargeLanding
                  setCharacterType={this.setCharacterType}
                  toggleAddModal={this.toggleAddModal}
               />
            )}
            <Modal
               isOpen={this.state.addModal}
               centered={true}
               toggle={this.toggleAddModal}>
               <div className="p-3">
                  <h4>Add New NPC</h4>
                  <hr />
                  <p className="font-weight-light mb-4">
                     You can create and modify a copy of an NPC included in the
                     SRD or start one from scratch.
                  </p>
                  <div className="d-flex justify-content-between">
                     <Link
                        to={{
                           pathname: routes.NPC_TEMPLATE_LIST,
                           state: {
                              characterType: this.state.characterType,
                           },
                        }}>
                        <Button color="primary">Copy a Template</Button>
                     </Link>
                     <Link
                        to={{
                           pathname: routes.NPC_FORM,
                           state: {
                              npc: {
                                 ...blankNpc,
                                 characterType: this.state.characterType,
                              },
                           },
                        }}>
                        <Button color="primary">Create from Scratch</Button>
                     </Link>
                  </div>
               </div>
            </Modal>
         </Container>
      )
   }
}

export default withSizes(mapSizesToProps)(NpcContainer)
