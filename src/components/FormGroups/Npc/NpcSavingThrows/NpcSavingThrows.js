import React, { Component } from 'react'
import {
   attributeTypes,
   statNumbers,
} from '../../../../constants/npcInformation'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
   ListGroup,
   ListGroupItem,
   Modal,
   Button,
   Input,
   Label,
   FormGroup,
} from 'reactstrap'

class NpcSavingThrows extends Component {
   constructor(props) {
      super(props)
      this.state = {
         npc: {
            ...this.props.npc,
         },
         savingThrowAdd: false,
      }
   }

   toggleModal = () => {
      this.setState({ savingThrowAdd: !this.state.savingThrowAdd })
   }

   componentWillReceiveProps = nextProps => {
      this.setState({
         npc: {
            ...nextProps.npc,
         },
      })
   }

   handleSubmit = () => {
      this.toggleModal()
      let savingThrowType = document.getElementById('savingThrowType').value
      let savingThrowAmount = document.getElementById('savingThrowAmount').value
      if (savingThrowType !== '' && savingThrowAmount !== '') {
         return this.props.listener(savingThrowType, Number(savingThrowAmount))
      } else {
         console.log('Error on Saving Throw')
      }
   }

   handleDelete = e => {
      const name =
         e.target.parentNode.dataset.name !== undefined
            ? e.target.parentNode.dataset.name
            : e.target.dataset.name
      this.props.onDelete(name, null)
   }

   render() {
      return (
         <div className="my-2">
            <div className="d-flex justify-content-between">
               <h5>Saving Throws</h5>
               <span onClick={this.toggleModal} className="font-weight-light">
                  Add New Saving Throw
                  <FontAwesomeIcon icon="plus" className="ml-2" size="1x" />
               </span>
            </div>
            <hr className="mt-1" />
            <ListGroup>
               {attributeTypes.map((type, i) => {
                  if (this.state.npc[type.id]) {
                     return (
                        <ListGroupItem key={i} className="mt-1">
                           <div className="d-flex justify-content-between align-content-center">
                              <div>
                                 <span className="font-weight-bold mr-2">
                                    +{this.state.npc[type.id]}
                                 </span>
                                 <span>{type.name}</span>
                              </div>
                              <FontAwesomeIcon
                                 icon="times"
                                 className="mt-1"
                                 data-name={type.id}
                                 onClick={this.handleDelete}
                              />
                           </div>
                        </ListGroupItem>
                     )
                  } else {
                     return null
                  }
               })}
            </ListGroup>

            <Modal isOpen={this.state.savingThrowAdd} toggle={this.toggleModal}>
               <div className="p-3">
                  <h4>Add New Saving Throw</h4>
                  <FormGroup>
                     <Label for="savingThrowType">Saving Throw Type</Label>
                     <Input
                        type="select"
                        name="savingThrowType"
                        id="savingThrowType">
                        {attributeTypes.map((type, i) => {
                           return (
                              <option value={type.id} key={i}>
                                 {type.name}
                              </option>
                           )
                        })}
                     </Input>
                  </FormGroup>
                  <FormGroup>
                     <Label for="savingThrowAmount">Saving Throw Amount</Label>
                     <Input
                        type="select"
                        name="savingThrowAmount"
                        id="savingThrowAmount">
                        {statNumbers.map((num, i) => {
                           return <option key={i}>{num}</option>
                        })}
                     </Input>
                  </FormGroup>
                  <div className="d-flex justify-content-end">
                     <Button
                        color="success"
                        className="mr-3"
                        onClick={this.handleSubmit}>
                        Add Saving Throw
                     </Button>
                     <Button color="warning" onClick={this.toggleModal}>
                        Cancel
                     </Button>
                  </div>
               </div>
            </Modal>
         </div>
      )
   }
}

export default NpcSavingThrows
