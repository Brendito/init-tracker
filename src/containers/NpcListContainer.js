import React, { Component } from "react";
import NpcList from "../components/NpcList/NpcList";

class NpcListContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.handleFilterChange = this.handleFilterChange.bind(this);
  }

  componentDidMount() {
    this.setState({ filteredList: this.props.npcs });
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ filteredList: nextProps.npcs });
  }

  handleFilterChange(searchFilter, ratingFilter, dataFilter) {
    const filteredNPCs = this.props.npcs.filter(npc => {
      // All filtered
      if (searchFilter !== "" && ratingFilter !== "" && dataFilter !== "") {
        return (
          npc.name.toLowerCase().search(searchFilter.toLowerCase()) !== -1 &&
          npc.challenge_rating === ratingFilter &&
          npc.dataType === dataFilter
        );
        // Search only
      } else if (
        searchFilter !== "" &&
        ratingFilter === "" &&
        dataFilter === ""
      ) {
        return npc.name.toLowerCase().search(searchFilter.toLowerCase()) !== -1;
      }
      // Rating Only
      else if (
        searchFilter === "" &&
        ratingFilter !== "" &&
        dataFilter === ""
      ) {
        return npc.challenge_rating === ratingFilter;
      }
      // Data Only
      else if (
        searchFilter === "" &&
        ratingFilter === "" &&
        dataFilter !== ""
      ) {
        return npc.dataType === dataFilter;
      }
      // Rating and Data
      else if (
        searchFilter === "" &&
        ratingFilter !== "" &&
        dataFilter !== ""
      ) {
        return (
          npc.dataType === dataFilter && npc.challenge_rating === ratingFilter
        );
      }
      // Search and Data
      else if (
        searchFilter !== "" &&
        ratingFilter === "" &&
        dataFilter !== ""
      ) {
        return (
          npc.dataType === dataFilter &&
          npc.name.toLowerCase().search(searchFilter.toLowerCase()) !== -1
        );
      }
      // Search and Rating
      else if (
        searchFilter !== "" &&
        ratingFilter !== "" &&
        dataFilter === ""
      ) {
        return (
          npc.challenge_rating === ratingFilter &&
          npc.name.toLowerCase().search(searchFilter.toLowerCase()) !== -1
        );
      } else {
        return npc;
      }
    });
    this.setState({ filteredList: filteredNPCs });
  }

  render() {
    return (
      <NpcList
        npcs={this.state.filteredList}
        loadNpc={this.props.loadNpc}
        className={this.props.className}
        onFilterChange={this.handleFilterChange}
      />
    );
  }
}

export default NpcListContainer;
