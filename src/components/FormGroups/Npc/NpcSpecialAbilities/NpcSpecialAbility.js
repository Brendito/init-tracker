import React, { Component } from 'react'
import { ListGroupItem } from 'reactstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export default class NpcSpecialAbility extends Component {
   loadModal = () => {
      this.props.onLoadModal(this.props.ability)
   }
   deleteAbility = () => {
      this.props.onDelete(this.props.ability)
   }

   render() {
      return (
         <ListGroupItem className="mt-1">
            <div className="d-flex flex-column align-content-center">
               <span className="font-weight-bold mb-2">
                  {this.props.ability.name}
               </span>
               <p className="font-weight-light">{this.props.ability.desc}</p>
            </div>
            <div className="d-flex justify-content-end m-1">
               <span
                  onClick={this.loadModal}
                  className="font-weight-light mx-2">
                  Edit
                  <FontAwesomeIcon icon="edit" className="ml-2" />
               </span>
               <span
                  className="font-weight-light mx-2"
                  onClick={this.deleteAbility}>
                  Delete
                  <FontAwesomeIcon icon="times" className="ml-2" />
               </span>
            </div>
         </ListGroupItem>
      )
   }
}
