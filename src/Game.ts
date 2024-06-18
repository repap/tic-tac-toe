import { GameState } from './GameState'
import { Player } from './Player';

export class Game {
  constructor(
    private readonly _players: [player1: Player, player2: Player],
    private readonly _gameState: GameState = new GameState(_players),
  ) {}

  public nextRound(index: number): GameState | Error {
      const [_, error] = this._gameState.updateGameField(index)

      if(error !== null) {
        return error
      }

      const winner = this._gameState.getWinner()

      if(winner !== null) {
        return this._gameState.createGameStateCopy()
      }

      this._gameState.switchPlayer()
      return this._gameState.createGameStateCopy()
  }

  get gameState(): GameState {
    return this._gameState.createGameStateCopy()
  }
}