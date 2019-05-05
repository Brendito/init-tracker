import React, { Component } from 'react'
import { connect } from 'react-redux'
import {addToTracker} from '../../../../actions/trackerActions'
import { ListGroup, ListGroupItem, Button } from 'reactstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import './styles.css'

class AddPlayers extends Component {
   constructor(props) {
      super(props)

      this.state = {
         playerList: [],
      }
   }

   handlePlayerClick = e => {
      const player = this.props.players.find(
         player => player.id === e.target.dataset.id
      )
      const list = this.state.playerList.filter(el => el.id !== player.id)
      if (this.state.playerList.indexOf(player) !== -1) {
         this.setState({ playerList: [...list] })
      } else {
         this.setState({ playerList: [...list, player] })
      }
   }

   addPlayersToTracker = () => {
       const players = this.state.playerList;
       players.forEach(player => {
           const p = player;
           p.tracker = {
               current_hit_points : p.hit_points,
               initTotal : 0
           }
           return p
       })
       console.warn(players)
       this.props.addToTracker(players)
   }

   render() {
      return (
         <div className="p-3">
            <h5>Add Players to Encounter</h5>
            <hr />
            <ListGroup>
               {this.props.players &&
                  this.props.players.map(player => {
                     return (
                        <ListGroupItem
                           className={
                              this.state.playerList.indexOf(player) !== -1
                                 ? 'added'
                                 : ' '
                           }
                           key={player.id}>
                           <div
                              onClick={this.handlePlayerClick}
                              data-id={player.id}
                              className="d-flex justify-content-between align-items-center">
                              {player.name}
                              {this.state.playerList.indexOf(player) !== -1 && (
                                 <FontAwesomeIcon icon="check-circle" />
                              )}
                           </div>
                        </ListGroupItem>
                     )
                  })}
            </ListGroup>
            <Button onClick={this.addPlayersToTracker}>Save</Button>
         </div>
      )
   }
}

const mapStateToProps = state => ({
   players: state.loaded.players,
})

const mapDispatchToProps = dispatch => {
    return ({
        addToTracker : characters => dispatch(addToTracker(characters))
    })
}

export default connect(
   mapStateToProps,
   mapDispatchToProps
)(AddPlayers)
