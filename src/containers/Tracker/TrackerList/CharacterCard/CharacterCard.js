import React from 'react'
import { connect } from 'react-redux'
import * as actionTypes from '../../../../constants/actionTypes'
import { Card, Col, CardBody, CardTitle, CardSubtitle, Badge } from 'reactstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import './CharacterCard.css'
import { titleCase } from '../../../../utils/utils'
import { MONSTER } from '../../../../constants/characterClasses'
import { Modal } from 'reactstrap'
import CharacterEditor from './CharacterEditor/CharacterEditor'
import HealthBar from './HealthBar/HealthBar'
import { handleCharacterIcon } from '../../../../utils/characterIconUtil'

class CharacterCard extends React.Component {
   constructor(props) {
      super(props)
      this.state = {
         editorIsOpen: false,
      }
      this.toggleEditor = this.toggleEditor.bind(this)
   }

   toggleEditor() {
      this.setState({ editorIsOpen: !this.state.editorIsOpen })
   }
   render() {
      return (
         <Col sm="6" md="4" lg="3" className="my-2">
            <Card>
               <CardBody>
                  <div className="d-flex justify-content-between mb-2">
                     <div className="d-flex">
                        <div className="characterIcon mr-3">
                           {this.props.characterClass
                              ? handleCharacterIcon(this.props.characterClass)
                              : handleCharacterIcon(MONSTER)}
                        </div>
                        <div className="d-flex flex-column">
                           <CardTitle>{this.props.name}</CardTitle>
                           <CardSubtitle className="font-weight-lighter">
                              {this.props.playerName && this.props.playerName}{' '}
                              {this.props.size && this.props.size}{' '}
                              {this.props.type && titleCase(this.props.type)}
                           </CardSubtitle>
                        </div>
                     </div>
                     <div className="d-flex flex-column justify-content-start text-right ml-3 text-nowrap">
                        {this.props.armor_class && (
                           <span className="my-1">
                              {this.props.armor_class}
                              <FontAwesomeIcon
                                 icon="shield-alt"
                                 className="mt-1 ml-1"
                              />
                           </span>
                        )}
                        {this.props.initMod && (
                           <span className="my-1">
                              {this.props.initMod}
                              <FontAwesomeIcon
                                 icon="dice-d20"
                                 className="mt-1 ml-1"
                              />
                           </span>
                        )}
                     </div>
                  </div>
                  <HealthBar
                     className="my-3"
                     hit_points={this.props.hit_points}
                     current_hit_points={
                        this.props.tracker.current_hit_points &&
                        this.props.tracker.current_hit_points
                     }
                  />
                  <div className="d-flex justify-content-between py-2">
                     <Badge color="secondary">Status</Badge>
                     <Badge color="secondary">Reaction Used</Badge>
                     <Badge color="secondary">Concentrating</Badge>
                  </div>
                  <div className="float-right">
                     <FontAwesomeIcon
                        className="mr-2"
                        icon="edit"
                        onClick={this.toggleEditor}
                     />
                     <FontAwesomeIcon
                        icon="times"
                        onClick={this.props.removeFromTracker}
                     />
                  </div>
               </CardBody>
            </Card>
            <Modal isOpen={this.state.editorIsOpen} toggle={this.toggleEditor}>
               <CharacterEditor
                  closeModal={this.toggleEditor}
                  {...this.props}
               />
            </Modal>
         </Col>
      )
   }
}

const mapDispatchToProps = (dispatch, ownProps) => {
   return {
      removeFromTracker: () =>
         dispatch({
            type: actionTypes.REMOVE_FROM_TRACKER,
            id: ownProps.id,
         }),
   }
}

export default connect(
   null,
   mapDispatchToProps
)(CharacterCard)
