import { GameField } from './GameField';
import { Player } from './Player';

type Winner = Player | 'Draw' | null

export class GameState {
  private winner: Winner = null

  constructor(
    public readonly players: [player1: Player, player2: Player],
    private readonly gameField: GameField = new GameField(),
    private currentPlayer: Player = players[0],
  ) {}
  
  updateGameField(index: number): [any, any] {
    return this.gameField.setField(index, this.currentPlayer.name)
  }

  public getWinner(): Winner {
    if (this.checkWin()) {
      this.winner = this.currentPlayer
      return this.winner
    }

    if (this.gameField.getField().every((field) => field !== null)) {
      return 'Draw'
    }

    return null
  }

  public switchPlayer(): Player {
    this.currentPlayer = this.currentPlayer === this.players[0] ? this.players[1] : this.players[0]
    return this.currentPlayer
  }

  public createGameStateCopy(): GameState {
    return new GameState(this.players, this.gameField, this.currentPlayer)
  }

  private checkWin(): boolean {
    const winConditions = [
      ...this.gameField.getRows(),
      ...this.gameField.getColumns(),
      ...this.gameField.getDiagonals()
    ]

    return winConditions.some((condition) => {
      return condition.every((field) => field === this.currentPlayer.name)
    })
  }
}