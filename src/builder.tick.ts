import { BuilderState } from "./builder.interface";
import {
  getAllBuilders,
  moveBuilderToSource,
  moveBuilderToTarget,
} from "./builder.service";

export function builderTick() {
  const allBuilders = getAllBuilders();
  for (const i in allBuilders) {
    var builder = allBuilders[i];

    if (
      builder.memory.state === BuilderState.Building &&
      builder.store[RESOURCE_ENERGY] == 0
    ) {
      builder.memory = { ...builder.memory, state: BuilderState.Harvesting };
      builder.say("🔄 harvest");
    }

    if (
      builder.memory.state === BuilderState.Harvesting &&
      builder.store.getFreeCapacity() === 0
    ) {
      builder.memory = { ...builder.memory, state: BuilderState.Building };
      builder.say("🚧 build");
    }

    builder.memory.state === BuilderState.Building
      ? moveBuilderToTarget(builder)
      : moveBuilderToSource(builder);
  }
}
