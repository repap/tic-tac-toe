export function createDialogSubmitHandler(socket) {
  return function (event) {
    event.preventDefault()

    const playerName = event.target.elements['player-name'].value;
    
    socket.createPlayer(playerName)
    event.target.parentNode.close()
  }
}

export function createCreateGameHandler(socket) {
  return function(event) {
    event.preventDefault()

    socket.createGame()
  }
}

export function createJoinGameHandler(socket) {
  return function(event) {
    event.preventDefault()

    socket.joinGame()
  }
}