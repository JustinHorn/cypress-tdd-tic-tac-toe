import { useState, useMemo } from "react";
import "./App.css";

const EMPTY = " ";
const X = "X";
const O = "O";
const EMPTY_FIELD = Array(9).fill(EMPTY);

function App() {
  const [field, setField] = useState(EMPTY_FIELD);

  const isXTurn = useMemo(
    () => field.filter((x) => x === EMPTY).length % 2,
    [field]
  );

  const gameStatus = useMemo(() => {
    //

    const nonEmptyEqual = (a, b, c) => a !== EMPTY && a === b && b === c;
    for (let i = 0; i < 3; i++) {
      // horizontal & vertical
      if (nonEmptyEqual(field[i * 3], field[i * 3 + 1], field[i * 3 + 2]))
        return field[i * 3];
      if (nonEmptyEqual(field[i], field[i + 3], field[i + 6])) return field[i];
    }
    if (nonEmptyEqual(field[0], field[4], field[8])) return field[4];
    if (nonEmptyEqual(field[6], field[4], field[2])) return field[4];

    return field.some((f) => f === EMPTY) ? "NOT_OVER" : "DRAW";
  }, [field]);

  return (
    <div className="App">
      {gameStatus === X && <h1>Player X has won!</h1>}
      {gameStatus === O && <h1>Player O has won!</h1>}
      {gameStatus === "DRAW" && <h1>Game Over: DRAW!</h1>}
      <button onClick={() => setField(EMPTY_FIELD)}>restart</button>
      <div id="field">
        {field.map((x, index) => (
          <div
            onClick={() =>
              setField((prev) =>
                prev[index] === EMPTY && gameStatus === "NOT_OVER"
                  ? [
                      ...prev.slice(0, index),
                      isXTurn ? X : O,
                      ...prev.slice(index + 1),
                    ]
                  : prev
              )
            }
            className="tile"
          >
            {x}
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
