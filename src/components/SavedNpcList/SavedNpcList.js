import React, { Component } from "react";
import { connect } from "react-redux";
import { ListGroup } from "reactstrap";
import * as charTypes from "../../constants/characterTypes";
import SavedNpcListCard from "./SavedNpcListCard/SavedNpcListCard";

class SavedNpcList extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.handleMsg = this.handleMsg.bind(this);
  }

  handleMsg() {
    switch (this.props.characterType) {
      case charTypes.FRIENDLY_NPC:
        return charTypes.FRIENDLY_NPC_MSG;
      case charTypes.HOSTILE_NPC:
        return charTypes.HOSTILE_NPC_MSG;
      default:
        return "Unknown Error";
    }
  }

  render() {
    return (
      <div>
        <h4>{this.handleMsg()}s</h4>
        <ListGroup>
          {this.props.charList &&
            this.props.charList.map(npc => {
              if (
                this.props.characterType === charTypes.FRIENDLY_NPC &&
                npc.characterType === charTypes.FRIENDLY_NPC
              ) {
                return <SavedNpcListCard editNpc={this.props.editNpc} key={npc.id} {...npc} />;
              } else if (
                this.props.characterType === charTypes.HOSTILE_NPC &&
                npc.characterType === charTypes.HOSTILE_NPC
              ) {
                return <SavedNpcListCard editNpc={this.props.editNpc} key={npc.id} {...npc} />;
              }
            })}
        </ListGroup>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    charList: state.campaign.loadedCampaign.characters.npcs
  };
};

export default connect(mapStateToProps)(SavedNpcList);
