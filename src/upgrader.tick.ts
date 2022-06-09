import { UpgraderState } from "./upgrader.interface";
import {
  getAllUpgraders,
  moveUpgraderToSource,
  moveUpgraderToTarget,
} from "./upgrader.service";

export function upgraderTick() {
  const allUpgraders = getAllUpgraders();
  for (const i in allUpgraders) {
    var upgrader = allUpgraders[i];

    if (
      upgrader.memory.state === UpgraderState.Upgrading &&
      upgrader.store[RESOURCE_ENERGY] == 0
    ) {
      upgrader.memory = { ...upgrader.memory, state: UpgraderState.Harvesting };
      upgrader.say("🔄 harvest");
    }

    if (
      upgrader.memory.state === UpgraderState.Harvesting &&
      upgrader.store.getFreeCapacity() === 0
    ) {
      upgrader.memory = { ...upgrader.memory, state: UpgraderState.Upgrading };
      upgrader.say("⚡ upgrade");
    }

    upgrader.memory.state === UpgraderState.Upgrading
      ? moveUpgraderToTarget(upgrader)
      : moveUpgraderToSource(upgrader);
  }
}
