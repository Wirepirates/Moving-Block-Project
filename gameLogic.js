import Matter from 'matter-js';
import { SCREEN_WIDTH, SCREEN_HEIGHT, BOUNDARY_THICKNESS } from './constants';
import { createBoundary, createPlayer } from './components';

export const createEntities = () => {
  const engine = Matter.Engine.create({ enableSleeping: false });
  const world = engine.world;

  const entities = {
    physics: { engine, world },
    started: false, // Flag to track if the game has started
  };

  // Top Boundary
  entities.boundaryTop = createBoundary(
    world,
    'red',
    { x: SCREEN_WIDTH / 2, y: 0 },
    { width: SCREEN_WIDTH, height: BOUNDARY_THICKNESS },
    'BoundaryTop'
  );

  // Bottom Boundary
  entities.boundaryBottom = createBoundary(
    world,
    'red',
    { x: SCREEN_WIDTH / 2, y: SCREEN_HEIGHT },
    { width: SCREEN_WIDTH, height: BOUNDARY_THICKNESS },
    'BoundaryBottom'
  );

  // Left Boundary
  entities.boundaryLeft = createBoundary(
    world,
    'red',
    { x: 0, y: SCREEN_HEIGHT / 2 },
    { width: BOUNDARY_THICKNESS, height: SCREEN_HEIGHT },
    'BoundaryLeft'
  );

  // Right Boundary
  entities.boundaryRight = createBoundary(
    world,
    'red',
    { x: SCREEN_WIDTH, y: SCREEN_HEIGHT / 2 },
    { width: BOUNDARY_THICKNESS, height: SCREEN_HEIGHT },
    'BoundaryRight'
  );

  // Player Square
  const playerSize = 30; // Size of the player square
  const playerPosition = {
    x: BOUNDARY_THICKNESS + playerSize / 2, // Top-left corner, not touching the left boundary
    y: BOUNDARY_THICKNESS + playerSize / 2, // Top-left corner, not touching the top boundary
  };

  // Create the player as a dynamic body
  entities.player = createPlayer(
    world,
    'blue', // Color of the player
    playerPosition, // Position
    { width: playerSize, height: playerSize } // Size
  );

  return entities;
};