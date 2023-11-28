import { useState } from "react";

export default function GameBoard({ onSelectSquare, board }) {
  
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
      {board.map((row, key1) => (
        <li key={key1}>
          <ol>
            {row.map((playerSymbol, key2) => (
              <li key={key2}>
                <button onClick={() => onSelectSquare(key1, key2)} disabled={playerSymbol !== null}>
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
