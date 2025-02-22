import { useEffect, useState } from "react";
import { store } from "../store/Store";
import { winLines } from "../reduce/Reduce";
import "./View.css";

const View = () => {
  const [state, setState] = useState(store.getState());
  const [winLine, setWinLine] = useState([]);
  const [isGameStarted, setIsGameStarted] = useState(false);

  useEffect(() => {
    const unsubscribe = store.subscribe(() => {
      setState(store.getState());
      // Находим выигрышную линию
      if (store.getState().winner) {
        findWinLine(store.getState().board);
      }
    });
    return () => unsubscribe();
  }, []);

  // Функция поиска выигрышной линии
  const findWinLine = (board) => {
    for (let line of winLines) {
      const [a, b, c] = line;
      if (board[a] && board[a] === board[b] && board[a] === board[c]) {
        setWinLine([a, b, c]);
        return;
      }
    }
  };

  const handleReset = () => {
    if (!isGameStarted) return; // Если игра не начата, кнопка не работает
    store.dispatch({ type: "RESET_GAME" });
    setWinLine([]);
    setIsGameStarted(false);
  };

  const handleMove = (index) => {
    setIsGameStarted(true);
    store.dispatch({ type: "MAKE_MOVE", payload: index });
  };

  return (
    <div className="game-container">
      <h1>Крестики-нолики</h1>
      {state.winner && (
        <h2 className="winner-message">Победитель: {state.winner}!</h2>
      )}
      {state.isDraw && <h2 className="draw-message">Ничья!</h2>}
      <div className="board">
        {state.board.map((cell, index) => (
          <button
            key={index}
            className={winLine.includes(index) ? "win" : ""}
            onClick={() => handleMove(index)}
          >
            {cell}
          </button>
        ))}
      </div>
      <button
        className={`reset-button ${isGameStarted ? "active" : ""}`}
        onClick={handleReset}
      >
        Сброс игры
      </button>
    </div>
  );
};

export default View;
