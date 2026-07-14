import { useEffect, useState } from "react";
import "./App.sass";

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
  const [botIndex, setBotIndex] = useState<number[]>([]);
  const [userIndex, setUserIndex] = useState<number[]>([]);

  function getIndex(index: number) {
    if (choices.includes(index)) return;
    if (!user) {
      setBotIndex((prev) => [...prev, index]);
    } else {
      setUserIndex((prev) => [...prev, index]);
    }
    return setChoices((prev) => [...prev, index]);
  }
  function checkWin(playerIndex: number[]) {
    return winningCombos.some((combo) =>
      combo.every((index) => playerIndex.includes(index)),
    );
  }
  useEffect(() => {
    if (checkWin(botIndex)) {
      console.log("bot wins");
    }
    if (checkWin(userIndex)) {
      console.log("user wins");
    }
    console.log("bot:", botIndex);
    console.log("user:", userIndex);
  }, [userIndex, botIndex]);

  return (
    <main>
      <h2 className="turn">{user ? "user's" : "bot's"}Turn</h2>
      <section className="board">
        {Array.from({ length: 9 }).map((_, index) => {
          return (
            <div
              className="choice"
              key={index}
              onClick={() => {
                getIndex(index);
                setUser(!user);
              }}
            >
              {choices.includes(index) ? index : null}
            </div>
          );
        })}
      </section>
    </main>
  );
}

export default App;
