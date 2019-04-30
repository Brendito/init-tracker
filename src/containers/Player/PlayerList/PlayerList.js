import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Row } from 'reactstrap'
import PlayerListCard from './PlayerListCard/PlayerListCard'

class PlayerList extends Component {
   render() {
      return (
         <div>
            <h4>Saved Players</h4>
            <Row>
            {/* Map all players to cards */}
               {this.props.players &&
                  this.props.players.map(char => {
                     return <PlayerListCard key={char.id} {...char} />
                  })}
                  </Row>
         </div>
      )
   }
}
const mapStateToProps = state => ({
   players: state.campaign.loadedCampaign.characters.players,
})

export default connect(
   mapStateToProps,
   null
)(PlayerList)
