// Tetris blok türlerini tanımlayan enum
export enum Block {
  I = 'I',
  J = 'J',
  L = 'L',
  O = 'O',
  S = 'S',
  T = 'T',
  Z = 'Z',
}

// Boş hücreyi tanımlayan enum
export enum EmptyCell {
  Empty = 'Empty',
}

// Hücre seçeneklerini tanımlayan tür (blok veya boş hücre)
export type CellOptions = Block | EmptyCell;

// Oyun tahtasının şeklini tanımlayan tür (iki boyutlu hücre dizisi)
export type BoardShape = CellOptions[][];

// Blok şekillerini tanımlayan tür (iki boyutlu boolean dizisi)
export type BlockShape = boolean[][];

// Blok şekillerini içeren nesneyi tanımlayan tür
type ShapesObj = {
  [key in Block]: {
    shape: BlockShape;
  };
};

// Tetris blok şekillerini tanımlayan nesne
export const SHAPES: ShapesObj = {
  I: {
    shape: [
      [false, false, false, false],
      [false, false, false, false],
      [true, true, true, true],
      [false, false, false, false],
    ],
  },
  J: {
    shape: [
      [false, false, false],
      [true, false, false],
      [true, true, true],
    ],
  },
  L: {
    shape: [
      [false, false, false],
      [false, false, true],
      [true, true, true],
    ],
  },
  O: {
    shape: [
      [true, true],
      [true, true],
    ],
  },
  S: {
    shape: [
      [false, false, false],
      [false, true, true],
      [true, true, false],
    ],
  },
  T: {
    shape: [
      [false, false, false],
      [false, true, false],
      [true, true, true],
    ],
  },
  Z: {
    shape: [
      [false, false, false],
      [true, true, false],
      [false, true, true],
    ],
  },
};