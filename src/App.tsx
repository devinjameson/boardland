import { For } from "solid-js";
import * as Model from "./model";

const board = Model.buildBoard(10, 10);

function App() {
  return (
    <div class="flex justify-center items-center h-screen">
      <div class="flex flex-col">
        <For each={board}>
          {(row, rowIdx) => (
            <div class="flex">
              <For each={row}>
                {(cell, colIdx) => <div class="w-8 h-8 border border-black" />}
              </For>
            </div>
          )}
        </For>
      </div>
    </div>
  );
}

export default App;
