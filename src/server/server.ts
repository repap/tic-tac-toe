Deno.serve({port: 3000}, (req) => {
  console.log('request received: ', req.url, req.method, req.headers)
  
  if (req.headers.get("upgrade") != "websocket") {
    return new Response(null, { status: 501 });
  }

  const { socket, response } = Deno.upgradeWebSocket(req);

  // We now have access to a standard websocket object.
  // Let's handle the "open" event
  socket.addEventListener("open", () => {
    console.log("a client connected!");
  });

  // We can also handle messages in a similar way. Here we set up
  // a simple ping / pong example.
  socket.addEventListener("message", (event) => {
    if (event.data === "ping") {
      socket.send("pong");
    }
  });

  return response;
})