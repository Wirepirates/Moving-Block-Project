import Matter from 'matter-js';
import { BOUNDARY_THICKNESS } from './constants'; // Import BOUNDARY_THICKNESS

const Physics = (entities, { touches, time }) => {
  const { engine, world } = entities.physics;
  const player = entities.player.body;

  // Handle screen touch to start movement
  if (touches.length > 0 && !entities.started) {
    const touch = touches[0];
    if (touch.type === 'start') {
      // Set the started flag to true
      entities.started = true;
    }
  }

  // If the game hasn't started, keep the player stationary
  if (!entities.started) {
    Matter.Body.setVelocity(player, { x: 0, y: 0 });
    Matter.Body.setPosition(player, {
      x: BOUNDARY_THICKNESS + 15, // Adjust based on player size
      y: BOUNDARY_THICKNESS + 15, // Adjust based on player size
    });
  } else {
    // Apply initial downward velocity
    Matter.Body.setVelocity(player, { x: 0, y: 2 });
  }

  // Update the physics engine
  Matter.Engine.update(engine, time.delta);

  return entities;
};

export default Physics;