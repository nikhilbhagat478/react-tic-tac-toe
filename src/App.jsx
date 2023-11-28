import { useState } from "react";

import Player from "./components/Player";
import GameBoard from "./components/GameBoard";
import Log from "./components/Log";
import GameOver from "./components/GameOver";
import { WINNING_COMBINATIONS } from "./winning-combinations";

const initialPlayers = {
  X: 'Player 1',
  O: 'Player 2'
}

const initialGameBoard = [
  [null, null, null],
  [null, null, null],
  [null, null, null],
];

function deriveActivePlayer(gameTurns) {
  let currentPlayer = "X";
  if (gameTurns.length > 0 && gameTurns[0].player === "X") {
    currentPlayer = "O";
  }
  return currentPlayer;
}

function deriveGameBoard(gameTurns) {
  const gameBoard = [...initialGameBoard.map(arr => [...arr])];

  for (const turn of gameTurns) {
    const { square, player } = turn;
    const { row, col } = square;
    gameBoard[row][col] = player;
  }
  return gameBoard
}

function deriveWinner(gameBoard, players) {
  let winner = null;

  for(const combination of WINNING_COMBINATIONS) {
    let firstSquareSymbol = gameBoard[combination[0].row][combination[0].column]
    let secondSquareSymbol = gameBoard[combination[1].row][combination[1].column]
    let thirdSquareSymbol = gameBoard[combination[2].row][combination[2].column]
    if(firstSquareSymbol && firstSquareSymbol === secondSquareSymbol && firstSquareSymbol === thirdSquareSymbol) {
      winner = players[firstSquareSymbol]
    }
  }
  return winner
}

function App() {
  const [players, setPlayers] = useState(initialPlayers)
  const [gameTurns, setGameTurns] = useState([]);

  const activePlayer = deriveActivePlayer(gameTurns);
  const gameBoard = deriveGameBoard(gameTurns)
  let winner = deriveWinner(gameBoard, players)
  const hasDraw = gameTurns.length === 9 && !winner

  function handleSelectSquare(rowIndex, colIndex) {
    setGameTurns((prevTurns) => {
      const currentPlayer = deriveActivePlayer(prevTurns);
      const updatedTurns = [
        { square: { row: rowIndex, col: colIndex }, player: currentPlayer },
        ...prevTurns,
      ];
      updatedTurns.push();
      return updatedTurns;
    });
  }

  function handleRestart() {
    setGameTurns([])
  }

  function handlePlayerNameChange(name, newName) {
    setPlayers(prevPlayers => {
      return {
        ...prevPlayers,
        [name]: newName
      }
    })
  }

  return (
    <main>
      <div id="game-container">
        <ol id="players" className="highlight-player">
          <Player
            initialName={initialPlayers.X}
            symbol="X"
            isActive={activePlayer === "X"}
            onChangeName={handlePlayerNameChange}
          />
          <Player
            initialName={initialPlayers.O}
            symbol="O"
            isActive={activePlayer === "O"}
            onChangeName={handlePlayerNameChange}
          />
        </ol>
        {(winner || hasDraw)&& <GameOver winner={winner} onRestart={handleRestart} />}
        <GameBoard
          onSelectSquare={handleSelectSquare}
          board={gameBoard}
        />
      </div>
      <Log gameTurns={gameTurns} />
    </main>
  );
}

export default App;
