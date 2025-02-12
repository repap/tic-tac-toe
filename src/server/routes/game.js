export function createGameElement(socket) {
  const game = document.querySelector("#game-wrapper");

  const elements = new Array(9).fill(null);

  elements.forEach((_, i) => {
    const div = document.createElement("div");

    div.dataset.field = i;

    div.addEventListener("click", (_) => {
      console.log("click");
      const field = parseInt(event.target.dataset.field);

      socket.makeMove(field);
    });
    game.append(div);
  });
}
