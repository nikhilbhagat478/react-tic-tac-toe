import { useState } from "react";

const initialGameBoard = [
  [null, null, null],
  [null, null, null],
  [null, null, null],
];
export default function GameBoard({ onSelectSquare, turns }) {
  const gameBoard = initialGameBoard;

  for (const turn of turns) {
    const { square, player } = turn;
    const { row, col } = square;

    gameBoard[row][col] = player;
  }
  //   const [gameBoard, setGameBoard] = useState(initialGameBoard);
  //   function handleSelectSquare(rowIndex, colIndex) {
  //     setGameBoard((prevBoard) => {
  //       const updateBoard = [...prevBoard.map((innerArray) => [...innerArray])];
  //       updateBoard[rowIndex][colIndex] = activePlayerSymbol;
  //       return updateBoard;
  //     });

  //     onSelectSquare();
  //   }
  return (
    <ol id="game-board">
      {gameBoard.map((row, key1) => (
        <li key={key1}>
          <ol>
            {row.map((playerSymbol, key2) => (
              <li key={key2}>
                <button onClick={() => onSelectSquare(key1, key2)}>
                  {playerSymbol}
                </button>
              </li>
            ))}
          </ol>
        </li>
      ))}
    </ol>
  );
}
