import React, { Component } from 'react'
import { connect } from 'react-redux'
import { addToTracker } from '../../../../../actions/trackerActions'
import { ListGroup, ListGroupItem } from 'reactstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import * as charTypes from '../../../../../constants/characterTypes'

class AddHostileNpc extends Component {
   constructor(props) {
      super(props)

      this.state = {
         hostileNpcs: [],
      }
   }

   componentDidMount = () => {
      const allNpcs = this.props.npcs
      // Loop through all npcs in store and set inTracker to false
      allNpcs.forEach(npc => {
         npc.tracker = {
            current_hit_points: npc.hit_points,
            initTotal: 0,
            inTracker: false,
         }
      })
      const inList = this.props.list.filter(
         npc => npc.characterType === charTypes.HOSTILE_NPC
      )
      // Loop through the npcs currently in the tracker and set to true
      inList.forEach(listPlayer => {
         allNpcs.forEach(npc => {
            if (listPlayer.listId === npc.listId) {
               npc.tracker.inTracker = true
            }
         })
      })
      this.setState({
         hostileNpcs: [...allNpcs],
      })
   }

   handleClick = id => {
      // Identify the npc that was clicked
      const npc = this.state.hostileNpcs.find(npc => npc.listId === id)
      // Toggle its tracker status
      npc.tracker.inTracker = !npc.tracker.inTracker
      // Filter the list to exclude the player
      const npcs = this.state.hostileNpcs.filter(list => list.listId !== npc.listId)
      // Add the player back in
      this.setState({ hostileNpcs: [npc, ...npcs] })
   }

   addPlayersToTracker = () => {
      // Gather all npcs that have inTracker set to true
      const playersToAdd = this.state.playerList.filter(
         player => player.tracker.inTracker
      )
      // Concatenate onto the PC filtered tracker list
      const trackerList = [...this.state.monsters, ...playersToAdd]
      this.props.addToTracker(trackerList)
      this.props.toggle()
   }

   render() {
      return (
         <ListGroup className="mt-3 px-1">
            {/* Loop through and get all npcs in current tracker list and display with added styles */}
            {this.state.hostileNpcs &&
               this.state.hostileNpcs.map(npc => {
                  return (
                     <ListGroupItem
                        className={npc.tracker.inTracker ? 'added' : ''}
                        key={npc.id}
                        onClick={() => {
                           this.handleClick(npc.listId)
                        }}
                        data-id={npc.id}>
                        <div className="d-flex justify-content-between align-items-center">
                           {npc.name}
                           {npc.tracker.inTracker && (
                              <span className="font-weight-lighter">
                                 Added
                                 <FontAwesomeIcon
                                    className="ml-1"
                                    icon="check-circle"
                                 />
                              </span>
                           )}
                        </div>
                     </ListGroupItem>
                  )
               })}
         </ListGroup>
      )
   }
}

const mapStateToProps = state => ({
   npcs: state.saved.npcs,
   list: state.tracker.list,
})

const mapDispatchToProps = dispatch => {
   return {
      addToTracker: characters => dispatch(addToTracker(characters)),
   }
}

export default connect(
   mapStateToProps,
   mapDispatchToProps
)(AddHostileNpc)
