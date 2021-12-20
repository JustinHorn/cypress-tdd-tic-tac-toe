import { useState, useMemo } from "react";
import "./App.css";

function App() {
  const [field, setField] = useState(Array(9).fill(" "));

  const isXTurn = useMemo(
    () => field.filter((x) => x === " ").length % 2,
    [field]
  );

  const gameStatus = useMemo(() => {
    //

    const nonEmptyEqual = (a, b, c) => a !== " " && a === b && b === c;
    for (let i = 0; i < 3; i++) {
      // horizontal & vertical
      if (nonEmptyEqual(field[i], field[i + 1], field[i + 2])) return field[i];
      if (nonEmptyEqual(field[i], field[i + 3], field[i + 6])) return field[i];
    }
  }, [field]);

  return (
    <div className="App">
      <h1>Hello World!</h1>
      <button onClick={() => alert("Hello World!")}>Hello World Alert</button>

      <div id="field">
        {field.map((x, index) => (
          <div
            onClick={() =>
              setField((prev) => [
                ...prev.slice(0, index),
                isXTurn ? "X" : "O",
                ...prev.slice(index + 1),
              ])
            }
            className={`tile`}
          >
            {x}
          </div>
        ))}
      </div>

      {gameStatus === "X" && <h1>Player X has won</h1>}
    </div>
  );
}

export default App;
