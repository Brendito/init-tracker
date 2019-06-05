import React, { Component } from 'react'
import HealthBar from '../Tracker/CharacterCard/HealthBar/HealthBar'
import * as types from '../../constants/formGroupTypes'
import { Col, Input, Button } from 'reactstrap'

class HealthController extends Component {

   handleIncrement = () => {
      let inputValue = parseInt(document.getElementById('hpAmount').value)
      let newHP
      if (inputValue) {
         newHP = this.props.tracker.current_hit_points + inputValue
         this.props.listener('current_hit_points', newHP, 'current_hit_points')
      } else {
         newHP = this.props.tracker.current_hit_points + 1
         this.props.listener('current_hit_points', newHP, 'current_hit_points')
      }
   }

   handleDecrement = () => {
      let inputValue = parseInt(document.getElementById('hpAmount').value)
      let newHP
      if (inputValue) {
         newHP = this.props.tracker.current_hit_points - parseInt(inputValue)
         this.props.listener('current_hit_points', newHP, 'current_hit_points')
      } else {
         newHP = this.props.tracker.current_hit_points - 1
         this.props.listener('current_hit_points', newHP, 'current_hit_points')
      }
   }

   render() {
      return (
         <div>
            <HealthBar {...this.props} />
            <div className="d-flex justify-content-center">
               <Col sm={6}>
                  <div className="d-flex m-2">
                     <Button onClick={this.handleDecrement}>-</Button>
                     <Input className="mx-3" type="text" id="hpAmount" />
                     <Button onClick={this.handleIncrement}>+</Button>
                  </div>
               </Col>
            </div>
         </div>
      )
   }
}

export default HealthController
