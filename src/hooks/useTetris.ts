import { useCallback, useEffect, useState } from 'react';
import { Block, BlockShape, BoardShape, EmptyCell, SHAPES } from '../types';
import { useInterval } from './useInterval';
import {
  useTetrisBoard,
  hasCollisions,
  BOARD_HEIGHT,
  getEmptyBoard,
  getRandomBlock,
} from './useTetrisBoard';

// Blok düşme hızlarını tanımlayan enum
enum TickSpeed {
  Normal = 800,
  Sliding = 100,
  Fast = 50,
}

// useTetris hook'u, Tetris oyununun ana mantığını yönetir
export function useTetris(onGameOver: () => void) {
  const [score, setScore] = useState(0); // Skor state'i
  const [line, setLine] = useState(0); // Temizlenen satır sayısı state'i
  const [upcomingBlocks, setUpcomingBlocks] = useState<Block[]>([]); // Sıradaki bloklar state'i
  const [isCommitting, setIsCommitting] = useState(false); // Blok yerleştirme durumu state'i
  const [isPlaying, setIsPlaying] = useState(false); // Oyun oynanıyor mu state'i
  const [isPaused, setIsPaused] = useState(false); // Oyun duraklatıldı mı state'i
  const [tickSpeed, setTickSpeed] = useState<TickSpeed | null>(null); // Blok düşme hızı state'i
  const [keyBindings, setKeyBindings] = useState({
    left: 'ArrowLeft',
    right: 'ArrowRight',
    down: 'ArrowDown',
    rotate: 'ArrowUp',
  }); // Tuş atamaları state'i
  const [playSoundEffect, setPlaySoundEffect] = useState(false); // Ses efekti çalma durumu state'i

  const [
    { board, droppingRow, droppingColumn, droppingBlock, droppingShape },
    dispatchBoardState,
  ] = useTetrisBoard(); // Tetris tahtası ve düşen blok state'leri

  // Oyunu başlatma fonksiyonu
  const startGame = useCallback(() => {
    const startingBlocks = [
      getRandomBlock(),
      getRandomBlock(),
      getRandomBlock(),
    ];
    setScore(0);
    setLine(0);
    setUpcomingBlocks(startingBlocks);
    setIsCommitting(false);
    setIsPlaying(true);
    setIsPaused(false);
    setTickSpeed(TickSpeed.Normal);
    dispatchBoardState({ type: 'start' });
  }, [dispatchBoardState]);

  // Oyunu duraklatma fonksiyonu
  const pauseGame = useCallback(() => {
    setIsPaused(true);
    setTickSpeed(null);
  }, []);

  // Oyunu devam ettirme fonksiyonu
  const resumeGame = useCallback(() => {
    setIsPaused(false);
    setTickSpeed(TickSpeed.Normal);
  }, []);

  // Blok yerleştirme fonksiyonu
  const commitPosition = useCallback(() => {
    if (!hasCollisions(board, droppingShape, droppingRow + 1, droppingColumn)) {
      setIsCommitting(false);
      setTickSpeed(TickSpeed.Normal);
      return;
    }

    const newBoard = structuredClone(board) as BoardShape;
    addShapeToBoard(
      newBoard,
      droppingBlock,
      droppingShape,
      droppingRow,
      droppingColumn
    );

    setPlaySoundEffect(true);
    setTimeout(() => setPlaySoundEffect(false), 100);

    let numCleared = 0;
    for (let row = BOARD_HEIGHT - 1; row >= 0; row--) {
      if (newBoard[row].every((entry) => entry !== EmptyCell.Empty)) {
        numCleared++;
        newBoard.splice(row, 1);
      }
    }

    const newUpcomingBlocks = structuredClone(upcomingBlocks) as Block[];
    const newBlock = newUpcomingBlocks.pop() as Block;
    newUpcomingBlocks.unshift(getRandomBlock());

    if (hasCollisions(board, SHAPES[newBlock].shape, 0, 3)) {
      setIsPlaying(false);
      setTickSpeed(null);
      onGameOver(); // Oyun bittiğinde callback'i çağır
    } else {
      setTickSpeed(TickSpeed.Normal);
    }
    setUpcomingBlocks(newUpcomingBlocks);
    setScore((prevScore) => prevScore + getPoints(numCleared));
    setLine((prevLine) => prevLine + numCleared);
    dispatchBoardState({
      type: 'commit',
      newBoard: [...getEmptyBoard(BOARD_HEIGHT - newBoard.length), ...newBoard],
      newBlock,
    });
    setIsCommitting(false);
  }, [
    board,
    dispatchBoardState,
    droppingBlock,
    droppingColumn,
    droppingRow,
    droppingShape,
    upcomingBlocks,
    onGameOver,
  ]);

  // Oyun tick fonksiyonu
  const gameTick = useCallback(() => {
    if (isCommitting) {
      commitPosition();
    } else if (
      hasCollisions(board, droppingShape, droppingRow + 1, droppingColumn)
    ) {
      setTickSpeed(TickSpeed.Sliding);
      setIsCommitting(true);
    } else {
      dispatchBoardState({ type: 'drop' });
    }
  }, [
    board,
    commitPosition,
    dispatchBoardState,
    droppingColumn,
    droppingRow,
    droppingShape,
    isCommitting,
  ]);

  // Interval kullanarak oyun tick'ini yönet
  useInterval(() => {
    if (!isPlaying || isPaused) {
      return;
    }
    gameTick();
  }, tickSpeed);

  // Klavye olaylarını yönet
  useEffect(() => {
    if (!isPlaying || isPaused) {
      return;
    }

    let isPressingLeft = false;
    let isPressingRight = false;
    let moveIntervalID: number | undefined;

    const updateMovementInterval = () => {
      clearInterval(moveIntervalID);
      dispatchBoardState({
        type: 'move',
        isPressingLeft,
        isPressingRight,
      });
      moveIntervalID = setInterval(() => {
        dispatchBoardState({
          type: 'move',
          isPressingLeft,
          isPressingRight,
        });
      }, 300);
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.repeat) {
        return;
      }

      if (event.key === keyBindings.down) {
        setTickSpeed(TickSpeed.Fast);
      }

      if (event.key === keyBindings.rotate) {
        dispatchBoardState({
          type: 'move',
          isRotating: true,
        });
      }

      if (event.key === keyBindings.left) {
        isPressingLeft = true;
        updateMovementInterval();
      }

      if (event.key === keyBindings.right) {
        isPressingRight = true;
        updateMovementInterval();
      }
    };

    const handleKeyUp = (event: KeyboardEvent) => {
      if (event.key === keyBindings.down) {
        setTickSpeed(TickSpeed.Normal);
      }

      if (event.key === keyBindings.left) {
        isPressingLeft = false;
        updateMovementInterval();
      }

      if (event.key === keyBindings.right) {
        isPressingRight = false;
        updateMovementInterval();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('keyup', handleKeyUp);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('keyup', handleKeyUp);
      clearInterval(moveIntervalID);
      setTickSpeed(TickSpeed.Normal);
    };
  }, [dispatchBoardState, isPlaying, isPaused, keyBindings]);

  const renderedBoard = structuredClone(board) as BoardShape;
  if (isPlaying && !isPaused) {
    addShapeToBoard(
      renderedBoard,
      droppingBlock,
      droppingShape,
      droppingRow,
      droppingColumn
    );
  }

  return {
    board: renderedBoard,
    startGame,
    pauseGame,
    resumeGame,
    isPlaying,
    isPaused,
    score,
    upcomingBlocks,
    line,
    keyBindings,
    setKeyBindings,
    playSoundEffect
  };
}

// Temizlenen satır sayısına göre puan hesaplama fonksiyonu
function getPoints(numCleared: number): number {
  switch (numCleared) {
    case 0:
      return 0;
    case 1:
      return 100;
    case 2:
      return 300;
    case 3:
      return 500;
    case 4:
      return 800;
    default:
      throw new Error('Unexpected number of rows cleared');
  }
}

// Blokları tahtaya ekleme fonksiyonu
function addShapeToBoard(
  board: BoardShape,
  droppingBlock: Block,
  droppingShape: BlockShape,
  droppingRow: number,
  droppingColumn: number
) {
  droppingShape
    .filter((row) => row.some((isSet) => isSet))
    .forEach((row: boolean[], rowIndex: number) => {
      row.forEach((isSet: boolean, colIndex: number) => {
        if (isSet) {
          board[droppingRow + rowIndex][droppingColumn + colIndex] =
            droppingBlock;
        }
      });
    });
}