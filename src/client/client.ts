const response = await fetch("http://localhost:3000/start");

console.log(response.status); // 200
console.log(response.statusText); // OK
console.log(await response.text()); // Hello Deno!

const ws = new WebSocket("ws://localhost:3000");

ws.addEventListener("open", () => {
  console.log("connected to server!");
  ws.send("ping");
});

ws.addEventListener("message", (event) => {
  console.log(event.data); // pong
});

ws.addEventListener("close", () => {
  console.log("disconnected from server!");
});

ws.addEventListener("error", (event) => {
  console.log("error:", event);
});
