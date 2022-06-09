import config from "./config";
import { GamePhase, GameStateInterface } from "./game.interface";
import { getHarvesterCount } from "./harvester.service";

export function getGameState(): any {

    //TODO: get all these numbers
    const gameState: GameStateInterface = {
        phase: getGamePhase(),
        harvesters: getHarvesterCount(),
        builders: 0,
        upgraders: 0,
        scouts: 0,
    }

    return gameState;
}

export function getGamePhase(): GamePhase {

    var creeps = Object.keys(Game.creeps);
    if (creeps.length >= config.initialCreepsToChangePhase) {
        return GamePhase.Expanding;
    }

    return GamePhase.Spawning
}