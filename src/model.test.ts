import { progressBoard, Empty, Player1 } from "./model";
import { describe, it, expect } from "vitest";

describe("progress", () => {
  it("should progress the board", () => {
    const board = [
      [Player1(), Empty()],
      [Empty(), Empty()],
    ];

    const expected = [
      [Empty(), Empty()],
      [Player1(), Empty()],
    ];

    expect(progressBoard("Player1")(board)).toEqual(expected);
  });
});
