import React from "react";
import styled from "styled-components";

const Die = (props) => {
  const styles = {
    backgroundColor: props.isHeld ? "#59E391" : "#ffffff",
  };
  return (
    <Dice style={styles} onClick={props.holdDice}>
      {props.number}
    </Dice>
  );
};

const Dice = styled.div`
  height: 50px;
  width: 50px;
  box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.15);
  border-radius: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  font-weight: bold;
`;

export default Die;
