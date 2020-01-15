import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import {
  Button,
  Card,
  CardBody,
  Col,
  Container,
  Input,
  Modal,
  Row
} from "reactstrap";
import { bindActionCreators } from "redux";
import { loadedActionCreators, LoadedActionCreators } from "../../../actions";
import routes from "../../../constants/routes";
import { Campaign, Encounter, Npc } from "../../../models";
import AddFromSavedNPCs from "./AddFromSavedNPCs";
import "./styles.css";

interface Props {
  loadedActions: LoadedActionCreators;
  encounter: Encounter;
  encounterId: string;
  campaign: Campaign;
  npcs: Array<Npc>;
}

class EncounterBuilder extends Component<Props> {
  state = {
    encounter: {
      ...this.props.encounter
    },
    campaign: {
      ...this.props.campaign
    },
    app: {
      savedAdd: false,
      templateAdd: false,
      editingEncounterName: false,
      newEncounterName: ""
    }
  };

  toggleSavedModal = () => {
    this.setState({
      app: { ...this.state.app, savedAdd: !this.state.app.savedAdd }
    });
  };

  toggleTemplateModal = () => {
    this.setState({
      app: { ...this.state.app, templateAdd: !this.state.app.templateAdd }
    });
  };

  toggleEditEncounter = () => {
    this.setState({
      app: {
        ...this.state.app,
        editingEncounterName: !this.state.app.editingEncounterName
      }
    });
  };

  handleEncounterName = (e: React.ChangeEvent<any>) => {
    this.setState({
      app: {
        ...this.state.app,
        newEncounterName: e.target.value
      }
    });
  };

  submitEncounterName = () => {
    const name = this.state.app.newEncounterName;
    this.setState({
      encounter: {
        ...this.state.encounter,
        name: name
      }
    });
    this.toggleEditEncounter();
  };

  handleAddToEncounter = (list: Array<Npc>) => {
    const newList = [...list];
    newList.forEach((npc: Npc) => {
      npc.tracker = {
        inTracker: true,
        current_hit_points: npc.hit_points,
        initTotal: 0
      };
    });
    this.setState({
      encounter: { ...this.state.encounter, list: [...newList] }
    });
  };

  deleteFromEncounter = (e: React.ChangeEvent<any>) => {
    let id = e.target.dataset.listid;
    this.setState({
      encounter: {
        ...this.state.encounter,
        list: this.state.encounter.list.filter(
          (npc: Npc) => npc.listId !== Number(id)
        )
      }
    });
  };

  saveEncounter = () => {
    const exp = this.encounterExp(this.state.encounter.list);
    const encounter = { ...this.state.encounter, totalExp: exp };
    const savedEncounters = this.state.campaign.encounters.filter(encounter => {
      return encounter.id !== this.props.encounterId;
    });

    this.setState(
      {
        campaign: {
          ...this.state.campaign,
          encounters: [encounter, ...savedEncounters]
        },
        app: { savedAdd: false, templateAdd: false }
      },
      this.props.loadedActions.saveEncounter(encounter)
    );
  };

  encounterExp = (arr: Array<Npc>) => {
    let experienceTotal = 0;
    arr.forEach((npc: Npc) => {
      return (experienceTotal += Number(npc.xp));
    });
    return experienceTotal;
  };

  render() {
    return (
      <Container fluid>
        <p className="font-weight-light mb-1">Editing Encounter:</p>
        {!this.state.app.editingEncounterName ? (
          <div className="d-flex justify-content-between">
            <h5 className="font-weight-bold mb-2">
              {this.state.encounter.name}
            </h5>
            <span onClick={this.toggleEditEncounter}>
              <FontAwesomeIcon icon="edit" className="mt-1" />
            </span>
          </div>
        ) : (
          <div className="mb-2">
            <Input
              className="mb-2"
              onChange={this.handleEncounterName}
              placeholder={this.state.encounter.name}
              onKeyPress={e => {
                if (e.key === "Enter") {
                  this.submitEncounterName();
                }
              }}
            />
            <Button
              onClick={this.submitEncounterName}
              className="mr-2"
              color="success"
            >
              Save
            </Button>
            <Button onClick={this.toggleEditEncounter} color="warning">
              Cancel
            </Button>
          </div>
        )}
        <hr className="mt-1 mb-3" />
        <div className="buttonbar">
          <span className="font-weight-light d-block">
            Add an NPC to the encounter:
          </span>
          <div className="d-flex justify-content-between my-2">
            <Button color="primary" onClick={this.toggleSavedModal}>
              Saved NPCs
            </Button>
            <Button color="primary" onClick={this.toggleTemplateModal}>
              Template NPCs
            </Button>
          </div>
        </div>

        {this.state.encounter.list && this.state.encounter.list.length > 0 ? (
          <div className="mb-2">
            <div className="my-3">
              <span className="font-weight-bold">
                Total Encounter Experience
              </span>
              : {this.encounterExp(this.state.encounter.list)} xp
            </div>
            <hr />
            <Row>
              {this.state.encounter.list.map((npc: Npc) => {
                return (
                  <Col key={npc.listId} sm="12" md="4" className="my-2">
                    <Card>
                      <CardBody>
                        <div className="d-flex align-items-center justify-content-between">
                          <div className="d-flex justify-content-between">
                            <div>
                              <p className="font-weight-bold mb-1">
                                {npc.name}
                              </p>
                              <div>
                                <span className="d-block mb-1">
                                  {npc.size} {npc.type}
                                </span>
                                <span>
                                  {npc.challenge_rating} CR - ({npc.xp} xp)
                                </span>
                              </div>
                            </div>
                          </div>

                          <span
                            data-listid={npc.listId}
                            onClick={this.deleteFromEncounter}
                          >
                            <FontAwesomeIcon icon="times" className="mt-1" />
                          </span>
                        </div>
                      </CardBody>
                    </Card>
                  </Col>
                );
              })}
            </Row>
          </div>
        ) : (
          "This encounter doesn't have any NPCs added yet, add some from your saved NPCs or the templates."
        )}
        <hr />
        <div className="d-flex justify-content-start">
          <Link to={routes.encountersPage}>
            <Button
              color="success"
              className="mr-2"
              onClick={this.saveEncounter}
            >
              Save
            </Button>
          </Link>
          <Link to={routes.encountersPage}>
            <Button color="warning">Cancel</Button>
          </Link>
        </div>

        <Modal isOpen={this.state.app.savedAdd} toggle={this.toggleSavedModal}>
          <AddFromSavedNPCs
            list={this.state.encounter.list}
            addToEncounter={this.handleAddToEncounter}
            toggle={this.toggleSavedModal}
            npcs={this.props.npcs}
          />
        </Modal>
        <Modal
          isOpen={this.state.app.templateAdd}
          toggle={this.toggleTemplateModal}
        >
          <h2>NPC LIST GOES HERE ONCE REFACTORED</h2>
        </Modal>
      </Container>
    );
  }
}

const mapStateToProps = (state: any, ownProps: any) => ({
  encounter: state.loaded.encounters.find(
    (encounter: Encounter) =>
      encounter.id === ownProps.location.state.encounterId
  ),
  campaign: state.loaded
});

const mapDispatchToProps = (dispatch: any) => {
  return {
    loadedActions: bindActionCreators(loadedActionCreators, dispatch)
  };
};

export default connect<{}, {}, Props>(
  mapStateToProps,
  mapDispatchToProps
)(EncounterBuilder);
