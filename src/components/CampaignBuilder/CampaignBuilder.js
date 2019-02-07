import React, { Component } from "react";
import {connect} from 'react-redux'
import {
  Container,
  Jumbotron,
  Form,
  FormGroup,
  Input,
  Button,
  Label
} from "reactstrap";


class CampaignBuilder extends Component {
  constructor(props) {
    super(props);
    this.state = {
      campaignName : "",
      id: 0,
      encounters: [
        {
          name: "",
          id: 0,
          list: []
        }
      ],
      characters: {
        players: [],
        npcs: [],
        enemies: []
      }
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    const target = event.target;
    const value =
      target.type === "number" ? Number(target.value) : target.value;
    const name = target.name;
    this.setState({
      [name]: value
    });
  }

  render() {
    return (
      <Container>
        <Jumbotron>Campaign Builder</Jumbotron>
        <h4>Create a New Campaign</h4>
        <Form>
          <FormGroup>
            <Label for="campaignName">Campaign Name</Label>
            <Input
              type="text"
              name="campaignName"
              id="campaignName"
              placeholder=""
              onChange={this.handleChange}
            />
          </FormGroup>
        </Form>
      </Container>
    );
  }
}

const mapStateToProps = (state) => {
    
}

export default connect()(CampaignBuilder);
