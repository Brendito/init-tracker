import React, { Component } from 'react'
import { FormGroup, Label, Input, Button } from 'reactstrap'

export default class NpcSpecialAbilityModal extends Component {
   constructor(props) {
      super(props)

      this.state = {
         ...this.props.ability,
      }
   }

   handleChange = e => {
      const name = e.target.name
      const value = e.target.value
      this.setState({
         ...this.state,
         [name]: value,
      })
   }

   handleSubmit = () => {
      this.props.handleSubmit(this.state)
   }

   render() {
      return (
         <div className="p-3">
            {!this.state.name ? (
               <h4>Add New Ability</h4>
            ) : (
               <h4>Edit - {this.state.name}</h4>
            )}
            <hr />
            <FormGroup>
               <Label for="name">Ability Name</Label>
               <Input
                  type="text"
                  name="name"
                  id="name"
                  onChange={this.handleChange}
                  defaultValue={this.state.name}
               />
            </FormGroup>
            <FormGroup>
               <Label for="desc">Ability Description</Label>
               <Input
                  type="textarea"
                  name="desc"
                  id="desc"
                  onChange={this.handleChange}
                  defaultValue={this.state.desc}
               />
            </FormGroup>
            <div className="d-flex mt-1 justify-content-end">
               <Button className="mr-3" color="success" onClick={this.handleSubmit}>
                  Save
               </Button>
               <Button color="warning" onClick={this.props.toggle}>
                  Cancel
               </Button>
            </div>
         </div>
      )
   }
}
