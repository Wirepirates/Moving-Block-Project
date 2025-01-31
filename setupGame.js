// setupGame.js
import createRigidBodies from "./components";
import physicsLoop from "./Physics";

export default function setupGame() {
    let { engine, world, entities } = createRigidBodies();

    return {
        physics: { engine, world },
        entities,
        systems: [physicsLoop(engine)]
    };
}