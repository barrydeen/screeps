export interface GameStateInterface {
    phase: GamePhase,
    harvesters: number,
    builders: number,
    upgraders: number,
    scouts: number,
}

export enum GamePhase {
    Spawning = "SPAWNING",
    Expanding = "EXPANDING",
    Fortifying = "FORTIFYING",
    Conquering = "CONQUERING",
}