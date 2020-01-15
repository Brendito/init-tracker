import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { Component } from "react";
import { connect } from "react-redux";
import { Button, ListGroup, ListGroupItem } from "reactstrap";
import ListFilter from "../../../../components/ListFilter";
import characterTypes from "../../../../constants/characterTypes";
import { getModifier } from "../../../../utils/utils";
import "./styles.css";
import { Npc } from "../../../../models";

interface Props {
  addToEncounter: (list: Array<Npc>) => void;
  toggle: () => void;
  list: Array<Npc>;
  npcs: Array<Npc>;
}

class AddFromSavedNPCs extends Component<Props> {
  state = {
    list: [...this.props.list],
    filteredList: [...this.props.npcs]
  };

  handleFilterChange = (filtered: Array<Npc>) => {
    this.setState({
      filteredList: [...filtered]
    });
  };

  addToEncounter = (e: React.ChangeEvent<any>) => {
    let id = e.target.dataset.id;
    const npclist = ([] as Array<Npc>).concat(this.props.npcs);
    const addedNPC = { ...npclist.find(npc => npc.id === id) };
    this.setState({
      list: [...this.state.list, addedNPC]
    });
  };

  removeFromEncounter = (e: React.ChangeEvent<any>) => {
    let id = e.target.dataset.id;
    const ogList = [...this.state.list];
    const filtered = [...this.state.list].filter((npc: Npc) => npc.id === id);
    filtered.forEach(f =>
      ogList.splice(
        ogList.findIndex(e => e.id === f.id),
        1
      )
    );
    filtered.splice(0, 1);
    this.setState({ list: [...ogList, ...filtered] });
  };

  totalNPC = (id: string) => {
    const num = this.state.list.filter((npc: Npc) => npc.id === id);
    return num.length;
  };

  saveEncounter = () => {
    const savedList = ([] as Array<Npc>).concat(this.state.list);
    savedList.sort((a, b) => {
      if (a.name < b.name) {
        return -1;
      }
      if (a.name > b.name) {
        return 1;
      }
      return 0;
    });
    savedList.forEach((el, i) => {
      el.listId = i;
      (el.initMod = Number(getModifier(el.dexterity))),
        (el.tracker = {
          current_hit_points: el.hit_points,
          initTotal: 0,
          inTracker: true
        });
    });
    this.props.addToEncounter(savedList);
    this.props.toggle();
  };

  render() {
    return (
      <div className="p-3">
        <p className="font-weight-bold mb-1">Add From Saved NPCS:</p>
        <hr />
        <ListFilter
          npcs={this.props.npcs}
          listener={this.handleFilterChange}
          saved={true}
        />
        <hr className="mt-1" />
        <ListGroup>
          {this.state.filteredList &&
            this.state.filteredList.map((npc: Npc) => {
              return (
                <ListGroupItem key={npc.id}>
                  <div className="d-flex justify-content-between align-content-center">
                    <div>
                      <span className="d-block font-weight-bold">
                        {npc.name}
                      </span>
                      <span className="font-weight-light">
                        CR {npc.challenge_rating} - (
                        <span className="font-italic">{npc.xp}xp</span>)
                      </span>
                    </div>
                    <div>
                      <div className="d-flex justify-content-between flex-column">
                        <span data-id={npc.id} onClick={this.addToEncounter}>
                          <FontAwesomeIcon icon="plus" />
                        </span>
                        <span className="font-weight-bolder my-2 totalNPC">
                          {this.totalNPC(npc.id)}
                        </span>
                        <span
                          data-id={npc.id}
                          onClick={this.removeFromEncounter}
                        >
                          <FontAwesomeIcon icon="minus" />
                        </span>
                      </div>
                    </div>
                  </div>
                </ListGroupItem>
              );
            })}
        </ListGroup>
        <hr />
        <Button color="primary" onClick={this.saveEncounter}>
          Save
        </Button>
      </div>
    );
  }
}

const mapStateToProps = (state: any, ownProps: any) => ({
  npcs: state.saved.npcs.filter(
    (npc: Npc) =>
      npc.characterType === ownProps.characterType || characterTypes.HOSTILE_NPC
  )
});

export default connect<{}, Props>(mapStateToProps)(AddFromSavedNPCs);
