import React, { Component } from 'react'
import { Container, Col, Row } from 'reactstrap'
import { mapSizesToProps } from '../../../hoc/screenSizes'
import withSizes from 'react-sizes'
import NpcList from '../NpcList/NpcList'
import StatBlock from '../../../components/StatBlock/StatBlock'

class NpcTemplateList extends Component {
   constructor(props) {
      super(props)
      this.state = {
         npc: {},
      }
   }
   handleView = npc => {
      this.setState({
         npc: npc,
      })
   }

   render() {
      return (
         <Container fluid>
            <Row>
               <Col md={this.props.isDesktop ? '5' : '12'}>
                  <h4>Copy NPC Template</h4>
                  <hr />
                  <NpcList viewListener={this.handleView} {...this.props} />
               </Col>
               {this.props.isDesktop && (
                  <Col md="7">
                     {this.state.npc.id !== undefined && (
                        <StatBlock npc={this.state.npc} />
                     )}
                  </Col>
               )}
            </Row>
         </Container>
      )
   }
}

export default withSizes(mapSizesToProps)(NpcTemplateList)
