import React, { Component } from "react";
import { connect } from "react-redux";
import CharCard from "./CharCard/CharCard";
import { Row } from "reactstrap";

class Tracker extends Component {
  render() {
    return (
      <div>
        <Row>
          {this.props.list.map(char => {
            return <CharCard key={char.key} char={char} />;
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
