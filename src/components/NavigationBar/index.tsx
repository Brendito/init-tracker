import React from "react";
import { connect } from "react-redux";
import { NavLink as RRNavlink } from "react-router-dom";
import {
  Collapse,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Nav,
  Navbar,
  NavbarBrand,
  NavbarToggler,
  NavItem,
  NavLink,
  UncontrolledDropdown
} from "reactstrap";
import * as Redux from "redux";
import { bindActionCreators } from "redux";
import { loadedActionCreators, LoadedActionCreators } from "../../actions";
import routes from "../../constants/routes";
import { Campaign } from "../../models";

interface Props {
  campaign: Campaign;
}

interface DispatchProps {
  loadedActions: LoadedActionCreators;
}

class NavigationBar extends React.Component<Props & DispatchProps, {}> {
  state = {
    navBarIsOpen: false
  };

  toggle = () => {
    this.setState({
      navBarIsOpen: !this.state.navBarIsOpen
    });
  };

  clear = () => {
    this.props.loadedActions.clearCampaign();
  };

  render() {
    return (
      <div className="mb-4 sticky-top">
        <Navbar color="dark" dark expand="md">
          {this.props.campaign !== undefined ? (
            <NavbarBrand tag={RRNavlink} to={routes.campaignBuilder}>
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
                  <NavLink tag={RRNavlink} to={routes.npcPage}>
                    Saved NPCs
                  </NavLink>
                </NavItem>

                <NavItem>
                  <NavLink tag={RRNavlink} to={routes.playerPage}>
                    Saved Players
                  </NavLink>
                </NavItem>

                <NavItem>
                  <NavLink tag={RRNavlink} to={routes.encountersPage}>
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
                    <NavLink tag={RRNavlink} to={routes.landingPage}>
                      <DropdownItem onClick={this.clear}>
                        {" "}
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
    );
  }
}

const mapStateToProps = (state: any) => ({
  campaign: state.loaded
});

const mapDispatchToProps = (dispatch: Redux.Dispatch<Redux.AnyAction>) => {
  return {
    loadedActions: bindActionCreators(loadedActionCreators, dispatch)
  };
};

export default connect<Props, DispatchProps, {}>(
  mapStateToProps,
  mapDispatchToProps
)(NavigationBar);
