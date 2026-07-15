import { useState } from "react";
import "./App.sass";
import Winner from "./components/Winner";
import Circle from "./components/Circle/Circle";
import Cross from "./components/Cross/Cross";

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
  // ვკითხო ეს ვუნქცია
  function checkWin(playerIndex: number[]) {
    return winningCombos.some((combo) =>
      combo.every((index) => playerIndex.includes(index)),
    );
  }
  function returnWinner() {
    if (checkWin(playerOneIndex)) {
      return <Winner player="one" />;
    } else if (checkWin(playerTwoIndex)) {
      return <Winner player="two" />;
    }
  }

  return (
    <main>
      {returnWinner()}
      <h2 className="turn">{user ? "player second's" : "player one's"} Turn</h2>
      <section className="board">
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
              {/* ვკითხო ეს ნაწილი */}
              {playerOneIndex.includes(index) ? (
                <Cross />
              ) : playerTwoIndex.includes(index) ? (
                <Circle />
              ) : null}
            </div>
          );
        })}
      </section>
    </main>
  );
}

export default App;
