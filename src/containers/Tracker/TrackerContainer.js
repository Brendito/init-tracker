import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Container } from 'reactstrap'
import TrackerHeader from './TrackerHeader/TrackerHeader'
import TrackerList from './TrackerList/TrackerList'

class TrackerContainer extends Component {
   render() {
      return (
         <Container fluid>
            <TrackerHeader />
            <hr />
            {/* Tracker Controls */}
            <TrackerList/>
         </Container>
      )
   }
}

const mapStateToProps = state => ({
   tracker: state.tracker,
})

export default connect(mapStateToProps)(TrackerContainer)
