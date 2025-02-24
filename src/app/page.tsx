'use client';

import { useState, useEffect, useRef } from 'react';

export default function DinosaurGame() {
  const [isJumping, setIsJumping] = useState(false);
  const [dinoY, setDinoY] = useState(0);
  const [cactusX, setCactusX] = useState(800);
  const [isGameOver, setIsGameOver] = useState(false);
  const [score, setScore] = useState(0);
  const gameRef = useRef<number | null>(null);

  const jump = () => {
    if (isJumping) return;
    setIsJumping(true);
    let velocity = 8;
    let posY = dinoY;

    const jumpAnimation = () => {
      posY += velocity;
      velocity -= 0.5;

      if (posY <= 0) {
        posY = 0;
        setIsJumping(false);
        return;
      }

      setDinoY(posY);
      requestAnimationFrame(jumpAnimation);
    };

    jumpAnimation();
  };

  useEffect(() => {
    const gameLoop = () => {
      setCactusX((prev) => {
        if (prev <= -50) {
          setScore((s) => s + 1);
          return 800;
        }
        return prev - 5;
      });

      if (cactusX <= 50 && cactusX >= 0 && dinoY < 50) {
        setIsGameOver(true);
        cancelAnimationFrame(gameRef.current!);
      } else {
        gameRef.current = requestAnimationFrame(gameLoop);
      }
    };

    gameRef.current = requestAnimationFrame(gameLoop);

    return () => cancelAnimationFrame(gameRef.current!);
  }, [cactusX, dinoY]);

  return (
    <div
      style={styles.container}
      onKeyDown={(e) => e.key === ' ' && jump()}
      tabIndex={0}
    >
      <h1 style={styles.score}>Score: {score}</h1>

      {isGameOver && <h1 style={styles.gameOver}>Game Over! Press F5 to restart</h1>}

      <div style={{ ...styles.dino, bottom: `${dinoY}px` }}></div>

      <div style={{ ...styles.cactus, left: `${cactusX}px` }}></div>

      <div style={styles.ground}></div>
    </div>
  );
}

const styles = {
  container: {
    width: '100vw',
    height: '100vh',
    backgroundColor: '#f4f4f4',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column' as const,
    position: 'relative' as const,
    overflow: 'hidden',
    fontFamily: 'Arial',
  },
  score: {
    fontSize: '2rem',
    position: 'absolute' as const,
    top: '20px',
    left: '20px',
  },
  gameOver: {
    fontSize: '3rem',
    color: 'red',
    position: 'absolute' as const,
    top: '100px',
  },
  dino: {
    width: '50px',
    height: '50px',
    backgroundColor: 'black',
    position: 'absolute' as const,
    bottom: '0',
    left: '50px',
  },
  cactus: {
    width: '30px',
    height: '50px',
    backgroundColor: 'green',
    position: 'absolute' as const,
    bottom: '0',
  },
  ground: {
    width: '100%',
    height: '5px',
    backgroundColor: 'black',
    position: 'absolute' as const,
    bottom: '0',
  },
};
