import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Die from "./components/Die";
import { nanoid } from "nanoid";
import Confetti from "react-confetti";
import "./App.css";

const App = () => {
  const [tenzies, setTenzies] = useState(false);
  const [rollCount, setRollCount] = useState(0);
  const [timer, setTimer] = useState(0);
  const [gameTme, setGameTime] = useState([]);

  //function to generate new dice
  const generateNewDice = () => {
    return {
      number: Math.ceil(Math.random() * 6),
      id: nanoid(),
      isHeld: false,
    };
  };
  //function to create an array of new dice
  const allNewDice = () => {
    const newDice = [];
    for (let i = 0; i < 10; i++) {
      newDice.push(generateNewDice());
    }
    return newDice;
  };

  //function to hold dice when clicked
  const holdDice = (id) => {
    setDice((oldDice) =>
      oldDice.map((die) => {
        return die.id === id ? { ...die, isHeld: !die.isHeld } : die;
      })
    );
  };

  //function to roll dice
  const rollCounter = () => {
    setRollCount(rollCount + 1);
  };

  const rollDice = () => {
    if (tenzies) {
      setTenzies(false);
      // console.log(rollCount);
      setDice(allNewDice());
      setTimer(0);
    } else {
      setDice((oldDice) =>
        oldDice.map((die) => {
          return die.isHeld ? die : generateNewDice();
        })
      );
    }
  };

  const [dice, setDice] = useState(allNewDice());

  const diceElements = dice.map((die) => (
    <Die
      number={die.number}
      key={die.id}
      isHeld={die.isHeld}
      holdDice={() => {
        holdDice(die.id);
      }}
    />
  ));

  useEffect(() => {
    let interval = null;
    if (tenzies === false) {
      interval = setInterval(() => {
        setTimer((time) => time + 1);
      }, 1000);
    } else if (tenzies === true) {
      setGameTime((oldTime) => [...oldTime, timer]);
      // console.log(gameTme);
      clearInterval(interval);
    }

    return () => clearInterval(interval);
  }, [tenzies, timer]);

  useEffect(() => {
    const allHeld = dice.every((die) => die.isHeld);
    const firstValue = dice[0].number;
    const allSameValue = dice.every((die) => die.number === firstValue);
    if (allHeld && allSameValue) {
      setTenzies(true);
    }
  }, [dice]);

  return (
    <div className="App">
      {tenzies && <Confetti />}
      <div style={{ background: "#0b2434", padding: "20px", display: "flex" }}>
        <Container>
          <h1>Tenzies</h1>
          <p>
            Roll until all dice are the same. Click each die to freeze it at its
            current value between rolls.
          </p>

          <DiceContainer>{diceElements}</DiceContainer>
          <Button
            onClick={() => {
              rollDice();
              rollCounter();
            }}
          >
            {tenzies ? "New Game" : "Roll"}
          </Button>
          {tenzies && <p>Number of Rolls: {rollCount}</p>}
          <p>Time : {timer}s</p>
        </Container>
      </div>
    </div>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background: #f5f5f5;
  box-sizing: border-box;
  border-radius: 10px;
  padding: 50px;
`;

const DiceContainer = styled.div`
  display: grid;
  grid-template: auto auto / repeat(5, 1fr);
  gap: 20px;
  margin-bottom: 40px;
  margin-top: 40px;
  box-sizing: border-box;

  @media (max-width: 768px) {
    flex-direction: column;
    display: grid;
    grid-template: auto auto / repeat(4, 1fr);
  }

  @media (max-width: 320px) {
    flex-direction: column;
    display: grid;
    grid-template: auto auto / repeat(2, 1fr);
  }
`;

const Button = styled.button`
  background: #5035ff;
  color: white;
  width: 100px;
  height: 50px;
  border: none;
  border-radius: 4px;
  font-weight: bold;
`;
export default App;
