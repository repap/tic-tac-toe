export type PlayerValue = 'X' | 'O';

export class Player {
    constructor(
        public readonly name: PlayerValue
    ) {}
}