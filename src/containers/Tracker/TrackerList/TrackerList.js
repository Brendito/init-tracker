import React, { Component } from 'react'
import { Row, Modal } from 'reactstrap'
import { connect } from 'react-redux'
import CharacterCard from './CharacterCard/CharacterCard'
import AddCharacters from './AddCharacters/AddCharacters';

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
                        <CharacterCard key={character.listId || character.id} {...character} />
                     )
                  })}
            </Row>
            <Modal isOpen={this.state.addPlayerModal} toggle={this.togglePlayerModal}>
               <AddCharacters toggle={this.togglePlayerModal}/>
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
