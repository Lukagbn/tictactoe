import { useState } from "react";
import "./App.sass";
import Winner from "./components/Winner/Winner";
import Circle from "./components/Circle/Circle";
import Cross from "./components/Cross/Cross";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

const winningCombos = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

function App() {
  const [user, setUser] = useState<boolean>(false);
  const [overlay, setOverlay] = useState<boolean>(true);
  const [choices, setChoices] = useState<number[]>([]);
  const [playerOneIndex, setplayerOneIndex] = useState<number[]>([]);
  const [playerTwoIndex, setplayerTwoIndex] = useState<number[]>([]);

  function getIndex(index: number) {
    if (choices.includes(index)) return;
    if (!user) {
      setplayerOneIndex((prev) => [...prev, index]);
    } else {
      setplayerTwoIndex((prev) => [...prev, index]);
    }
    return setChoices((prev) => [...prev, index]);
  }

  function checkWin(playerIndex: number[]) {
    return winningCombos.some((combo) =>
      combo.every((index) => playerIndex.includes(index)),
    );
  }
  function returnWinner() {
    if (checkWin(playerOneIndex)) {
      return <Winner player="first" />;
    } else if (checkWin(playerTwoIndex)) {
      return <Winner player="second" />;
    } else if (choices.length === 9) {
      return <Winner player="tie" />;
    }
  }

  return (
    <main>
      {returnWinner()}
      {!overlay && (
        <h2 className="turn">
          {checkWin(playerOneIndex) || checkWin(playerTwoIndex)
            ? null
            : user
              ? "second player's turn"
              : "first player's turn"}
        </h2>
      )}
      <section className="board" style={{ margin: overlay ? "auto" : "" }}>
        {Array.from({ length: 9 }).map((_, index) => {
          return (
            <div
              className="choice"
              key={index}
              onClick={() => {
                if (choices.includes(index)) return;
                getIndex(index);
                setUser(!user);
              }}
            >
              {playerOneIndex.includes(index) ? (
                <Cross />
              ) : playerTwoIndex.includes(index) ? (
                <Circle />
              ) : null}
            </div>
          );
        })}
      </section>
      {overlay && (
        <div className="overlay">
          <button className="start" onClick={() => setOverlay(false)}>
            start game
          </button>
        </div>
      )}
    </main>
  );
}

export default App;
