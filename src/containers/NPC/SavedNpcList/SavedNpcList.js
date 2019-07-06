import React, { Component } from 'react'
import { connect } from 'react-redux'
import { deleteNPC } from '../../../actions/savedActions'
import { ListGroup, Modal, Button } from 'reactstrap'
import SavedNpcListCard from './SavedNpcListCard/SavedNpcListCard'

class SavedNpcList extends Component {
   constructor(props) {
      super(props)
      this.state = {
         app: {
            deletingNpc: false,
            deleteId: '',
            npcName: '',
         },
         list: [...this.props.npcs],
      }
   }

   componentWillReceiveProps = newProps => {
      this.setState({
         list: [...newProps.npcs],
      })
   }
   submitNpcDelete = () => {
      this.props.deleteNPC(this.state.app.deleteId)
      this.toggleDeleteNpcModal()
   }

   toggleDeleteNpcModal = (id, name) => {
      this.setState({
         app: {
            ...this.state.app,
            deletingNpc: !this.state.app.deletingNpc,
            deleteId: id,
            npcName: name,
         },
      })
   }

   render() {
      return (
         <div className="mt-2">
            <ListGroup>
               {this.state.list.length > 0 ? (
                  this.state.list
                     .filter(
                        npc => npc.characterType === this.props.characterType
                     )
                     .map(npc => {
                        return (
                           <SavedNpcListCard
                              onDelete={this.toggleDeleteNpcModal}
                              {...this.props}
                              key={npc.id}
                              npc={npc}
                           />
                        )
                     })
               ) : (
                  <span className="font-weight-light p-3">
                     You don't have any NPCs of this type saved, make some!
                  </span>
               )}
            </ListGroup>
            <Modal
               centered={true}
               isOpen={this.state.app.deletingNpc}
               toggle={this.toggleDeleteNpcModal}>
               <div className="p-3">
                  <h4>Delete {this.state.app.npcName}? </h4>
                  <hr />
                  <span>
                     Upon deletion, the data for{' '}
                     <span className="font-weight-bold">
                        {this.state.app.npcName}
                     </span>{' '}
                     cannot be recovered.
                  </span>
                  <div className="d-flex justify-content-between mt-3">
                     <Button color="success" onClick={this.submitNpcDelete}>
                        Yes
                     </Button>
                     <Button color="danger" onClick={this.toggleDeleteNpcModal}>
                        No
                     </Button>
                  </div>
               </div>
            </Modal>
         </div>
      )
   }
}

const mapStateToProps = (state, ownProps) => {
   return {
      npcs: state.saved.npcs.filter(
         npc => npc.characterType === ownProps.characterType
      ),
   }
}

const mapDispatchToProps = dispatch => {
   return {
      deleteNPC: (id, type) => {
         dispatch(deleteNPC(id, type))
      },
   }
}

export default connect(
   mapStateToProps,
   mapDispatchToProps
)(SavedNpcList)
