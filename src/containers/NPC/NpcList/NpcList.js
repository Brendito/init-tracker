import React, { Component } from 'react'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { NavLink } from 'react-router-dom'
import * as routes from '../../../constants/routes'
import { titleCase, slugify } from '../../../utils/utils'
import { ListGroup, ListGroupItem, Modal, Button } from 'reactstrap'
import withSizes from 'react-sizes'
import { mapSizesToProps } from '../../../hoc/screenSizes'
import npcData from '../../../assets/data/npcData'
import ListFilter from '../../../components/ListFilter/ListFilter'
import StatBlock from '../../../components/StatBlock/StatBlock'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import './styles.css'

let templates = npcData

class NpcList extends Component {
   constructor(props) {
      super(props)
      this.state = {
         npcs: [],
         filteredList: [],
         preview: {
            modal: false,
            npc: {},
         },
      }
   }

   componentDidMount = () => {
      const allNpcs = [].concat(...this.props.npcs, ...templates)
      allNpcs.sort(function(a, b) {
         if (a.name.toLowerCase() < b.name.toLowerCase()) {
            return -1
         }
         if (a.name.toLowerCase() > b.name.toLowerCase()) {
            return 1
         }
         return 0
      })
      this.setState({
         npcs: [...allNpcs],
      })
   }

   handleFilterChange = filteredList => {
      if (filteredList.length !== this.state.npcs.length) {
         this.setState({
            filteredList: [...filteredList],
         })
      } else {
         this.setState({
            filteredList: [],
         })
      }
   }

   handleViewNpc = e => {
      const id =
         e.target.dataset.id !== undefined
            ? e.target.dataset.id
            : e.target.parentNode.dataset.id
      const copiedNpc = [...this.state.npcs].find(npc => {
         return String(npc.id) === String(id)
      })
      if (!this.props.isDesktop) {
         this.setState({
            preview: {
               ...this.state.preview,
               modal: true,
               npc: { ...copiedNpc },
            },
         })
      } else {
         this.props.viewListener(copiedNpc)
      }
   }

   toggleModal = () => {
      this.setState({
         preview: {
            ...this.state.preview,
            modal: !this.state.preview.modal,
            npc: {},
         },
      })
   }

   render() {
      return (
         <div>
            <ListFilter
               npcs={[...this.state.npcs]}
               listener={this.handleFilterChange}
            />
            <ListGroup>
               {this.state.filteredList &&
                  this.state.filteredList.length > 0 &&
                  this.state.filteredList.map((npc, i) => {
                     return (
                        <ListGroupItem className="my-1" key={i}>
                           <div className="d-flex justify-content-between">
                              <div className="d-flex flex-column ">
                                 <h6 className="font-weight-bold">
                                    {npc.name}
                                 </h6>
                                 <span>
                                    CR ({npc.challenge_rating}) -{' '}
                                    <span className="font-weight-light">
                                       {npc.xp} xp
                                    </span>
                                 </span>
                                 <span>
                                    {npc.size} {titleCase(npc.type)}
                                 </span>
                              </div>
                              <div className="d-flex flex-column justify-content-between text-right">
                                 <NavLink
                                    to={{
                                       pathname: `${routes.NPC_FORM}${slugify(
                                          npc.name
                                       )}`,
                                       state: {
                                          npc: {
                                             ...npc,
                                             characterType: this.props.location
                                                .state.characterType,
                                          },
                                       },
                                    }}>
                                    <div className="d-flex justify-content-end align-items-center">
                                       <span className="font-weight-lighter cardtext cursor-pointer">
                                          Copy
                                       </span>
                                       <FontAwesomeIcon
                                          icon="copy"
                                          className="ml-1 mt-1 cursor-pointer"
                                       />
                                    </div>
                                 </NavLink>
                                 <div className="d-flex justify-content-end align-items-center">
                                    <span
                                       data-id={npc.id}
                                       onClick={this.handleViewNpc}
                                       className="font-weight-lighter cardtext cursor-pointer">
                                       Preview
                                    </span>
                                    <FontAwesomeIcon
                                       icon="search"
                                       className="ml-1 mt-1 cursor-pointer"
                                       data-id={npc.id}
                                       onClick={this.handleViewNpc}
                                    />
                                 </div>

                                 <span className="font-weight-lighter text-right cardtext cursor-none">
                                    {npc.dataType}
                                 </span>
                              </div>
                           </div>
                        </ListGroupItem>
                     )
                  })}
               {this.state.filteredList &&
                  this.state.filteredList.length === 0 && (
                     <div className="p-1">
                        <hr />
                        <span className="font-weight-bold d-block">
                           Search or filter your available NPCs to use
                        </span>
                        <span className="font-weight-light">
                           You have the option of using any of the NPCs provided
                           by Wizards of the Coast in the DnD 5e SRD.
                        </span>
                        <hr />
                     </div>
                  )}
            </ListGroup>
            <Modal isOpen={this.state.preview.modal} toggle={this.toggleModal}>
               <div className="p-2">
                  <StatBlock npc={this.state.preview.npc} modal={true} />
                  <div className="d-flex justify-content-end mb-3">
                     <NavLink
                        to={{
                           pathname: `${routes.NPC_FORM}${this.state.preview.npc
                              .name && slugify(this.state.preview.npc.name)}`,
                           state: {
                              npc: {
                                 ...this.state.preview.npc,
                                 characterType: this.props.location.state
                                    .characterType,
                              },
                           },
                        }}>
                        <Button className="mr-3" color="success">
                           Use as Template
                        </Button>
                     </NavLink>
                     <Button color="warning" onClick={this.toggleModal}>
                        Close
                     </Button>
                  </div>
               </div>
            </Modal>
         </div>
      )
   }
}

const mapStateToProps = state => ({
   npcs: state.saved.npcs,
})

export default compose(
   connect(mapStateToProps),
   withSizes(mapSizesToProps)
)(NpcList)
