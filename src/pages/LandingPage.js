import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { v4 } from 'node-uuid'
import { createCampaign, loadCampaign } from '../actions/savedActions'
import { clearCampaign } from '../actions/loadedActions'
import * as paths from '../constants/routes'
import {
   Container,
   Jumbotron,
   Button,
   ListGroup,
   ListGroupItem,
   Modal,
   Form,
   FormGroup,
   Input,
   Label,
} from 'reactstrap'

class LandingPage extends Component {
   constructor(props) {
      super(props)
      this.state = {
         ...this.state,
         createNewCampaignModalIsOpen: false,
      }
   }

   toggleCampaignCreateModal = () => {
      this.setState({
         ...this.state,
         createNewCampaignModalIsOpen: !this.state.createNewCampaignModalIsOpen,
         campaign: {
            players: [],
            encounters: [],
            id: v4(),
         },
      })
   }
   handleCreate = e => {
      e.preventDefault()
      this.toggleCampaignCreateModal()
      this.props.createCampaign(this.state.campaign)
   }

   handleChange = e => {
      const value = e.target.value
      const name = e.target.name
      this.setState({
         ...this.state,
         campaign: {
            ...this.state.campaign,
            [name]: value,
         },
      })
   }

   render() {
      return (
         <Container>
            <Jumbotron>Init Tracker</Jumbotron>
            {this.props.campaigns && (
               <div>
                  <h3>Load Saved Campaign</h3>
                  <ListGroup>
                     {this.props.campaigns.map(campaign => {
                        return (
                           <Link key={campaign.id} to={paths.CAMPAIGN_BUILDER}>
                              <ListGroupItem
                                 data-id={campaign.id}
                                 onClick={() =>
                                    this.props.loadCampaign(campaign)
                                 }>
                                 {campaign.campaignName}
                              </ListGroupItem>
                           </Link>
                        )
                     })}
                  </ListGroup>
               </div>
            )}

            <Button onClick={this.toggleCampaignCreateModal}>
               Create A New Campaign
            </Button>
            <Modal
               isOpen={this.state.createNewCampaignModalIsOpen}
               toggle={this.toggleCampaignCreateModal}>
               <Form className="p-3" onSubmit={this.handleCreate}>
                  <h3>Create New Campaign</h3>
                  <FormGroup>
                     <Label for="campaignName">Campaign Name</Label>
                     <Input
                        type="text"
                        name="campaignName"
                        id="campaignName"
                        placeholder=""
                        onChange={this.handleChange}
                     />
                     <Button className="mt-3" type="submit">
                        Save
                     </Button>
                  </FormGroup>
               </Form>
            </Modal>
         </Container>
      )
   }
}

const mapStateToProps = state => ({
   campaigns: [...state.saved.campaigns],
   loaded: { ...state.loaded },
})

const mapDispatchToProps = dispatch => {
   return {
      loadCampaign: campaignId => dispatch(loadCampaign(campaignId)),
      createCampaign: campaign => dispatch(createCampaign(campaign)),
   }
}

export default connect(
   mapStateToProps,
   mapDispatchToProps
)(LandingPage)
