import React, { Component } from 'react'
import { FormGroup, Label, Input } from 'reactstrap'

class Stats extends Component {
   handleChange = e => {
      const name = e.target.name
      const value = Number(e.target.value)
      this.props.listener(name, value)
   }

   render() {
      return (
         <div>
            <h5>Character Stats</h5>
            <hr />
            <FormGroup>
               <Label for="hit_points">Max HP</Label>
               <Input
                  type="number"
                  name="hit_points"
                  id="hit_points"
                  placeholder={this.props.hit_points}
                  onChange={this.handleChange}
               />
            </FormGroup>
            <FormGroup>
               <Label for="armor_class">AC</Label>
               <Input
                  type="number"
                  name="armor_class"
                  id="armor_class"
                  placeholder={this.props.armor_class}
                  onChange={this.handleChange}
               />
            </FormGroup>
            <FormGroup>
               <Label for="initMod">Initiative Modifier</Label>
               <Input
                  type="number"
                  name="initMod"
                  id="initMod"
                  placeholder={this.props.initMod}
                  onChange={this.handleChange}
               />
            </FormGroup>
            <FormGroup>
               <Label for="characterLevel">Level</Label>
               <Input
                  type="number"
                  name="characterLevel"
                  id="characterLevel"
                  placeholder={this.props.characterLevel}
                  onChange={this.handleChange}
               />
            </FormGroup>
         </div>
      )
   }
}

export default Stats
