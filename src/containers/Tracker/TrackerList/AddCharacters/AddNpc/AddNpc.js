
import React, { Component } from 'react'
import { Button, ListGroup, ListGroupItem } from 'reactstrap'
import ListFilter from '../../../../../components/ListFilter/ListFilter'
import { getModifier } from '../../../../../utils/utils'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { connect } from 'react-redux'

class AddNpc extends Component {
   constructor(props) {
      super(props)
      this.state = {
         list: [...this.props.list.filter(npc => npc.characterType === this.props.characterType)],
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
      const list = [...this.state.list, addedNPC]
      this.setState({
         list: [...list],
      })
      this.handleListener(list);
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
      const list = [...ogList, ...filtered];
      this.setState({ list: [...list] })
      this.handleListener(list);
   }

   totalNPC = id => {
      const num = this.state.list.filter(npc => npc.id === id)
      return num.length
   }

   handleListener = (list) => {
      list.sort((a, b) => {
         if (a.name < b.name) {
            return -1
         }
         if (a.name > b.name) {
            return 1
         }
         return 0
      })
      list.forEach((el, i) => {
         el.initMod = getModifier(el.dexterity)
         el.tracker = {
            current_hit_points: el.hit_points,
            initTotal: 0,
            inTracker : true
         }
      })
      this.props.listener(list, this.props.characterType)
   }

   render() {
      return (
         <div className="p-1">
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
         </div>
      )
   }
}

const mapStateToProps = (state, ownProps) => ({
   npcs: state.saved.npcs.filter(
      npc => npc.characterType === ownProps.characterType
   ),
   list : state.tracker.list
})

export default connect(
   mapStateToProps,
   null
)(AddNpc)
