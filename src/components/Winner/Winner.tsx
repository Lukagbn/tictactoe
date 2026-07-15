import "./Winner.sass";

type Player = {
  player: "first" | "second";
};

function Winner({ player }: Player) {
  return (
    <div className="overlay">
      <div className="container">
        <h2>{player} player wins!</h2>
        <button onClick={() => window.location.reload()}>restart</button>
      </div>
    </div>
  );
}

export default Winner;
