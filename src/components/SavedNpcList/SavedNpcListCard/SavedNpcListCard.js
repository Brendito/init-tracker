import React, { Component } from "react";
import { ListGroupItem } from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

class SavedNpcListCard extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  handleEditNpc = (e) => {
    const id = e.target.dataset.id !== undefined ? e.target.dataset.id : e.target.parentNode.dataset.id;
    this.props.editNpc(id)
  }
  render() {
    return (
      <ListGroupItem>
        <div className="d-flex justify-content-between">
          <div>
            <p className="font-weight-bold">{this.props.name}</p>
            <span className="font-italic">
              {this.props.size} {this.props.type}
            </span>
          </div>
          <div className="d-flex flex-column justify-content-around">
            <FontAwesomeIcon icon="edit" className="mt-1" data-id={this.props.id} onClick={this.handleEditNpc} />
            <FontAwesomeIcon
              icon="times"
              className="mt-1"
              onClick={this.handleDelete}
            />
          </div>
        </div>
      </ListGroupItem>
    );
  }
}

export default SavedNpcListCard;
