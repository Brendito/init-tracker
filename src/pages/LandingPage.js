import React, { Component } from "react";
import { Container, Jumbotron, Button } from "reactstrap";
import {Link} from 'react-router-dom';      


class LandingPage extends Component {
  state = {};
  render() {
    return (
      <Container>
        <Jumbotron>Init Tracker</Jumbotron>
        <Link to="/campaignmanager"><Button>Check it</Button></Link>
      </Container>
    );
  }
}


export default LandingPage;
