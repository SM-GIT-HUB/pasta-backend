import { Server } from "socket.io"

import socketAuth from "./SocketAuth.js"

class SocketServer {
    constructor(httpServer)
    {
        this.io = new Server(httpServer, {
            cors: {
                origin: "*"
            }
        })

        this.io.use(socketAuth);

        this.io.on("connection", socket => {
            console.log("Connected:", socket.user.email);
        })
    }
}

export default SocketServer