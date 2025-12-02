# Tic-Tac-Toe WebSocket Game

A real-time multiplayer Tic-Tac-Toe game built with Node.js, Express, and WebSockets. Players can create games, join rooms, and play in real-time with WebSocket communication.

## Features

- User authentication (signup/signin) with JWT
- Game room creation and joining
- Real-time multiplayer gameplay via WebSocket
- Turn-based game logic with win detection
- Draw detection

## Tech Stack

- **Node.js** - Runtime environment
- **Express** - REST API framework
- **WebSocket (ws)** - Real-time communication
- **MongoDB (Mongoose)** - Database
- **JWT** - Authentication
- **Zod** - Input validation
- **dotenv** - Environment variables


## Game Flow

1. User signs up/signs in to get a JWT token
2. User creates a game room via `/createGame`
3. User connects to WebSocket server with token and gameId
4. First player waits for second player to join
5. When both players join, game starts
6. Players take turns making moves via WebSocket
7. Server validates moves and broadcasts updates
8. Game ends when there's a winner or draw

## License

ISC
