import "./Winner.sass";

type Player = {
  player: "one" | "two";
};

function Winner({ player }: Player) {
  return (
    <div className="overlay">
      <h2 className="winner">winner is {player}</h2>
      <button onClick={() => window.location.reload()}>restart</button>
    </div>
  );
}

export default Winner;
