import config from "./config";
import { CreepType } from "./creep.interface";

export function selectSourceAssignment(): Source {
  const roomSources =
    Game.spawns[config.homeRoomSpawnName].room.find(FIND_SOURCES);
  const randomSource = Math.floor(Math.random() * roomSources.length);

  return roomSources[randomSource];
}
