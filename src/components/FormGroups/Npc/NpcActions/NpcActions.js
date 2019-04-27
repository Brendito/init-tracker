import React, { Component } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { ListGroup, Modal } from 'reactstrap'
import NpcAction from './NpcAction'
import NpcActionModal from './NpcActionModal'

class NpcActions extends Component {
   constructor(props) {
      super(props)
      this.state = {
         actions: this.props.actions,
         app: {
            actionAdd: false,
            action: {},
         },
      }
   }

   toggleModal = () => {
      this.setState({
         app: {
            actionAdd: !this.state.app.actionAdd,
         },
      })
   }

   componentWillReceiveProps = nextProps => {
      if (nextProps.actions) {
         this.setState({
            actions: [...nextProps.actions],
         })
      }
   }

   handleSubmit = action => {
      this.toggleModal()
      if (action.name !== '') {
         return this.props.listener(action, 'action')
      } else {
         console.log('Error on special ability')
      }
   }

   handleLoadModal = action => {
      this.setState({
         app: {
            actionAdd: !this.state.actionAdd,
            action: { ...action },
         },
      })
   }

   render() {
      return (
         <div className="my-4">
            <div className="d-flex justify-content-between">
               <h5>Actions</h5>
               <span onClick={this.toggleModal} className="font-weight-light">
                  Add New Action
                  <FontAwesomeIcon icon="plus" className="ml-2" size="1x" />
               </span>
            </div>
            <hr className="mt-1" />
            <ListGroup>
               {this.state.actions.length > 0 &&
                  this.state.actions.map((action, i) => {
                     return (
                        <NpcAction
                           key={i}
                           action={action}
                           onLoadModal={this.handleLoadModal}
                           onDelete={this.props.onDelete}
                        />
                     )
                  })}
            </ListGroup>
            <Modal isOpen={this.state.app.actionAdd} toggle={this.toggleModal}>
               <NpcActionModal
                  handleLoadModal={this.handleLoadModal}
                  handleSubmit={this.handleSubmit}
                  toggleModal={this.toggleModal}
                  action={this.state.app.action}
               />
            </Modal>
         </div>
      )
   }
}

export default NpcActions
