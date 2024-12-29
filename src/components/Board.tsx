import Cell from './Cell';
import { BoardShape } from '../types';

// Board bileşeni için prop türleri
interface Props {
  currentBoard: BoardShape; // Mevcut oyun tahtası
}

// Board bileşeni
function Board({ currentBoard }: Props) {
  return (
    <div className="board">
      {currentBoard.map((row, rowIndex) => ( // Her satırı render et
        <div className="row" key={`${rowIndex}`}>
          {row.map((cell, colIndex) => ( // Her hücreyi render et
            <Cell key={`${rowIndex}-${colIndex}`} type={cell} /> // Hücre bileşenini render et
          ))}
        </div>
      ))}
    </div>
  );
}

export default Board;