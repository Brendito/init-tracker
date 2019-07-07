import React from 'react'
import { connect } from 'react-redux'
import { clearCampaign } from '../../actions/loadedActions'
import { NavLink as RRNavlink } from 'react-router-dom'
import {
   Collapse,
   Navbar,
   NavbarToggler,
   NavbarBrand,
   Nav,
   NavLink,
   NavItem,
   UncontrolledDropdown,
   DropdownToggle,
   DropdownMenu,
   DropdownItem,
} from 'reactstrap'
import * as paths from '../../constants/routes'

class NavigationBar extends React.Component {
   constructor(props) {
      super(props)
      this.state = {
         navBarIsOpen: false,
      }
   }
   toggle = () => {
      this.setState({
         navBarIsOpen: !this.state.navBarIsOpen,
      })
   }
   clear = () => {
      this.props.clearCampaign()
   }
   render() {
      return (
         <div className="mb-4 sticky-top">
            <Navbar color="dark" dark expand="md">
               {this.props.campaign !== undefined ? (
                  <NavbarBrand tag={RRNavlink} to={paths.CAMPAIGN_BUILDER}>
                     {this.props.campaign.campaignName}
                  </NavbarBrand>
               ) : (
                  <NavbarBrand href="/">DnD 5e - Tracker</NavbarBrand>
               )}
               <NavbarToggler onClick={this.toggle} />
               <Collapse isOpen={this.state.navBarIsOpen} navbar>
                  {this.props.campaign && this.props.campaign.id && (
                     <Nav className="ml-auto" navbar>
                        <NavItem>
                           <NavLink tag={RRNavlink} to={paths.NPC_PAGE}>
                              Saved NPCs
                           </NavLink>
                        </NavItem>
                        <NavItem>
                           <NavLink tag={RRNavlink} to={paths.PLAYER_PAGE}>
                              Saved Players
                           </NavLink>
                        </NavItem>
                        <NavItem>
                           <NavLink tag={RRNavlink} to={paths.ENCOUNTERS_PAGE}>
                              Saved Encounters
                           </NavLink>
                        </NavItem>
                        <UncontrolledDropdown nav inNavbar>
                           <DropdownToggle nav caret>
                              Account
                           </DropdownToggle>
                           <DropdownMenu right>
                              <DropdownItem>Settings</DropdownItem>
                              <DropdownItem>Profile</DropdownItem>
                              <DropdownItem divider />
                              <NavLink tag={RRNavlink} to={paths.LANDING_PAGE}>
                                 <DropdownItem onClick={this.clear}>
                                    {' '}
                                    Switch Campaign
                                 </DropdownItem>
                              </NavLink>
                           </DropdownMenu>
                        </UncontrolledDropdown>
                     </Nav>
                  )}
               </Collapse>
            </Navbar>
         </div>
      )
   }
}

const mapStateToProps = state => ({
   campaign: state.loaded,
})

const mapDispatchToProps = dispatch => {
   return {
      clearCampaign: () => dispatch(clearCampaign()),
   }
}

export default connect(
   mapStateToProps,
   mapDispatchToProps
)(NavigationBar)
