import { Data, ReadonlyArray, pipe } from "effect";

export type Board = Row[];
export type Row = Cell[];

export type Cell = Data.TaggedEnum<{ Empty: {}; Player1: {}; Player2: {} }>;

export const { Empty, Player1, Player2 } = Data.taggedEnum<Cell>();

export const buildBoard = (width: number, height: number): Board => {
  const row = ReadonlyArray.makeBy(width, () => Empty());
  const board = ReadonlyArray.makeBy(height, () => row);
  return board;
};

type ColIdx = number;
type RowIdx = number;
type Position = [ColIdx, RowIdx];

export const updateBoard =
  ([colIdx, rowIdx]: Position, cell: Cell) =>
  (board: Board): Board => {
    return pipe(
      board,
      ReadonlyArray.modify(rowIdx, ReadonlyArray.replace(colIdx, cell))
    );
  };

[Empty(), Player1(), Player2()];
