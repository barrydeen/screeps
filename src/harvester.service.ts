import { CreepType } from "./creep.interface";
import * as _ from "lodash";
import config from "./config";
import { HarvesterState } from "./harvester.interface";
import { moveUpgraderToTarget } from "./upgrader.service";
import { selectSourceAssignment } from "./autospawn.service";
import { UpgraderState } from "./upgrader.interface";

export function getHarvesterCount(): number {
  var harvesters = _.filter(
    Game.creeps,
    (creep) => creep.memory.type === CreepType.Harvester
  );

  return harvesters.length;
}

export function getAllHarvesters(): Creep[] {
  var harvesters = _.filter(
    Game.creeps,
    (creep) => creep.memory.type === CreepType.Harvester
  );

  return harvesters;
}

export function getHarvesterCountBySource(source: Source) {
  var harvesters = _.filter(
    Game.creeps,
    (creep) =>
      creep.memory.assignedSourceId === source.id &&
      creep.memory.type === CreepType.Harvester
  );

  return harvesters.length;
}

export function moveHarvesterToSource(creep: Creep) {
  var source: any = Game.getObjectById(creep.memory.assignedSourceId);
  if (creep.harvest(source) === ERR_NOT_IN_RANGE) {
    creep.moveTo(source, { visualizePathStyle: { stroke: "#ffaa00" } });
  }

  if (creep.harvest(source) === OK && HarvesterState.Returning) {
    creep.say("Harvest");
    creep.memory = { ...creep.memory, state: HarvesterState.Harvesting };
  }
}

export function getHarvesterReturnTargets(creep: Creep) {
  var targets = creep.room.find(FIND_STRUCTURES, {
    filter: (structure) => {
      return (
        (structure.structureType == STRUCTURE_EXTENSION ||
          structure.structureType == STRUCTURE_SPAWN) &&
        structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0
      );
    },
  });
  return targets;
}

export function moveHarvesterToTarget(creep: Creep) {
  var targets = getHarvesterReturnTargets(creep);

  // If there are targets to drop off our energy, do it.
  if (targets.length > 0) {
    if (creep.transfer(targets[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
      creep.moveTo(targets[0], { visualizePathStyle: { stroke: "#ffffff" } });
    }

    if (
      creep.transfer(targets[0], RESOURCE_ENERGY) === OK &&
      creep.memory.state === HarvesterState.Harvesting
    ) {
      creep.say("Returning Energy");
      creep.memory = { ...creep.memory, state: HarvesterState.Returning };
    }
  } else {
    // There is nowhere to return the energy, so become an upgrader.
    creep.memory = {
      type: CreepType.Upgrader,
      state: UpgraderState.Returning,
      assignedSourceId: selectSourceAssignment().id,
    };
    creep.say("Becoming an upgrader");
    moveUpgraderToTarget(creep);
  }
}

export function createHarvester(source: Source): Creep {
  var harvesterName: string = "harvester" + Math.floor(Date.now() / 1000);

  Game.spawns[config.homeRoomSpawnName].spawnCreep(
    [WORK, CARRY, MOVE],
    harvesterName,
    {
      memory: {
        type: CreepType.Harvester,
        assignedSourceId: source.id,
        state: HarvesterState.Harvesting,
      },
    }
  );

  return Game.creeps[harvesterName];
}
