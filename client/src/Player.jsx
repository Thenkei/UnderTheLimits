import React from "react";
import { Badge, Label } from "react-bootstrap";

const Player = ({ value, noScore }) => {
  return (
    <React.Fragment>
      <dt>
        {value.isGameMaster ? ">" : ""}
        <Label>{value.name}</Label>
        { !noScore && <Badge>{value.score} pt(s)</Badge> }
      </dt>
    </React.Fragment>
  );
}


export default Player;
