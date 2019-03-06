import React, { Component } from 'react';
import {Container, Jumbotron} from "reactstrap"
import NpcContainer from '../containers/NpcContainer';

class NpcPage extends Component {
    state = {  }
    render() {
        return (
            <Container fluid>
                <Jumbotron><h3>NPC Manager Or Whatever</h3></Jumbotron>
                <NpcContainer/>
            </Container>

         );
    }
}

export default NpcPage;