import { Data, ReadonlyArray } from "effect";

type Board = Row[];
type Row = Cell[];
type Cell = Data.TaggedEnum<{ Empty: {}; Filled: {} }>;
const { Empty, Filled } = Data.taggedEnum<Cell>();

export const buildBoard = (width: number, height: number): Board => {
  const row = ReadonlyArray.makeBy(width, () => Empty());
  const board = ReadonlyArray.makeBy(height, () => row);
  return board;
};
