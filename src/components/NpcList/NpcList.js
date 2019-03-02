import React, { Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
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
    const id =
      e.target.dataset.id !== undefined
        ? e.target.dataset.id
        : e.target.parentNode.dataset.id;
    this.props.loadNpc(id);
  };

  render() {
    return (
      <div className={this.props.className}>
        <div className="d-flex justify-content-between">
          <FormGroup>
            <Label for="searchFilter">Search</Label>
            <Input
              id="searchFilter"
              onChange={this.handleFilterChange}
              placeholder="NPC Name..."
            />
          </FormGroup>
          <FormGroup>
            <Label for="ratingFilter">CR</Label>
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
            <Label for="dataFilter">Source</Label>
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
                  <div className="d-flex justify-content-between">
                    <div className="d-flex flex-column ">
                      <h5>{npc.name}</h5>
                      <span>CR ({npc.challenge_rating})</span>
                      <span>
                        {npc.size} {titleCase(npc.type)}
                      </span>
                    </div>
                    <div className="d-flex flex-column justify-content-between">
                      <div className="text-right ">
                        <FontAwesomeIcon
                          icon="copy"
                          className="mt-1"
                          data-id={npc.id}
                          onClick={this.handleLoadNpc}
                        />
                      </div>
                      <span>{npc.dataType}</span>
                    </div>
                  </div>
                </ListGroupItem>
              );
            })}
        </ListGroup>
      </div>
    );
  }
}

export default NpcList;
