const allSockets: WebSocket[] = [];

const gameField = new Array(9).fill(null).map((_, i) => [i, ""]);

export function handleWebsocket(req: Request): Response {
  const { socket, response } = Deno.upgradeWebSocket(req);

  allSockets.push(socket);

  socket.addEventListener("open", () => {
    console.log("a client connected!");
    const payload = JSON.stringify({
      msg: "update",
      data: { guiState: "createPlayer", gameField },
    });
    socket.send(payload);
  });

  socket.addEventListener("message", (event) => {
    const { msg, data } = JSON.parse(event.data);

    switch (true) {
      case msg === "createPlayer":
        return createPlayerHandler(socket, data);
      case msg === "createGame":
        return createGameHandler(socket);
      case msg === "joinGame":
        return joinGameHandler(socket, data);
      case msg === "makeMove":
        return makeMoveHandler(socket, data);
    }
  });

  socket.addEventListener("close", () => {
    console.log("a client disconnected!");
  });

  return response;
}

function createPlayerHandler(socket: WebSocket, data: { playerName: string }) {
  if (!data.playerName) {
    return console.error("no playername");
  }

  const payload = JSON.stringify({
    msg: "update",
    data: { guiState: "welcome" },
  });
  socket.send(payload);
}

function createGameHandler(socket: WebSocket) {
  const payload = JSON.stringify({ msg: "update", data: { guiState: "game" } });
  socket.send(payload);
}

function joinGameHandler(socket: WebSocket, data: { gameId: string }) {
  if (!data?.gameId) {
    return console.error("no gameId");
  }

  const payload = JSON.stringify({ msg: "update", data: { guiState: "game" } });
  socket.send(payload);
}

function makeMoveHandler(socket: WebSocket, data: { move: number }) {
  console.log(data);
  if (data?.move == undefined || typeof data?.move !== "number") {
    return console.error("no field");
  }

  gameField[data.move] = [data.move, "X"];

  const payload = JSON.stringify({
    msg: "update",
    data: { guiState: "game", gameField },
  });
  socket.send(payload);
}
