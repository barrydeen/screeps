import { CreepType } from "./creep.interface";
import * as _ from "lodash";
import config from "./config";
import { BuilderState } from "./builder.interface";

export function getBuilderCount(): number {
  var builders = _.filter(
    Game.creeps,
    (creep) => creep.memory.type === CreepType.Builder
  );

  return builders.length;
}

export function getAllBuilders(): Creep[] {
  var builders = _.filter(
    Game.creeps,
    (creep) => creep.memory.type === CreepType.Builder
  );

  return builders;
}

export function getBuilderCountBySource(source: Source) {
  var builders = _.filter(
    Game.creeps,
    (creep) =>
      creep.memory.assignedSourceId === source.id &&
      creep.memory.type === CreepType.Builder
  );

  return builders.length;
}

export function moveBuilderToSource(creep: Creep) {
  var source: any = Game.getObjectById(creep.memory.assignedSourceId);
  if (creep.harvest(source) === ERR_NOT_IN_RANGE) {
    creep.moveTo(source, { visualizePathStyle: { stroke: "#ffaa00" } });
  }
}

export function getBuilderConsutrctionSites(creep: Creep) {
  return creep.room.find(FIND_CONSTRUCTION_SITES);
}

export function moveBuilderToTarget(creep: Creep) {
  var targets = getBuilderConsutrctionSites(creep);
  if (targets.length) {
    if (creep.build(targets[0]) === ERR_NOT_IN_RANGE) {
      creep.moveTo(targets[0], { visualizePathStyle: { stroke: "#ffffff" } });
    }
  }
}

export function createBuilder(source: Source): Creep {
  var builderName: string = "builder" + Math.floor(Date.now() / 1000);

  Game.spawns[config.homeRoomSpawnName].spawnCreep(
    [WORK, CARRY, MOVE],
    builderName,
    {
      memory: {
        type: CreepType.Builder,
        assignedSourceId: source.id,
        state: BuilderState.Harvesting,
      },
    }
  );
  return Game.creeps[builderName];
}

export function setBuilderState(state: BuilderState, creep: Creep) {
  creep.memory.state = state;
}
