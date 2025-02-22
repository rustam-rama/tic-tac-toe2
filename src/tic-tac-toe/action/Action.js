export const MAKE_MOVE = 'MAKE_MOVE'; // Сделать ход
export const RESET_GAME = 'RESET_GAME'; // Сбросить игру

export const makeMove = (position) => ({ //
  type: MAKE_MOVE,
  payload: position // позиция на поле
});

export const resetGame = () => ({
  type: RESET_GAME
});