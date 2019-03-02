import React, { Component } from "react";
import {
  Container,
  ListGroup,
  ListGroupItem,
  Input,
  Button,
  FormGroup,
  Label
} from "reactstrap";
import { challengeRatings } from "../../constants/npcInformation";
import "../style.css";

function titleCase(str) {
  return str
    .toLowerCase()
    .split(" ")
    .map(function(word) {
      return word.replace(word[0], word[0].toUpperCase());
    })
    .join(" ");
}

class NpcList extends Component {
  constructor(props) {
    super(props);
  }

  handleFilterChange = () => {
    var searchFilter = document
      .getElementById("searchFilter")
      .value.toLowerCase();
    var ratingFilter = document.getElementById("ratingFilter").value;
    var dataFilter = document.getElementById("dataFilter").value;
    this.props.onFilterChange(searchFilter, ratingFilter, dataFilter);
  };

  handleLoadNpc = e => {
    this.props.loadNpc(e.target.dataset.id);
  };

  render() {
    return (
      <Container className={this.props.className}>
        <div className="d-flex justify-content-between">
          <FormGroup>
            <Label for="searchFilter">Search</Label>
            <Input
              id="searchFilter"
              onChange={this.handleFilterChange}
              placeholder="Search for NPC"
            />
          </FormGroup>
          <FormGroup>
            <Label for="ratingFilter">Challenge Rating</Label>
            <Input
              id="ratingFilter"
              type="select"
              onChange={this.handleFilterChange}
            >
              <option value="">Any</option>
              {challengeRatings.map(cr => {
                return <option key={cr.rating}>{cr.rating}</option>;
              })}
            </Input>
          </FormGroup>
          <FormGroup>
            <Label for="dataFilter">Data Source</Label>
            <Input
              type="select"
              id="dataFilter"
              onChange={this.handleFilterChange}
            >
              <option value="">All</option>
              <option value="SRD">5e SRD</option>
              <option value="Custom">Custom</option>
            </Input>
          </FormGroup>
        </div>
        <ListGroup>
          {this.props.npcs &&
            this.props.npcs.map((npc, i) => {
              return (
                <ListGroupItem key={i}>
                  <div className="d-flex">
                    <div className="d-flex flex-column">
                      <h3>{npc.name}</h3>
                      <h5>
                        {npc.size} {titleCase(npc.type)}
                      </h5>
                    </div>
                    <p>{npc.dataType}</p>
                  </div>
                  <Button
                    href="#"
                    onClick={this.handleLoadNpc}
                    data-id={npc.id}
                  >
                    Clone
                  </Button>
                </ListGroupItem>
              );
            })}
        </ListGroup>
      </Container>
    );
  }
}

export default NpcList;
