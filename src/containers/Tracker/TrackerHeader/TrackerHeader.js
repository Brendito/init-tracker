import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Container, Col, Button } from 'reactstrap'
import { connect } from 'react-redux'

class TrackerHeader extends Component {
   render() {
      return (
         <Container>
            <div>
               <h4>{this.props.tracker.name}</h4>
               <div className="d-flex justify-content-between flex-wrap align-items-center ">
                  <div>
                     <h6 className="font-weight-light mr-2 d-inline">
                        Round : 1
                     </h6>
                     <h6 className="font-weight-light mr-2 d-inline">
                        Battle Time : 6s
                     </h6>
                     <h6 className="font-weight-light mr-2 d-inline">
                        Running Time : 0:20
                     </h6>
                  </div>
                  <div>

                        <Button className="mr-2">Add</Button>
                        <Button className="mr-2">End</Button>
                        <Button className="mr-2">Next</Button>

                  </div>
               </div>
            </div>
         </Container>
      )
   }
}

const mapStateToProps = state => ({
   tracker: state.tracker,
})

const mapDispatchToProps = {}

export default connect(
   mapStateToProps,
   mapDispatchToProps
)(TrackerHeader)
