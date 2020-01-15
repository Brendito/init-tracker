import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import {
  Button,
  Card,
  CardBody,
  CardSubtitle,
  CardTitle,
  Col
} from "reactstrap";
import { bindActionCreators } from "redux";
import {
  loadedActionCreators,
  savedActionCreators,
  SavedActionCreators,
  LoadedActionCreators
} from "../../../../actions";
import routes from "../../../../constants/routes";
import { slugify } from "../../../../utils/utils";
import { Encounter, Npc } from "../../../../models";

interface Props {
  loadedActions: LoadedActionCreators;
  savedActions: SavedActionCreators;
  encounter: Encounter;
}

class EncounterListCard extends Component<Props> {
  deleteEncounter = () => {
    this.props.savedActions.deleteEncounter(this.props.encounter.id);
  };

  runEncounter = () => {
    this.props.loadedActions.loadEncounter(this.props.encounter);
  };

  render() {
    return (
      <Col md="4" className="my-2">
        <Card>
          <CardBody>
            <CardTitle className="font-weight-bolder">
              {this.props.encounter.name}
            </CardTitle>
            <hr />
            {this.props.encounter.totalExp !== undefined && (
              <CardSubtitle>
                Total Exp -{" "}
                <span className="font-weight-light">
                  {this.props.encounter.totalExp}
                </span>
              </CardSubtitle>
            )}
            <div className="my-3">
              {this.props.encounter.list.length > 0 ? (
                <div>
                  <CardSubtitle>NPCs:</CardSubtitle>
                  <ul>
                    <div className="d-flex flex-column flex-wrap npclist">
                      {this.props.encounter.list.map((npc: Npc, i) => {
                        return (
                          <li className="font-weight-light" key={i}>
                            {npc.name}
                          </li>
                        );
                      })}
                    </div>
                  </ul>
                </div>
              ) : (
                "This encounter does not have any NPCs added yet."
              )}
            </div>

            <hr />
            <div className="d-flex justify-content-between">
              {/* LINK TO BUILDER */}
              <Link
                to={{
                  pathname: `${routes.encounterBuilder}${slugify(
                    this.props.encounter.name
                  )}`,
                  state: {
                    encounterId: this.props.encounter.id
                  }
                }}
              >
                <Button color="primary">Edit</Button>
              </Link>
              <Link to={routes.tracker}>
                <Button color="success" onClick={this.runEncounter}>
                  Start
                </Button>
              </Link>
              {/* SEND DELETE ACTION */}
              <Button color="danger" onClick={this.deleteEncounter}>
                Delete
              </Button>
            </div>
          </CardBody>
        </Card>
      </Col>
    );
  }
}

const mapDispatchToProps = (dispatch: any) => {
  return {
    loadedActions: bindActionCreators(loadedActionCreators, dispatch),
    savedActions: bindActionCreators(savedActionCreators, dispatch)
  };
};

export default connect(null, mapDispatchToProps)(EncounterListCard);
