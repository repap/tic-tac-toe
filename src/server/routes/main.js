import { createSocket } from "./socket.js";
import { createStateHandler } from "./state.js";
import {
createCreateGameHandler,
  createDialogSubmitHandler,
  createJoinGameHandler
} from "./guiHandler.js"
import { updateGuiState } from "./gui.js";
    
const stateHandler = createStateHandler([
  updateGuiState
])

const socket = createSocket(stateHandler)

document.querySelector('dialog form')
  .addEventListener('submit', createDialogSubmitHandler(socket))

document.querySelector('#welcome button#create-game')
  .addEventListener('click', createCreateGameHandler(socket))

document.querySelector('#welcome form#join-game')
  .addEventListener('click', createJoinGameHandler(socket))
