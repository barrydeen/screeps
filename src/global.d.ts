import { HarvesterInterface } from "./harvester.interface";

declare global {
    var homeSpawn: StructureSpawn;
    var allHarvesters: HarvesterInterface[];
}

export {};