import React, { Component } from 'react'
import { FormGroup, Label, Input, Button, Row, Col } from 'reactstrap'
import { titleCase } from '../../../../utils/utils'
import { damageTypes } from '../../../../constants/npcInformation'

export default class NpcActionModal extends Component {
   constructor(props) {
      super(props)
      this.state = {
         ...this.props.action,
      }
   }

   onSubmit = () => {
      this.props.handleSubmit(this.state)
   }

   handleChange = e => {
      const name = e.target.name
      const value = e.target.value
      this.setState({
         ...this.state,
         [name]: value,
      })
   }

   render() {
      return (
         <div className="p-3">
            {!this.state.name ? (
               <h4>Add New Action</h4>
            ) : (
               <h4>Edit - {this.state.name}</h4>
            )}

            <span className="font-weight-bold mt-2">Action Information</span>
            <div className="mt-2">
               <FormGroup>
                  <Label for="name">Action Name</Label>
                  <Input
                     type="text"
                     name="name"
                     id="name"
                     onChange={this.handleChange}
                     defaultValue={this.state.name}
                  />
               </FormGroup>
               <FormGroup>
                  <Label for="desc">Action Description</Label>
                  <Input
                     type="textarea"
                     name="desc"
                     id="desc"
                     onChange={this.handleChange}
                     defaultValue={this.state.desc}
                  />
               </FormGroup>
            </div>

            <span className="font-weight-bold">Attack Information</span>
            <Row className="mt-2">
               <Col sm="12" md="6">
                  <FormGroup>
                     <Label className="font-weight-lighter" for="attack_bonus">
                        Attack Bonus (to hit)
                     </Label>
                     <Input
                        type="number"
                        name="attack_bonus"
                        id="attack_bonus"
                        onChange={this.handleChange}
                        defaultValue={this.state.attack_bonus}
                     />
                  </FormGroup>
               </Col>
               <Col sm="12" md="6">
                  <FormGroup>
                     <Label className="font-weight-lighter" for="range">
                        Range
                     </Label>
                     <Input
                        type="text"
                        name="range"
                        id="range"
                        placeholder="ex: 5ft"
                        onChange={this.handleChange}
                        defaultValue={this.state.range}
                     />
                  </FormGroup>
               </Col>
            </Row>
            <span className="font-weight-bold">Base Attack</span>
            <Row className="mt-2">
               <Col sm="12" md="4">
                  <FormGroup>
                     <Label className="font-weight-lighter" for="damage_dice">
                        Damage Dice
                     </Label>
                     <Input
                        type="text"
                        name="damage_dice"
                        id="damage_dice"
                        placeholder="ex: 2d8+5"
                        onChange={this.handleChange}
                        defaultValue={this.state.damage_dice}
                     />
                  </FormGroup>
               </Col>
               <Col sm="12" md="4">
                  <FormGroup>
                     <Label
                        className="font-weight-lighter"
                        for="average_damage">
                        Average Damage
                     </Label>
                     <Input
                        type="number"
                        name="average_damage"
                        id="average_damage"
                        placeholder="ex: 11"
                        onChange={this.handleChange}
                        defaultValue={this.state.average_damage}
                     />
                  </FormGroup>
               </Col>
               <Col sm="12" md="4">
                  <FormGroup>
                     <Label className="font-weight-lighter" for="damage_type">
                        Damage Type
                     </Label>
                     <Input
                        type="select"
                        name="damage_type"
                        id="damage_type"
                        onChange={this.handleChange}
                        defaultValue={this.state.damage_type}>
                        <option value="" />
                        {damageTypes.map((type, i) => {
                           return (
                              <option value={type} key={i}>
                                 {titleCase(type)}
                              </option>
                           )
                        })}
                     </Input>
                  </FormGroup>
               </Col>
            </Row>
            <span className="font-weight-bold">Bonus Damage on Attack</span>
            <Row className="mt-2">
               <Col sm="12" md="4">
                  <FormGroup>
                     <Label
                        className="font-weight-lighter"
                        for="bonus_damage_dice">
                        Bonus Damage Dice
                     </Label>
                     <Input
                        type="text"
                        name="bonus_damage_dice"
                        id="bonus_damage_dice"
                        placeholder="ex: 2d8+5"
                        onChange={this.handleChange}
                        defaultValue={this.state.bonus_damage_dice}
                     />
                  </FormGroup>
               </Col>
               <Col sm="12" md="4">
                  <FormGroup>
                     <Label
                        className="font-weight-lighter"
                        for="average_damage_bonus">
                        Average Bonus Damage
                     </Label>
                     <Input
                        type="number"
                        name="average_damage_bonus"
                        id="average_damage_bonus"
                        placeholder="ex: 11"
                        onChange={this.handleChange}
                        defaultValue={this.state.average_damage_bonus}
                     />
                  </FormGroup>
               </Col>
               <Col sm="12" md="4">
                  <FormGroup>
                     <Label
                        className="font-weight-lighter"
                        for="bonus_damage_type">
                        Bonus Damage Type
                     </Label>
                     <Input
                        type="select"
                        name="bonus_damage_type"
                        id="bonus_damage_type"
                        onChange={this.handleChange}
                        defaultValue={this.state.bonus_damage_type}>
                        <option value="" />
                        {damageTypes.map((type, i) => {
                           return (
                              <option value={type} key={i}>
                                 {titleCase(type)}
                              </option>
                           )
                        })}
                     </Input>
                  </FormGroup>
               </Col>
            </Row>
            <div className="d-flex justify-content-end">
               <Button color="success" className="mr-3" onClick={this.onSubmit}>
                  Save
               </Button>
               <Button color="warning" onClick={this.props.toggleModal}>
                  Cancel
               </Button>
            </div>
         </div>
      )
   }
}
