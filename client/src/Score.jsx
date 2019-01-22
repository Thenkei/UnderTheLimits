import React from "react";
import { Row } from "react-bootstrap";
import Player from "./Player";

const Score = ({ players }) => {
  return (
    <dl>
    {
      players.map(p => (
        // Without the `key`, React will fire a key warning
        <Row key={p.id}>
          <Player value={p} />
        </Row>
      ))
    }
    </dl>
  );
}


export default Score;
