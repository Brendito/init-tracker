import React, { Component } from 'react'
import { Container, Button } from 'reactstrap'
import { Link } from 'react-router-dom'
import { PLAYER_FORM } from '../../constants/routes'
import PlayerList from './PlayerList/PlayerList'
import { v4 } from 'node-uuid'

class PlayerContainer extends Component {
   render() {
      return (
         <Container fluid>
         {/* List all saved players */}
            <PlayerList className="mb-2" />
            <hr/>
            {/* Route to Player Form with a new ID */}
            <Link
               to={{
                  pathname: `${PLAYER_FORM}${'new-player'}`,
                  state: {
                     playerId: v4(),
                  },
               }}>
               <Button color="primary">Create New Player</Button>
            </Link>
         </Container>
      )
   }
}

export default PlayerContainer
