const allSockets:WebSocket[] = []

export function handleWebsocket(req: Request): Response {
  const { socket, response } = Deno.upgradeWebSocket(req);

  allSockets.push(socket)

  socket.addEventListener("open", () => {
    console.log("a client connected!");
    allSockets.forEach(s => s.send(JSON.stringify({ msg: 'connectd' })))
  });

  socket.addEventListener("message", (event) => {
    const recievedMsg = JSON.parse(event.data).msg
    const msg = JSON.stringify({ msg: `recieved messge: ${recievedMsg}` })
    allSockets.forEach(s => s.send(msg))

  });

  socket.addEventListener("close", () => {
    console.log("a client disconnected!");
    const index = allSockets.indexOf(socket);
    if (index !== -1) {
      allSockets.splice(index, 1);
    }

    allSockets.forEach(s => s.send(JSON.stringify({msg: 'client left'})))
  });

  return response;
}