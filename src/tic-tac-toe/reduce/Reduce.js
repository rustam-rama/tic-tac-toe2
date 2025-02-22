import { RESET_GAME, MAKE_MOVE } from "../action/Action";

const initialState = {
  board: Array(9).fill(null), // Пустое поле
  currentPlayer: "X", // Первый ходит X
  winner: null, // Пока нет победителя
  isDraw: false, // Пока нет ничьей
};

// Выигрышные комбинации
export const winLines = [
  [0, 1, 2], // горизонтали
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6], // вертикали
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8], // диагонали
  [2, 4, 6],
];

// Проверка победителя
const checkWinner = (board) => {
  for (let line of winLines) {
    const [a, b, c] = line;
    if (board[a] && board[a] === board[b] && board[a] === board[c])
      return board[a];
  }
  return null;
};

// Проверка ничьей
const checkDraw = (board) => {
  return board.every((cell) => cell !== null);
};

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case MAKE_MOVE:
      if (
        state.winner ||
        state.isDraw ||
        state.board[action.payload] !== null
      ) {
        return state;
      }

      const newBoard = [...state.board];
      newBoard[action.payload] = state.currentPlayer; //

      const winner = checkWinner(newBoard);
      const isDraw = !winner && checkDraw(newBoard);

      return {
        ...state,
        board: newBoard,
        currentPlayer: state.currentPlayer === "X" ? "O" : "X",
        winner: winner,
        isDraw: isDraw,
      };
    case RESET_GAME:
      // Возвращаем начальное состояние
      return initialState;
    default:
      // Если action неизвестен, возвращаем текущее состояние
      return state;
  }
};

export default reducer;
