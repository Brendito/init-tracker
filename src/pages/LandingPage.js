import React, { Component } from 'react'
import { connect } from 'react-redux'
import { v4 } from 'node-uuid'
import {
   createCampaign,
   loadCampaign,
   clearCampaign,
} from '../actions/campaignActions'
import { Redirect } from 'react-router-dom'
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
         directToBuilder: false,
         createNewCampaignModalIsOpen: false,
      }

      this.loadCampaignToBuilder = this.loadCampaignToBuilder.bind(this)
      this.toggleCampaignCreateModal = this.toggleCampaignCreateModal.bind(this)
      this.handleChange = this.handleChange.bind(this)
      this.handleCreate = this.handleCreate.bind(this)
   }

   componentDidMount() {
      this.props.clearCampaign()
   }

   loadCampaignToBuilder(event) {
      const campId = event.target.getAttribute('data-id')
      if (campId === null) {
         return null
      } else {
         this.props.loadCampaign(campId)
         this.setState({ ...this.state, directToBuilder: true })
      }
   }
   toggleCampaignCreateModal(event) {
      this.setState({
         ...this.state,
         createNewCampaignModalIsOpen: !this.state.createNewCampaignModalIsOpen,
      })
   }
   handleCreate(e) {
      e.preventDefault()
      this.toggleCampaignCreateModal()
      this.props.createCampaign(this.state.campaign)
   }

   handleChange(event) {
      const target = event.target
      const value =
         target.type === 'number' ? Number(target.value) : target.value
      const name = target.name
      this.setState({
         ...this.state,
         directToBuilder: false,
         campaign: {
            ...this.state.campaign,
            campaignName: '',
            encounters: [],
            characters: {
               players: [],
               npcs: [],
               enemies: [],
            },
            id: v4(),
            [name]: value,
         },
      })
   }

   render() {
      if (this.state.directToBuilder) {
         return <Redirect push to={paths.CAMPAIGN_BUILDER} />
      }
      return (
         <Container>
            <Jumbotron>Init Tracker</Jumbotron>
            {this.props.savedCampaigns && (
               <div>
                  <h3>Load Saved Campaign</h3>
                  <ListGroup>
                     {this.props.savedCampaigns.map(campaign => {
                        return (
                           <ListGroupItem
                              key={campaign.id}
                              data-id={campaign.id}
                              onClick={this.loadCampaignToBuilder}>
                              {campaign.campaignName}
                           </ListGroupItem>
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

const mapStateToProps = state => {
   return { savedCampaigns: [...state.campaign.savedCampaigns] }
}

const mapDispatchToProps = dispatch => {
   return {
      loadCampaign: campaignId => dispatch(loadCampaign(campaignId)),
      createCampaign: campaign => dispatch(createCampaign(campaign)),
      clearCampaign: campaignId => dispatch(clearCampaign(campaignId)),
   }
}

export default connect(
   mapStateToProps,
   mapDispatchToProps
)(LandingPage)
