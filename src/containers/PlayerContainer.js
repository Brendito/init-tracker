import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Container, Row, Col } from 'reactstrap'
import PlayerList from '../components/PlayerList/PlayerList'
import PlayerForm from '../components/PlayerForm/PlayerForm'

class PlayerContainer extends Component {
   constructor(props) {
      super(props)
      this.state = {
         addingChar: false,
         editingChar: false,
      }
   }
   toggleAddForm = () => {
     this.setState({
       addingChar : !this.state.addingChar
     })
   }

   toggleEditForm = () => {
     this.setState({
       editingChar: true,
     })
   }

   render() {
      return (
         <Container fluid>
            <Row>
               <Col sm="12" md="4">
                  <PlayerList addPlayer={this.toggleAddForm} players={this.props.players} />
               </Col>
               <Col sm="12" md="8">
                  {this.state.addingChar && <PlayerForm toggle={this.toggleAddForm} newChar={true}/>}
                  {this.state.editingChar && <PlayerForm  newChar={false}/>}
               </Col>
            </Row>
         </Container>
      )
   }
}

const mapStateToProps = state => ({
   players: state.campaign.loadedCampaign.characters.players,
})

export default connect(mapStateToProps)(PlayerContainer)
