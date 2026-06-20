import app from "./app.js"
import { connectDB } from "./config/db.js"

async function startServer()
{
    await connectDB();

    app.listen(process.env.PORT || 3000, () => {
        console.log(`Server running on port ${process.env.PORT}`);
    })
}

startServer();