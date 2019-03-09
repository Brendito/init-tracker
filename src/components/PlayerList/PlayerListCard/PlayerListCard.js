import React, { Component } from 'react'
import { connect } from 'react-redux'
import { deleteChar } from '../../../actions/campaignActions'
import * as charTypes from '../../../constants/characterTypes'
import { handleCharacterIcon } from '../../../utils/characterIconUtil'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { ListGroupItem, Modal, Button } from 'reactstrap'

class PlayerListCard extends Component {
   constructor(props) {
      super(props)
      this.state = {
         deletingNpc: false,
      }
   }
   handleDelete = () => {
      this.props.deleteChar(this.props.id, charTypes.PC)
   }

   toggleDeleteModal = () => {
      this.setState({ deletingNpc: !this.state.deletingNpc })
   }

   render() {
      return (
         <ListGroupItem key={this.props.id} onClick={this.toggleEditor}>
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
                  onClick={this.handleEdit}
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
                  <Button color="success" onClick={this.handleDelete}>
                     Yes
                  </Button>
                  <Button color="danger" onClick={this.toggleDeleteModal}>
                     No
                  </Button>
               </div>
            </Modal>
         </ListGroupItem>
      )
   }
}

const mapDispatchToProps = dispatch => {
   return {
      deleteChar: (id, type) => {
         dispatch(deleteChar(id, type))
      },
   }
}

export default connect(
   null,
   mapDispatchToProps
)(PlayerListCard)
