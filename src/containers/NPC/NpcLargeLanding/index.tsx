import React from "react";
import { Button, Col, Jumbotron } from "reactstrap";

import characterTypes from "../../../constants/characterTypes";
import SavedNpcList from "../SavedNpcList";

interface Props {
  setCharacterType: (type: string) => void;
  toggleAddModal: () => void;
}

const NpcLargeLanding = (props: Props) => {
  return (
    <div>
      <Jumbotron>
        <h3>Saved NPC Manager</h3>
        <p className="font-weight-light">
          Manage your saved non player characters in your campaign.
        </p>
      </Jumbotron>
      <div className="d-flex justify-content-center">
        <Col sm="12" md="6">
          <div className="d-flex justify-content-between">
            <h4 className="d-inline-block mt-2">Hostile NPCs</h4>
            {/* Create new Hostile NPC */}
            <Button
              color="primary"
              onClick={e => {
                props.setCharacterType(characterTypes.HOSTILE_NPC);
                props.toggleAddModal();
              }}
            >
              New
            </Button>
          </div>
          <hr />
          {/* List all Hostile NPCs */}
          <SavedNpcList characterType={characterTypes.HOSTILE_NPC} />
        </Col>
        <div className="border-left mx-2" />
        <Col sm="12" md="6">
          <div className="d-flex justify-content-between">
            <h4 className="d-inline-block mt-2">Friendly NPCs</h4>
            {/* Create new Friendly NPC */}
            <Button
              color="primary"
              onClick={e => {
                props.setCharacterType(characterTypes.FRIENDLY_NPC);
                props.toggleAddModal();
              }}
            >
              New
            </Button>
          </div>
          <hr />
          {/* List all Friendly NPCs */}
          <SavedNpcList characterType={characterTypes.FRIENDLY_NPC} />
        </Col>
      </div>
    </div>
  );
};

export default NpcLargeLanding;
