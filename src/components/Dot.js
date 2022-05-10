import React from "react";
import styled from "styled-components";

const Dot = () => {
  return (
    <div>
      <Die></Die>
    </div>
  );
};

const Die = styled.div`
  width: 10px;
  height: 10px;
  background-color: red;
  border-radius: 50%;
`;

export default Dot;
