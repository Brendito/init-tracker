import React from 'react'
import { FormGroup, Label, Input, Row, Col } from 'reactstrap'

export default class Attributes extends React.Component {
   handleAttributes = event => {
      const name = event.target.name
      const value = Number(event.target.value)
      this.props.listener(name, value)
   }

   render() {
      return (
         <div>
            <h5>Attribute Modifiers</h5>
            <span className="font-italic font-weight-light">Optional Fields</span>
            <hr/>
            <FormGroup>
               <Row>
                  <Col sm="12" md="6">
                     <FormGroup>
                        <Label for="strength">Strength</Label>
                        <Input
                           type="number"
                           name="strength"
                           id="strength"
                           placeholder={this.props.strength}
                           onChange={this.handleAttributes}
                        />
                     </FormGroup>
                     <FormGroup>
                        <Label for="dexterity">Dexterity</Label>
                        <Input
                           type="number"
                           name="dexterity"
                           id="dexterity"
                           placeholder={this.props.dexterity}
                           onChange={this.handleAttributes}
                        />
                     </FormGroup>
                     <FormGroup>
                        <Label for="constitution">Constitution</Label>
                        <Input
                           type="number"
                           name="constitution"
                           id="constitution"
                           placeholder={this.props.constitution}
                           onChange={this.handleAttributes}
                        />
                     </FormGroup>
                  </Col>
                  <Col sm="12" md="6">
                     <FormGroup>
                        <Label for="wisdom">Wisdom</Label>
                        <Input
                           type="number"
                           name="wisdom"
                           id="wisdom"
                           placeholder={this.props.wisdom}
                           onChange={this.handleAttributes}
                        />
                     </FormGroup>
                     <FormGroup>
                        <Label for="intellect">Intellect</Label>
                        <Input
                           type="number"
                           name="intellect"
                           id="intellect"
                           placeholder={this.props.intelligence}
                           onChange={this.handleAttributes}
                        />
                     </FormGroup>
                     <FormGroup>
                        <Label for="charisma">Charisma</Label>
                        <Input
                           type="number"
                           name="charisma"
                           id="charisma"
                           placeholder={this.props.charisma}
                           onChange={this.handleAttributes}
                        />
                     </FormGroup>
                  </Col>
               </Row>
            </FormGroup>
         </div>
      )
   }
}
