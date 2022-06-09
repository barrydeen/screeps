import {
  getAllHarvesters,
  moveHarvesterToSource,
  moveHarvesterToTarget,
} from "./harvester.service";

export function harvesterTick() {
  const allHarvesters = getAllHarvesters();
  for (const i in allHarvesters) {
    var harvester = allHarvesters[i];
    harvester.store.getFreeCapacity() > 0
      ? moveHarvesterToSource(harvester)
      : moveHarvesterToTarget(harvester);
  }
}
