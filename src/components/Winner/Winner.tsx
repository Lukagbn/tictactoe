import "./Winner.sass";

type Player = {
  player: "first" | "second" | "tie";
};

function Winner({ player }: Player) {
  return (
    <div className="overlay">
      <div className="container">
        {player === "tie" ? <h2>tie!</h2> : <h2>{player} player wins!</h2>}
        <button onClick={() => window.location.reload()}>Playe Again</button>
      </div>
    </div>
  );
}

export default Winner;
