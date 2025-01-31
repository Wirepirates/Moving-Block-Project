import Matter from 'matter-js';
import React from 'react';
import { View } from 'react-native';

// Boundary Component (unchanged)
const Boundary = (props) => {
  const width = props.body.bounds.max.x - props.body.bounds.min.x;
  const height = props.body.bounds.max.y - props.body.bounds.min.y;

  const xPos = props.body.position.x - width / 2;
  const yPos = props.body.position.y - height / 2;

  return (
    <View
      style={{
        position: 'absolute',
        left: xPos,
        top: yPos,
        width: width,
        height: height,
        backgroundColor: props.color || 'red',
      }}
    />
  );
};

// Player Component
const Player = (props) => {
  const width = props.body.bounds.max.x - props.body.bounds.min.x;
  const height = props.body.bounds.max.y - props.body.bounds.min.y;

  const xPos = props.body.position.x - width / 2;
  const yPos = props.body.position.y - height / 2;

  return (
    <View
      style={{
        position: 'absolute',
        left: xPos,
        top: yPos,
        width: width,
        height: height,
        backgroundColor: props.color || 'blue',
      }}
    />
  );
};

// Boundary Factory (unchanged)
export const createBoundary = (world, color, pos, size, label) => {
  const boundary = Matter.Bodies.rectangle(pos.x, pos.y, size.width, size.height, {
    label,
    isStatic: true,
  });
  Matter.World.add(world, boundary);
  return { body: boundary, color: color || 'red', pos, renderer: <Boundary /> };
};

// Player Factory
export const createPlayer = (world, color, pos, size) => {
  const player = Matter.Bodies.rectangle(pos.x, pos.y, size.width, size.height, {
    label: 'Player',
    isStatic: false, // Always dynamic
    restitution: 1, // Bounciness
  });
  Matter.World.add(world, player);
  return { body: player, color: color || 'blue', pos, renderer: <Player /> };
};