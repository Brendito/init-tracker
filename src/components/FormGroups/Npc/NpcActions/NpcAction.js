import React, { Component } from 'react'
import { ListGroupItem } from 'reactstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export default class NpcAction extends Component {
   loadModal = () => {
      this.props.onLoadModal(this.props.action)
   }
   deleteAction = () => {
      this.props.onDelete(this.props.action.name, 'action')
   }

   render() {
      return (
         <div>
            <ListGroupItem className="my-1">
               <div className="d-flex flex-column align-content-center">
                  <span className="font-weight-bold mb-2">
                     {this.props.action.name}
                  </span>
                  <p className="font-weight-light">{this.props.action.desc}</p>
               </div>
               {this.props.action.attack_bonus && (
                  <div>
                     <div>
                        <span className="font-weight-bold mr-1">
                           {this.props.action.attack_bonus}
                        </span>
                        <span className="font-weight-light">to hit</span>

                        {this.props.action.range !== undefined && (
                           <span className="font-weight-light">
                              , reach {this.props.action.range}
                           </span>
                        )}
                     </div>
                     <div className="d-flex justify-content-start flex-wrap">
                        <div className="mr-1">
                           {this.props.action.average_damage && (
                              <span className="font-weight-bold">
                                 {this.props.action.average_damage}
                              </span>
                           )}
                           {this.props.action.damage_dice && (
                              <span className="font-weight-light ml-1">
                                 ({this.props.action.damage_dice})
                              </span>
                           )}
                           {this.props.action.damage_type && (
                              <span className="font-weight-light">
                                 <span className="font-weight-light ml-1 mr-1">
                                    {this.props.action.damage_type}
                                 </span>
                                 damage
                              </span>
                           )}
                        </div>
                        <div>
                           {this.props.action.average_damage_bonus && (
                              <span className="font-weight-light">
                                 and
                                 <span className=" ml-1 font-weight-bold">
                                    {this.props.action.average_damage_bonus}
                                 </span>
                              </span>
                           )}
                           {this.props.action.bonus_damage_dice && (
                              <span className="font-weight-light ml-1">
                                 ({this.props.action.bonus_damage_dice})
                              </span>
                           )}
                           {this.props.action.bonus_damage_type && (
                              <span className="font-weight-light">
                                 <span className="font-weight-light ml-1 mr-1">
                                    {this.props.action.bonus_damage_type}
                                 </span>
                                 damage
                              </span>
                           )}
                        </div>
                     </div>
                  </div>
               )}
               <div className="d-flex m-1 justify-content-end">
                  <span
                     className="font-weight-light mx-2"
                     onClick={this.loadModal}>
                     Edit
                     <FontAwesomeIcon icon="edit" className="ml-2" />
                  </span>
                  <span
                     className="font-weight-light mx-2"
                     onClick={this.deleteAction}>
                     Delete
                     <FontAwesomeIcon icon="times" className="ml-2" />
                  </span>
               </div>
            </ListGroupItem>
         </div>
      )
   }
}
