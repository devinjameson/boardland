import { For } from "solid-js";
import * as Model from "./model";
import { pipe, Match } from "effect";
import cn from "classnames";

const board = pipe(
  Model.buildBoard(10, 10),
  Model.updateBoard([2, 3], Model.Player1()),
  Model.updateBoard([3, 5], Model.Player2())
);

const cellToClass = pipe(
  Match.type<Model.Cell>(),
  Match.tag("Empty", () => ""),
  Match.tag("Player1", () => "bg-red-500"),
  Match.tag("Player2", () => "bg-blue-500"),
  Match.exhaustive
);

function App() {
  return (
    <div class="flex justify-center items-center h-screen">
      <div class="flex flex-col">
        <For each={board}>
          {(row) => (
            <div class="flex">
              <For each={row}>
                {(cell) => {
                  const color = cellToClass(cell);
                  const className = cn("w-12 h-12 border border-black", color);

                  return <div class={className} />;
                }}
              </For>
            </div>
          )}
        </For>
      </div>
    </div>
  );
}

export default App;
