import React, { Component } from 'react'
import { connect } from 'react-redux'
import { deleteChar, saveCampaign } from '../actions/campaignActions'
import { Container, Row, Col } from 'reactstrap'
import PlayerList from '../components/PlayerList/PlayerList'
import PlayerForm from '../components/PlayerForm/PlayerForm'

class PlayerContainer extends Component {
   constructor(props) {
      super(props)
      this.state = {
         addingChar: false,
         editingChar: false,
         char: {},
      }
   }

   componentWillReceiveProps(nextProps) {
      this.props.saveCampaign(nextProps.campaign)
   }

   toggle = () => {
      this.setState({
         addingChar: false,
         editingChar: false,
      })
   }

   toggleAddForm = () => {
      this.setState({
         addingChar: !this.state.addingChar,
      })
   }

   toggleEditForm = () => {
      this.setState({
         editingChar: true,
      })
   }

   handleDelete = (id, chartype) => {
      this.props.deleteChar(id, chartype)
      this.toggle()
   }

   loadPlayer = id => {
      const loadedPlayer = this.props.players.filter(player => player.id === id)
      this.setState({
         char: { ...loadedPlayer[0] },
      })
      this.toggleEditForm()
   }

   render() {
      return (
         <Container fluid>
            <Row>
               <Col sm="12" md="4">
                  <PlayerList
                     handleDelete={this.handleDelete}
                     loadPlayer={this.loadPlayer}
                     addPlayer={this.toggleAddForm}
                     players={this.props.players}
                  />
               </Col>
               <Col sm="12" md="8">
                  {!this.state.addingChar && !this.state.editingChar && (
                     <div>
                        <h4>Encounter Size Builder</h4>
                        <h5>Placeholder</h5>
                     </div>
                  )}
                  {this.state.addingChar && (
                     <PlayerForm toggle={this.toggleAddForm} newChar={true} />
                  )}
                  {this.state.editingChar && (
                     <PlayerForm toggle={this.toggle} char={this.state.char} newChar={false} />
                  )}
               </Col>
            </Row>
         </Container>
      )
   }
}

const mapStateToProps = state => ({
   players: state.campaign.loadedCampaign.characters.players,
   campaign: state.campaign.loadedCampaign,
})

const mapDispatchToProps = dispatch => {
   return {
      deleteChar: (id, type) => {
         dispatch(deleteChar(id, type))
      },
      saveCampaign: campaignId => {
         dispatch(saveCampaign(campaignId))
      },
   }
}

export default connect(
   mapStateToProps,
   mapDispatchToProps
)(PlayerContainer)
