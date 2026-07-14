import { useState } from "react";
import "./App.sass";

function App() {
  const [user, setUser] = useState<boolean>(false);
  function getIndex(index: number) {
    console.log(index);
  }
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
              {index + 1}
            </div>
          );
        })}
      </section>
    </main>
  );
}

export default App;
