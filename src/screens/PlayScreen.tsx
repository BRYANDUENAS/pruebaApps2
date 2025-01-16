import React, { useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { getAuth } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import '../css/PlayScreen.css';
import { db } from '../firebase/credenciales';

const createBoard = (rows: number, cols: number, mines: number) => {
  const board = Array.from({ length: rows }, () =>
    Array.from({ length: cols }, () => ({
      isMine: false,
      isRevealed: false,
      isFlagged: false,
    }))
  );

  let placedMines = 0;
  while (placedMines < mines) {
    const row = Math.floor(Math.random() * rows);
    const col = Math.floor(Math.random() * cols);
    if (!board[row][col].isMine) {
      board[row][col].isMine = true;
      placedMines++;
    }
  }

  return board;
};

export default function PlayScreen({ navigation }: any) {
  const [board, setBoard] = useState(createBoard(8, 8, 10));
  const [time, setTime] = useState(120); // Tiempo inicial: 2 minutos
  const [gameOver, setGameOver] = useState(false);
  const [score, setScore] = useState(0);
  const auth = getAuth();

  const saveScore = async (score: number) => {
    const user = auth.currentUser;
    if (user) {
      try {
        const userDoc = doc(db, 'users', user.uid);
        await setDoc(userDoc, { score }, { merge: true });
        console.log('Puntaje guardado correctamente.');
      } catch (error) {
        console.error('Error al guardar el puntaje:', error);
      }
    }
  };

  useEffect(() => {
    if (time > 0 && !gameOver) {
      const timer = setTimeout(() => setTime(time - 1), 1000);
      return () => clearTimeout(timer);
    } else if (time === 0) {
      setGameOver(true);
      alert(`Terminó el tiempo. Tu puntaje es: ${score}`);
      saveScore(score); // Guarda el puntaje
      navigation.navigate('PerfilScreen');
    }
  }, [time, gameOver, score, navigation]);

  const handleCellClick = (rowIndex: number, colIndex: number) => {
    if (gameOver) return;

    const newBoard = board.map((row, rIndex) =>
      row.map((cell, cIndex) => {
        if (rIndex === rowIndex && cIndex === colIndex) {
          if (cell.isRevealed) return cell;

          if (cell.isMine) {
            setGameOver(true);
            alert(`¡Boom! Tocaste una mina. Tu puntaje es: ${score}`);
            saveScore(score); // Guarda el puntaje
            navigation.navigate('PerfilScreen');
          } else {
            setScore((prev) => prev + 1);
          }

          return { ...cell, isRevealed: true };
        }
        return cell;
      })
    );

    setBoard(newBoard);
  };

  return (
    <div className="play-screen">
      <h1>Buscaminas</h1>
      <div className="header">
        <div className="timer">Tiempo restante: {time}s</div>
        <div className="score">Puntaje: {score}</div>
      </div>
      <div className="board">
        {board.map((row, rowIndex) => (
          <div key={rowIndex} className="row">
            {row.map((cell, colIndex) => (
              <div
                key={colIndex}
                className={`cell ${cell.isRevealed ? (cell.isMine ? 'mine' : 'revealed') : ''}`}
                onClick={() => handleCellClick(rowIndex, colIndex)}
              >
                {cell.isRevealed && !cell.isMine ? '✔️' : ''}
              </div>
            ))}
          </div>
        ))}
      </div>
      {gameOver && <div className="game-over">Juego Terminado</div>}
    </div>
  );
}
