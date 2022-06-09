import { autoSpawnTick } from "./autospawn.tick";
import { builderTick } from "./builder.tick";
import { harvesterTick } from "./harvester.tick";
import { upgraderTick } from "./upgrader.tick";

export function gameTick(): void {
  autoSpawnTick();
  harvesterTick();
  builderTick();
  upgraderTick();
}
