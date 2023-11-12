import {
  Data,
  Match,
  ReadonlyArray,
  Tuple,
  flow,
  identity,
  pipe,
} from "effect";

export type Board = Row[];
export type Row = Cell[];

export type Cell = Data.TaggedEnum<{ Empty: {}; Player1: {}; Player2: {} }>;

export const { Empty, Player1, Player2 } = Data.taggedEnum<Cell>();

export const buildBoard = (width: number, height: number): Board =>
  ReadonlyArray.makeBy(height, () =>
    ReadonlyArray.makeBy(width, () => Empty())
  );

type ColIdx = number;
type RowIdx = number;
type Position = Data.Data<readonly [ColIdx, RowIdx]>;

export const updateBoard =
  ([colIdx, rowIdx]: Position, cell: Cell) =>
  (board: Board): Board => {
    return pipe(
      board,
      ReadonlyArray.modify(rowIdx, ReadonlyArray.replace(colIdx, cell))
    );
  };

type Side = "Player1" | "Player2";

const getPositionsForSide =
  (side: Side) =>
  (board: Board): Position[] => {
    return pipe(
      board,
      ReadonlyArray.reduce<Position[], Row>([], (acc, row, rowIdx) => {
        const next = pipe(
          row,
          ReadonlyArray.reduce<Position[], Cell>([], (accRow, cell, colIdx) =>
            pipe(
              Match.value(cell),
              Match.tag(side, () => [...accRow, Data.tuple(colIdx, rowIdx)]),
              Match.tag("Empty", () => accRow),
              Match.exhaustive
            )
          )
        );

        return [...acc, ...next];
      })
    );
  };

const mapBoard = (f: (cell: Cell) => Cell) =>
  ReadonlyArray.map<Board, Row>(ReadonlyArray.map(f));

const boardWithoutCellsForSide = (side: Side) =>
  pipe(
    flow(
      Match.value<Cell>,
      Match.tag(side, () => Empty()),
      Match.orElse(identity)
    ),
    mapBoard
  );

const tupleToDataTuple = (v: [number, number]) => Data.tuple(...v);

export const progressBoard =
  (side: Side) =>
  (board: Board): Board =>
    pipe(
      board,
      getPositionsForSide(side),
      ReadonlyArray.map(
        flow(
          Tuple.mapSecond((v) => v + 1),
          tupleToDataTuple
        )
      ),
      ReadonlyArray.reduce<Board, Position>(
        boardWithoutCellsForSide(side)(board),
        (acc, postion) => {
          return updateBoard(postion, Player1())(acc);
        }
      )
    );
