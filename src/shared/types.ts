export type UUID = ReturnType<typeof crypto.randomUUID>;

export interface Game {
  id: UUID;
  name: string;
}

export interface Player {
  id: UUID;
  name: string;
}

export interface GameRoom {
  id: UUID;
  players: Player[];
  game: Game;
}
