import React, { Component } from "react";
import { FormGroup, Input, Label } from "reactstrap";
import { challengeRatings } from "../../constants/npcInformation";
import { Npc } from "../../models";
import { npcFilter } from "../../utils/utils";

interface Props {
  listener: (list: Array<Npc>) => void;
  saved: boolean;
  npcs: Array<Npc>;
}

export default class ListFilter extends Component<Props> {
  handleFilterChange = () => {
    var searchFilter = (document as HTMLDocument).getElementById(
      "searchFilter"
    ) as HTMLInputElement;

    var ratingFilter = (document as HTMLDocument).getElementById(
      "ratingFilter"
    ) as HTMLInputElement;

    var data = (document as HTMLDocument).getElementById(
      "dataFilter"
    ) as HTMLInputElement;

    var dataFilter = this.props.saved ? "" : data.value;

    this.props.listener(
      npcFilter(
        this.props.npcs,
        searchFilter.value.toLowerCase(),
        ratingFilter.value,
        dataFilter
      )
    );
  };
  render() {
    return (
      <div className="d-flex justify-content-between">
        <FormGroup>
          <Label for="searchFilter" className="font-weight-light">
            Search
          </Label>
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

        {!this.props.saved && (
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
        )}
      </div>
    );
  }
}
