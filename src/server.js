import http from "http"

import app from "./app.js"
import { connectDB } from "./config/db.js"

import SocketServer from "./socket/SocketServer.js"

async function startServer()
{
    await connectDB();

    const server = http.createServer(app);

    new SocketServer(server);

    server.listen(process.env.PORT || 3000, () => {
        console.log(`Server running on port ${process.env.PORT}`);
    })
}

startServer();