import { CreepType } from "./creep.interface";
import * as _ from "lodash";
import config from "./config";
import { UpgraderState } from "./upgrader.interface";

export function getUpgraderCount(): number {
  var upgraders = _.filter(
    Game.creeps,
    (creep) => creep.memory.type === CreepType.Upgrader
  );

  return upgraders.length;
}

export function getAllUpgraders(): Creep[] {
  var upgraders = _.filter(
    Game.creeps,
    (creep) => creep.memory.type === CreepType.Upgrader
  );

  return upgraders;
}

export function getUpgraderCountBySource(source: Source) {
  var upgraders = _.filter(
    Game.creeps,
    (creep) =>
      creep.memory.assignedSourceId === source.id &&
      creep.memory.type === CreepType.Upgrader
  );

  return upgraders.length;
}

export function moveUpgraderToSource(creep: Creep) {
  var source: any = Game.getObjectById(creep.memory.assignedSourceId);
  if (creep.harvest(source) === ERR_NOT_IN_RANGE) {
    creep.moveTo(source, { visualizePathStyle: { stroke: "#ffaa00" } });
  }
}

export function moveUpgraderToTarget(creep: Creep) {
  if (creep.room.controller) {
    if (creep.upgradeController(creep.room.controller) === ERR_NOT_IN_RANGE) {
      creep.moveTo(creep.room.controller, {
        visualizePathStyle: { stroke: "#ffffff" },
      });
    }
  }
}

export function createUpgrader(source: Source): Creep {
  var upgraderName: string = "upgrader" + Math.floor(Date.now() / 1000);

  Game.spawns[config.homeRoomSpawnName].spawnCreep(
    [WORK, CARRY, MOVE],
    upgraderName,
    {
      memory: {
        type: CreepType.Upgrader,
        assignedSourceId: source.id,
        state: UpgraderState.Harvesting,
      },
    }
  );
  return Game.creeps[upgraderName];
}

export function setUpgraderState(state: UpgraderState, creep: Creep) {
  creep.memory.state = state;
}
