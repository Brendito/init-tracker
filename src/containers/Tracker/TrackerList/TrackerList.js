import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Row, Modal } from 'reactstrap'
import { connect } from 'react-redux'
import CharacterCard from './CharacterCard/CharacterCard'
import AddPlayers from './AddPlayers/AddPlayers'

class TrackerList extends Component {
   constructor(props) {
      super(props)

      this.state = {
         addPlayerModal: false,
         initiativeModal: false,
      }
   }

   togglePlayerModal = () => {
      this.setState({addPlayerModal : !this.state.addPlayerModal})
   }

   componentDidMount = () => {
      this.setState({ addPlayerModal: !this.state.addPlayerModal })
   }

   render() {
      return (
         <div>
            <Row>
               {this.props.list &&
                  this.props.list.length > 0 &&
                  this.props.list.map(character => {
                     return (
                        <CharacterCard key={character.listId} {...character} />
                     )
                  })}
            </Row>
            <Modal isOpen={this.state.addPlayerModal} toggle={this.togglePlayerModal}>
               <AddPlayers />
            </Modal>
         </div>
      )
   }
}

const mapStateToProps = state => ({
   list: state.tracker.list,
})

const mapDispatchToProps = {}

export default connect(
   mapStateToProps,
   mapDispatchToProps
)(TrackerList)
