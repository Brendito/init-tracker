import React, { Component } from 'react'
import { connect } from 'react-redux'
import classnames from 'classnames'
import { addToTracker } from '../../../../actions/trackerActions'
import { TabContent, TabPane, Nav, NavItem, NavLink, Button } from 'reactstrap'
import * as charTypes from '../../../../constants/characterTypes'
import { sortByName } from '../../../../utils/utils'
import AddPlayers from './AddPlayers/AddPlayers'
import AddNpc from './AddNpc/AddNpc'

class AddCharacters extends Component {
   constructor(props) {
      super(props)

      this.state = {
         activeTab: '1',
         list: [...this.props.list],
         hostiles: [],
         npcs: [],
         players: [],
         friendly: [],
      }
   }

   componentDidMount = () => {
      this.setState(
         {
            hostiles: [
               ...this.props.list.filter(
                  char => char.characterType === charTypes.HOSTILE_NPC
               ),
            ],
            npcs: [
               ...this.props.list.filter(
                  char => char.characterType === charTypes.FRIENDLY_NPC
               ),
            ],
            players: [
               ...this.props.list.filter(
                  char => char.characterType === charTypes.PC
               ),
            ],
         },
         this.setState({
            friendly: sortByName([...this.state.npcs, ...this.state.players]),
         })
      )
   }

   toggleTabs = tab => {
      if (this.state.activeTab !== tab) {
         this.setState({
            activeTab: tab,
         })
      }
   }

   handleAddToList = (list, characterType) => {
      switch (characterType) {
         case charTypes.PC:
            console.log('playerlsit', list)
            return this.setState({
               players: [...list],
               friendly: [...sortByName([...this.state.npcs, ...list])],
            })
         case charTypes.FRIENDLY_NPC:
            return this.setState({
               npcs: [...list],
               friendly: [...sortByName([...this.state.players, ...list])],
            })
         default:
            return null
      }
   }

   addCharactersToTracker = () => {
      const npcs = [...this.state.npcs, ...this.state.hostiles];
      npcs.forEach((el, i) => {
         el.listId = i;
      })
      this.props.addToTracker(
         sortByName([...npcs, ...this.state.players])
      )
      this.props.toggle()
   }

   render() {
      return (
         <div className="p-3">
            <h5>Add Characters to Encounter</h5>
            <hr />
            <Nav tabs>
               <NavItem>
                  <NavLink
                     className={classnames({
                        active: this.state.activeTab === '1',
                     })}
                     onClick={() => {
                        this.toggleTabs('1')
                     }}>
                     Players
                  </NavLink>
               </NavItem>
               <NavItem>
                  <NavLink
                     className={classnames({
                        active: this.state.activeTab === '2',
                     })}
                     onClick={() => {
                        this.toggleTabs('2')
                     }}>
                     Friendly Npc
                  </NavLink>
               </NavItem>
               <NavItem>
                  <NavLink
                     className={classnames({
                        active: this.state.activeTab === '3',
                     })}
                     onClick={() => {
                        this.toggleTabs('3')
                     }}>
                     Hostile Npc
                  </NavLink>
               </NavItem>
            </Nav>
            <TabContent activeTab={this.state.activeTab}>
               <TabPane tabId="1">
                  <AddPlayers
                     characterType={charTypes.PC}
                     listener={this.handleAddToList}
                  />
               </TabPane>
               <TabPane tabId="2">
                  <AddNpc
                     listener={this.handleAddToList}
                     characterType={charTypes.FRIENDLY_NPC}
                  />
               </TabPane>
               <TabPane tabId="3">
                  <AddNpc characterType={charTypes.HOSTILE_NPC} />
               </TabPane>
            </TabContent>
            <hr />
            <Button color="primary" onClick={this.addCharactersToTracker}>
               Save
            </Button>
         </div>
      )
   }
}

const mapStateToProps = state => ({
   players: state.loaded.players,
   npcs: state.saved.npcs,
   list: state.tracker.list,
})

const mapDispatchToProps = dispatch => {
   return {
      addToTracker: characters => dispatch(addToTracker(characters)),
   }
}

export default connect(
   mapStateToProps,
   mapDispatchToProps
)(AddCharacters)
