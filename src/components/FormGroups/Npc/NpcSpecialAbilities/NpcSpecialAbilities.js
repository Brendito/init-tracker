import React, { Component } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { ListGroup, Modal } from 'reactstrap'
import NpcSpecialAbility from './NpcSpecialAbility'
import NpcSpecialAbilityModal from './NpcSpecialAbilityModal'

class NpcSpecialAbilities extends Component {
   constructor(props) {
      super(props)
      this.state = {
         abilities: this.props.abilities,
         abilityAdd: false,
         ability: {},
      }
   }

   componentWillReceiveProps = nextProps => {
      if (nextProps.abilities) {
         this.setState({
            abilities: [...nextProps.abilities],
         })
      }
   }

   toggleModal = () => {
      this.setState({
         abilityAdd: !this.state.abilityAdd,
         ability : {}
      })
   }

   handleSubmit = ability => {
      this.toggleModal()
      if (ability.name) {
         return this.props.listener(ability, 'ability')
      } else {
         console.log('Error on special ability')
      }
   }

   handleLoadModal = ability => {
      this.toggleModal()
      this.setState({ ability: ability })
   }

   handleDelete = ability => {
      this.props.onDelete(ability, 'ability')
   }

   render() {
      return (
         <div>
            <div className="d-flex justify-content-between">
               <h5>Special Abilities</h5>
               <span onClick={this.toggleModal} className="font-weight-light">
                  Add New Ability
                  <FontAwesomeIcon icon="plus" className="ml-2" size="1x" />
               </span>
            </div>
            <hr className="mt-1" />
            <ListGroup>
               {this.state.abilities &&
                  this.state.abilities.length > 0 &&
                  this.state.abilities.map((ability, i) => {
                     return (
                        <NpcSpecialAbility
                           key={i}
                           onLoadModal={this.handleLoadModal}
                           onDelete={this.handleDelete}
                           ability={ability}
                        />
                     )
                  })}
            </ListGroup>
            <Modal isOpen={this.state.abilityAdd} toggle={this.toggleModal}>
               <NpcSpecialAbilityModal
                  ability={this.state.ability}
                  toggle={this.toggleModal}
                  handleSubmit={this.handleSubmit}
               />
            </Modal>
         </div>
      )
   }
}

export default NpcSpecialAbilities
