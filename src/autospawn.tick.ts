import { selectSourceAssignment } from "./autospawn.service";
import { createBuilder, getBuilderCount } from "./builder.service";
import config from "./config";
import { GamePhase } from "./game.interface";
import { getGameState } from "./game.service";
import { createHarvester, getHarvesterCount } from "./harvester.service";
import { createUpgrader, getUpgraderCount } from "./upgrader.service";

export function autoSpawnTick() {
  switch (getGameState().phase) {
    case GamePhase.Spawning:
      tickSpawningPhase();
      break;

    case GamePhase.Expanding:
      tickExpandingPhase();
      break;
  }
}

function tickSpawningPhase(): void {
  var sourceCount =
    Game.spawns[config.homeRoomSpawnName].room.find(FIND_SOURCES).length;

  if (
    Game.spawns[config.homeRoomSpawnName].store[RESOURCE_ENERGY] >
    config.energyCostPerCreep
  ) {
    // Saturate with harvesters first.

    if (getHarvesterCount() < config.harvestersPerSource * sourceCount) {
      var harvester = createHarvester(selectSourceAssignment());
      console.log("New Harvester: " + harvester.name);
    }

    if (
      getHarvesterCount() === config.harvestersPerSource * sourceCount &&
      getUpgraderCount() < config.upgradersPerSource * sourceCount
    ) {
      var upgrader = createUpgrader(selectSourceAssignment());
      console.log("New Upgrader: " + upgrader.name);
    }
  }

  // Once upgraders are saturatured, make builders.
  if (
    getUpgraderCount() === config.upgradersPerSource * sourceCount &&
    getBuilderCount() < config.buildersPerSource * sourceCount
  ) {
    var builder = createBuilder(selectSourceAssignment());
    console.log("New Builder: " + builder.name);
  }
}

function tickExpandingPhase(): void {
  //
}
