import React, { Component } from "react";
import * as paths from '../constants/routes'
import { Container, Jumbotron, Button, ListGroup, ListGroupItem } from "reactstrap";
import {Link} from 'react-router-dom';      


class LandingPage extends Component {
  state = {};
  render() {
    return (
      <Container>
        <Jumbotron>Init Tracker</Jumbotron>
        <Link to={paths.CAMPAIGN_BUILDER}><Button>Create New Campaign</Button></Link>
      </Container>
    );
  }
}


export default LandingPage;
