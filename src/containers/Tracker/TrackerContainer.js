import React, { Component } from 'react'
import { connect } from 'react-redux'

class TrackerContainer extends Component {
   render() {
      return (
         <div>
            <h1>{this.props.tracker && this.props.tracker.id}</h1>
            {/* Tracker Header */}
            {/* Tracker Controls */}
            {/* Tracker List */}
         </div>
      )
   }
}

const mapStateToProps = state => ({
   tracker: state.tracker,
})

export default connect(mapStateToProps)(TrackerContainer)
