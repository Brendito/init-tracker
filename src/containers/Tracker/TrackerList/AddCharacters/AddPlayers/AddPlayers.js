import React, { Component } from 'react'
import { connect } from 'react-redux'
import { addToTracker } from '../../../../../actions/trackerActions'
import { ListGroup, ListGroupItem, Button } from 'reactstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import './styles.css'

const sortByName = array => {
   const ar = array.sort((a, b) => {
      var nameA = a.name.toUpperCase()
      var nameB = b.name.toUpperCase()
      if (nameA < nameB) {
         return -1
      }
      if (nameA > nameB) {
         return 1
      }
      return 0
   })
   return ar
}

class AddPlayers extends Component {
   constructor(props) {
      super(props)
      this.state = {
         playerList: [],
      }
   }

   componentDidMount = () => {
      const allPlayers = this.props.players
      // Loop through all players in store and set inTracker to false
      allPlayers.forEach(player => {
         player.tracker = {
            current_hit_points: player.hit_points,
            initTotal: 0,
            inTracker: false,
         }
      })
      const inList = this.props.list.filter(
         player => player.characterType === 'PC'
      )
      // Loop through the players currently in the tracker and set to true
      inList.forEach(listPlayer => {
         allPlayers.forEach(player => {
            if (listPlayer.id === player.id) {
               player.tracker.inTracker = true
            }
         })
      })
      this.setState({
         playerList: [...sortByName(allPlayers)],
      })
   }

   handlePlayerClick = id => {
      // Identify the player that was clicked
      const player = this.state.playerList.find(player => player.id === id)
      // Toggle its tracker status
      player.tracker.inTracker = !player.tracker.inTracker
      // Filter the list to exclude the player
      const players = this.state.playerList.filter(
         list => list.id !== player.id
      )
      const list = sortByName([player, ...players])
      // Add the player back in
      this.setState({ playerList: [...list] })
      const playersToAdd = list.filter(
         player => player.tracker.inTracker === true
      )
      console.log('this is the new list', playersToAdd)
      this.props.listener(playersToAdd, this.props.characterType);
   }

   addPlayersToTracker = () => {
      // Gather all players that have inTracker set to true
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
            {/* Loop through and get all players in current tracker list and display with added styles */}
            {this.state.playerList &&
               this.state.playerList.map(player => {
                  return (
                     <ListGroupItem
                        className={player.tracker.inTracker ? 'added' : ''}
                        key={player.id}
                        onClick={() => {
                           this.handlePlayerClick(player.id)
                        }}
                        data-id={player.id}>
                        <div className="d-flex justify-content-between align-items-center">
                           {player.name}
                           {player.tracker.inTracker && (
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
   players: state.loaded.players,
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
)(AddPlayers)
