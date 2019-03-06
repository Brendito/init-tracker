import React, { Component } from 'react';
import {Container, Jumbotron} from "reactstrap"

class PlayerPage
 extends Component {
    state = {  }
    render() {
        return (
            <Container fluid>
                <Jumbotron><h3>Player Manager</h3></Jumbotron>
            </Container>

         );
    }
}

export default PlayerPage
;