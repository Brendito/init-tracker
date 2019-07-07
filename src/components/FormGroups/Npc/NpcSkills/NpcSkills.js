import React, { Component } from 'react'
import { statNumbers, skills } from '../../../../constants/npcInformation'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
   ListGroup,
   ListGroupItem,
   Modal,
   Button,
   Input,
   Label,
   FormGroup,
} from 'reactstrap'

class NpcSavingThrows extends Component {
   constructor(props) {
      super(props)
      this.state = {
         npc: {
            ...this.props.npc,
         },
         skillProfAdd: false,
      }
   }

   toggleModal = () => {
      this.setState({ skillProfAdd: !this.state.skillProfAdd })
   }

   componentWillReceiveProps = nextProps => {
      this.setState({
         npc: {
            ...nextProps.npc,
         },
      })
   }

   handleSubmit = () => {
      this.toggleModal()
      let skillType = document.getElementById('skillType').value
      let skillAmount = document.getElementById('skillAmount').value
      if (skillType !== '' && skillAmount !== '') {
         return this.props.listener(skillType, Number(skillAmount))
      } else {
         console.log('Error on Saving Throw')
      }
   }

   handleDelete = e => {
      const name =
         e.target.parentNode.dataset.name !== undefined
            ? e.target.parentNode.dataset.name
            : e.target.dataset.name
      this.props.onDelete(name)
   }

   render() {
      return (
         <div className="my-2">
            <div className="d-flex justify-content-between">
               <h5>Skills</h5>
               <span onClick={this.toggleModal} className="font-weight-light">
                  Add New Skill
                  <FontAwesomeIcon icon="plus" className="ml-2" size="1x" />
               </span>
            </div>
            <hr className="mt-1" />
            <ListGroup>
               {skills.map((skill, i) => {
                  if (this.state.npc[skill.id]) {
                     return (
                        <ListGroupItem className="mt-1" key={i}>
                           <div className="d-flex justify-content-between align-content-center">
                              <div>
                                 <span className="font-weight-bold mr-3">
                                    +{this.state.npc[skill.id]}
                                 </span>
                                 <span>{skill.name}</span>
                              </div>
                              <FontAwesomeIcon
                                 icon="times"
                                 className="mt-1"
                                 data-name={skill.id}
                                 onClick={this.handleDelete}
                              />
                           </div>
                        </ListGroupItem>
                     )
                  } else {
                     return null
                  }
               })}
            </ListGroup>

            <Modal isOpen={this.state.skillProfAdd} toggle={this.toggleModal}>
               <div className="p-3">
                  <h4>Add New Skill</h4>
                  <FormGroup>
                     <Label for="skillType">Skill Type</Label>
                     <Input type="select" name="skillType" id="skillType">
                        <option />
                        {skills.map((skill, i) => {
                           return (
                              <option value={skill.id} key={i}>
                                 {skill.name}
                              </option>
                           )
                        })}
                     </Input>
                  </FormGroup>
                  <FormGroup>
                     <Label for="skillAmount">Skill Amount</Label>
                     <Input type="select" name="skillAmount" id="skillAmount">
                        <option />
                        {statNumbers.map(num => {
                           return <option key={num}>{num}</option>
                        })}
                     </Input>
                  </FormGroup>
                  <Button name="savingThrow" onClick={this.handleSubmit}>
                     Add Skill
                  </Button>
               </div>
            </Modal>
         </div>
      )
   }
}

export default NpcSavingThrows
