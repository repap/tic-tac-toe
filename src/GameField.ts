import {PlayerValue} from './Player'

export type GameFieldValue = PlayerValue | null

export class GameField {
  private field: GameFieldValue[] = Array(9).fill(null)

  public getField(): GameFieldValue[] {
    return this.field
  }

  public setField(index: number, value: PlayerValue): [GameField, null | Error] {
    if(index < 0 || index > 8) {
      return [this, new Error('Invalid index')]
    }
    if(this.field[index] !== null) {
      return [this, new Error('Field is already taken')]
    }
    this.field[index] = value

    return [this, null]
  }

  public getRows(): GameFieldValue[][] {
    return [
      this.field.slice(0, 3),
      this.field.slice(3, 6),
      this.field.slice(6, 9)
    ]
  }

  public getColumns(): GameFieldValue[][] {
    return [
      [this.field[0], this.field[3], this.field[6]],
      [this.field[1], this.field[4], this.field[7]],
      [this.field[2], this.field[5], this.field[8]]
    ]
  }

  public getDiagonals(): GameFieldValue[][] {
    return [
      [this.field[0], this.field[4], this.field[8]],
      [this.field[2], this.field[4], this.field[6]]
    ]
  }

  public getRowByIndex(index: number): GameFieldValue[] {
    if(index < 0 || index > 2) {
      throw new Error('Invalid index')
    }
    return this.getRows()[index]
  }

  public getColumnByIndex(index: number): GameFieldValue[] {
    if(index < 0 || index > 2) {
      throw new Error('Invalid index')
    }
    return this.getColumns()[index]
  }

  public getDiagonalByDirection(direction: 'top-left/bottom-right' | 'top-right/bottom-left'): GameFieldValue[] {
    switch (direction) {
      case 'top-left/bottom-right':
        return this.getDiagonals()[0]
      case 'top-right/bottom-left':
        return this.getDiagonals()[1]
      default: throw new Error('Invalid direction')
    }
  }
}