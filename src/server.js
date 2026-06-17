import { connectDB } from "./config/db.js"

async function startServer() {
    await connectDB();
    console.log("Server Started");
}

startServer();