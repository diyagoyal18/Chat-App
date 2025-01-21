import express from 'express';
import http from 'http';
import { Server } from 'socket.io';
import cors from 'cors';
import * as trpcExpress from '@trpc/server/adapters/express';
import { createExpressMiddleware } from '@trpc/server/adapters/express';
import { appRouter } from './trpc';

const app = express();
app.use(cors());
app.use(express.json());

// tRPC middleware
app.use(
    '/trpc',
    createExpressMiddleware({
        router: appRouter,
        createContext: () => null
    })
);

const server = http.createServer(app);
const io = new Server(server, { cors: { origin: '*' } });

io.on('connection', (socket) => {
    console.log('User connected:', socket.id);

    socket.on('message', (data) => {
        // In a real app, you'd save this to the DB and create notifications
        io.emit('newMessage', data);
    });

    socket.on('typing', (username) => {
        socket.broadcast.emit('userTyping', username);
    });

    socket.on('disconnect', () => {
        console.log('User disconnected:', socket.id);
    });
});

server.listen(3001, () => {
    console.log('Server listening on http://localhost:3001');
});