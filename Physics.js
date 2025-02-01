import Matter from 'matter-js';
import { SCREEN_WIDTH, SCREEN_HEIGHT, BOUNDARY_THICKNESS } from './constants';

const SPEED = 2.5; // Constant speed for smooth motion
const BUFFER = 5; // Small buffer to ensure clean transitions
const OFFSET = 1; // Tiny offset to prevent getting caught on boundaries

const DIRECTIONS = [
  { x: 0, y: SPEED },  // Move Down
  { x: SPEED, y: 0 },  // Move Right
  { x: 0, y: -SPEED }, // Move Up
  { x: -SPEED, y: 0 }, // Move Left
];

let movementIndex = 0; // Tracks the current movement direction
let started = false; // Ensures the player starts completely stationary

const Physics = (entities, { touches, time }) => {
  const { engine } = entities.physics;
  const player = entities.player.body;

  // Ensure the player starts at the **top-left corner** and remains still
  if (!started) {
    Matter.Body.setVelocity(player, { x: 0, y: 0 });
    Matter.Body.setPosition(player, {
      x: BOUNDARY_THICKNESS + OFFSET, // Start slightly off the left border
      y: BOUNDARY_THICKNESS + OFFSET, // Start slightly off the top border
    });

    // Prevent unwanted physics effects (ensuring no size fluctuations)
    Matter.Body.setInertia(player, Infinity); // Stops rotation effects
    Matter.Body.setAngle(player, 0); // Ensures no rotation
  }

  // Start or resume movement when screen is touched
  if (touches.length > 0) {
    const touch = touches[0];
    if (touch.type === 'start') {
      if (!started) {
        started = true;
        Matter.Body.setVelocity(player, DIRECTIONS[movementIndex]); // Start movement
      } else if (movementIndex === 3 && player.position.x <= BOUNDARY_THICKNESS + BUFFER) {
        // If stopped at the left wall, restart movement
        Matter.Body.setVelocity(player, DIRECTIONS[movementIndex]);
      }
    }
  }

  // Only enforce movement logic once the game has started
  if (started) {
    enforceLinearMovement(player);
    checkAndChangeDirection(player);
  }

  Matter.Engine.update(engine, time.delta);
  return entities;
};

// Ensure the player moves in perfectly straight lines (eliminating diagonal drift)
const enforceLinearMovement = (player) => {
  const velocity = DIRECTIONS[movementIndex];

  // Lock Y-position during "Move Left" phase
  if (movementIndex === 3) {
    Matter.Body.setPosition(player, { x: player.position.x, y: BOUNDARY_THICKNESS + OFFSET });
  }

  Matter.Body.setVelocity(player, velocity);
};

// Change direction when reaching set positions & stop at left wall
const checkAndChangeDirection = (player) => {
  if (movementIndex === 0 && player.position.y >= SCREEN_HEIGHT - BOUNDARY_THICKNESS - BUFFER) {
    movementIndex = 1; // Move Right
  } else if (movementIndex === 1 && player.position.x >= SCREEN_WIDTH - BOUNDARY_THICKNESS - BUFFER) {
    movementIndex = 2; // Move Up
  } else if (movementIndex === 2 && player.position.y <= BOUNDARY_THICKNESS + BUFFER) {
    movementIndex = 3; // Move Left

    // Lock Y-position at the top
    Matter.Body.setPosition(player, { x: player.position.x, y: BOUNDARY_THICKNESS + OFFSET });
  } else if (movementIndex === 3 && player.position.x <= BOUNDARY_THICKNESS + BUFFER) {
    // Stop exactly where it started
    Matter.Body.setVelocity(player, { x: 0, y: 0 });
    Matter.Body.setPosition(player, { x: BOUNDARY_THICKNESS + OFFSET, y: BOUNDARY_THICKNESS + OFFSET }); // Ensure exact stop position
    started = false; // Prevent further movement until user touches the screen again
    return; // Exit function early to prevent further movement updates
  }

  enforceLinearMovement(player); // Apply the new direction immediately
};

export default Physics;