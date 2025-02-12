function createUpdateHandler(stateHandler) {
  return function(event) {
    console.log(event.data)
    if(!event.data) {
      return
    }

    const {msg, data} = JSON.parse(event.data)

    if(msg !== 'update') {
      return
    }

    stateHandler.updateState(data)
  }
}

export function createSocket(stateHandler){
  const ws = new WebSocket('/')

  const updateHandler = createUpdateHandler(stateHandler)

  ws.addEventListener('open', updateHandler)
  ws.addEventListener('message', updateHandler)
  
  return {
    ws,
    createPlayer: (playerName) => {
      const payload = JSON.stringify({msg: 'createPlayer', data: {playerName}})
      ws.send(payload)
    },
    
    createGame: () => {
      const payload = JSON.stringify({msg: 'createGame', data: {}})
      ws.send(payload)
    },
    
    joinGame: (gameId) => {
      const payload = JSON.stringify({msg: 'joinGame', data: {gameId}})
      ws.send(payload)
    },
    
    makeMove: (move) => {
      const payload = JSON.stringify({msg: 'makeMove', data: {move}})
      ws.send(payload)
    },
    
    highFive: () => {
      const payload = JSON.stringify({msg: 'highFive', data: {}})
      ws.send(payload)
    },

  }
}

