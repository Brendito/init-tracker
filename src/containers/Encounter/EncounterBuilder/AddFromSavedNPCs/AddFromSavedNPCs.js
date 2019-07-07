import React, { Component } from 'react'
import { Button, ListGroup, ListGroupItem } from 'reactstrap'
import ListFilter from '../../../../components/ListFilter/ListFilter'
import { getModifier } from '../../../../utils/utils'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import * as charTypes from '../../../../constants/characterTypes'
import { connect } from 'react-redux'
import './styles.css'

class AddFromSavedNPCs extends Component {
   constructor(props) {
      super(props)
      this.state = {
         list: [...this.props.list],
         filteredList: [...this.props.npcs],
      }
   }

   handleFilterChange = filtered => {
      this.setState({
         filteredList: [...filtered],
      })
   }

   addToEncounter = e => {
      let id =
         e.target.dataset.id !== undefined
            ? e.target.dataset.id
            : e.target.parentNode.dataset.id
      const npclist = [].concat(this.props.npcs)
      const addedNPC = { ...npclist.find(npc => npc.id === id) }
      this.setState({
         list: [...this.state.list, addedNPC],
      })
   }

   removeFromEncounter = e => {
      let id =
         e.target.dataset.id !== undefined
            ? e.target.dataset.id
            : e.target.parentNode.dataset.id
      const ogList = [...this.state.list]
      const filtered = [...this.state.list].filter(npc => npc.id === id)
      filtered.forEach(f =>
         ogList.splice(ogList.findIndex(e => e.id === f.id), 1)
      )
      filtered.splice(0, 1)
      this.setState({ list: [...ogList, ...filtered] })
   }

   totalNPC = id => {
      const num = this.state.list.filter(npc => npc.id === id)
      return num.length
   }

   saveEncounter = () => {
      const savedList = [].concat(this.state.list)
      savedList.sort((a, b) => {
         if (a.name < b.name) {
            return -1
         }
         if (a.name > b.name) {
            return 1
         }
         return 0
      })
      savedList.forEach((el, i) => {
         el.listId = i
         el.initMod = getModifier(el.dexterity)
         el.tracker = {
            current_hit_points: el.hit_points,
            initTotal: 0,
            inTracker : true
         }
      })
      this.props.addToEncounter(savedList)
      this.props.toggle()
   }

   render() {
      return (
         <div className="p-3">
            <p className="font-weight-bold mb-1">Add From Saved NPCS:</p>
            <hr />
            <ListFilter
               npcs={this.props.npcs}
               listener={this.handleFilterChange}
               saved={true}
            />
            <hr className="mt-1" />
            <ListGroup>
               {this.state.filteredList &&
                  this.state.filteredList.map(npc => {
                     return (
                        <ListGroupItem key={npc.id}>
                           <div className="d-flex justify-content-between align-content-center">
                              <div>
                                 <span className="d-block font-weight-bold">
                                    {npc.name}
                                 </span>
                                 <span className="font-weight-light">
                                    CR {npc.challenge_rating} - (
                                    <span className="font-italic">
                                       {npc.xp}xp
                                    </span>
                                    )
                                 </span>
                              </div>
                              <div>
                                 <div className="d-flex justify-content-between flex-column">
                                    <FontAwesomeIcon
                                       icon="plus"
                                       data-id={npc.id}
                                       onClick={this.addToEncounter}
                                    />
                                    <span className="font-weight-bolder my-2 totalNPC">
                                       {this.totalNPC(npc.id)}
                                    </span>
                                    <FontAwesomeIcon
                                       icon="minus"
                                       data-id={npc.id}
                                       onClick={this.removeFromEncounter}
                                    />
                                 </div>
                              </div>
                           </div>
                        </ListGroupItem>
                     )
                  })}
            </ListGroup>
            <hr />
            <Button color="primary" onClick={this.saveEncounter}>
               Save
            </Button>
         </div>
      )
   }
}

const mapStateToProps = (state, ownProps) => ({
   npcs: state.saved.npcs.filter(
      npc => npc.characterType === ownProps.characterType || charTypes.HOSTILE_NPC
   ),
})

export default connect(
   mapStateToProps,
   null
)(AddFromSavedNPCs)
