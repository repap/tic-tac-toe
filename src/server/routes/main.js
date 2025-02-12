import { createSocket } from "./socket.js";
import { createStateHandler } from "./state.js";
import {
  createCreateGameHandler,
  createDialogSubmitHandler,
  createJoinGameHandler,
} from "./guiHandler.js";
import { updateGame, updateGuiState } from "./gui.js";
import { createGameElement } from "./game.js";

(() => {
  const stateHandler = createStateHandler([
    updateGuiState,
    updateGame,
  ]);

  const socket = createSocket(stateHandler);

  createGameElement(socket);

  document.querySelector("dialog form")
    .addEventListener("submit", createDialogSubmitHandler(socket));

  document.querySelector("#welcome button#create-game")
    .addEventListener("click", createCreateGameHandler(socket));

  document.querySelector("#welcome form#join-game")
    .addEventListener("submit", createJoinGameHandler(socket));

  document.querySelectorAll(".gui-state")
    .forEach((e) => e.classList.add("hidden"));
})();
