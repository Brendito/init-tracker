import React, { Component } from 'react'
import * as charTypes from '../../../constants/characterTypes'
import { handleCharacterIcon } from '../../../utils/characterIconUtil'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { ListGroupItem, Modal, Button } from 'reactstrap'
import './style.css'

class PlayerListCard extends Component {
   constructor(props) {
      super(props)
      this.state = {
         deletingNpc: false,
      }
   }
   handleDelete = () => {
      this.props.handleDelete(this.props.id, charTypes.PC)
   }

   handleLoad = () => {
      this.props.loadPlayer(this.props.id)
   }

   toggleDeleteModal = () => {
      this.setState({ deletingNpc: !this.state.deletingNpc })
   }

   render() {
      return (
         <ListGroupItem
            className="my-1"
            key={this.props.id}
            onClick={this.toggleEditor}>
            <div className="d-flex">
               <div className="characterIcon mr-2">
                  {handleCharacterIcon(this.props.characterClass)}
               </div>
               <div>
                  <div className="d-flex flex-column justify-content-between">
                     <div>
                        <h5> {this.props.name} </h5>
                        <h6> {this.props.playerName} </h6>
                     </div>
                     <div>
                        <span>
                           {this.props.characterLevel &&
                              'Level ' + this.props.characterLevel}{' '}
                           {this.props.characterRace &&
                              this.props.characterRace}{' '}
                           {this.props.characterClass &&
                              this.props.characterClass}
                        </span>
                     </div>
                  </div>
               </div>
            </div>
            <div className="d-flex justify-content-end">
               <FontAwesomeIcon
                  icon="edit"
                  className="m-1"
                  onClick={this.handleLoad}
               />
               <FontAwesomeIcon
                  icon="times"
                  className="m-1"
                  onClick={this.toggleDeleteModal}
               />
            </div>
            <Modal
               isOpen={this.state.deletingNpc}
               toggle={this.toggleDeleteModal}>
               <div className="p-3">
                  <h3>Permanently Delete {this.props.name}? </h3>
                  <p className="font-weight-light">
                     You will not be able to recover the data for{' '}
                     {this.props.name} once deleted.
                  </p>
                  <div className="mt-2">
                     <Button color="success" onClick={this.handleDelete}>
                        Yes
                     </Button>
                     <Button
                        className="ml-2"
                        color="danger"
                        onClick={this.toggleDeleteModal}>
                        No
                     </Button>
                  </div>
               </div>
            </Modal>
         </ListGroupItem>
      )
   }
}

export default PlayerListCard
