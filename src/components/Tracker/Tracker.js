import React, { Component } from "react";
import { connect } from "react-redux";
import CharacterCard from "./CharacterCard/CharacterCard";
import { Row } from "reactstrap";

class Tracker extends Component {
  render() {
    return (
      <div>
        <Row>
          {this.props.list.map(char => {
            return <CharacterCard key={char.id} {...char} />;
          })}
        </Row>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return { list: state.tracker.list };
};

export default connect(mapStateToProps)(Tracker);
