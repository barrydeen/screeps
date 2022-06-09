
import config from "./config";
import { gameTick } from "./game.tick"

module.exports.loop = function () {
    gameTick();
}