import express, {} from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();
const app = express();
app.use(cors({
    origin: ["https://electric-commercial.vercel.app", "http://localhost:5173"],
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
}));
app.use(cookieParser());
//app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.get("/", (_, res) => {
    res.send("API is running....");
});
if (process.env.NODE_ENV !== "production") {
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => {
        console.log(`Server is running on http://localhost:${PORT}`);
    });
}
export default app;
//# sourceMappingURL=app.js.map