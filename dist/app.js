import express, {} from "express";
import cookieParser from "cookie-parser";
import expressFileupload from "express-fileupload";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";
import { sql, getPool } from "./db/Mssql.js";
dotenv.config();
const app = express();
app.use(cors({
    origin: ["https://electric-commercial.vercel.app", "http://localhost:5173"],
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
}));
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.get("/", (_, res) => {
    res.send("API is running....");
});
app.post("/api/upload", (req, res) => {
    const files = req.files?.images;
    if (!files) {
        return res.status(400).json({ message: "No files were uploaded." });
    }
    const list = Array.isArray(files) ? files : [files];
    list.forEach((file) => {
        const uploadPath = path.join(__dirname, "uploads", Date.now() + file.name);
        file.mv(uploadPath, (err) => {
            if (err)
                return res.status(500).json({ error: err.message });
        });
    });
    const uploadedFiles = list.map((file) => ({
        name: file.name,
        mimetype: file.mimetype,
        size: file.size,
    }));
    res.json({ message: "Upload thành công!", files: uploadedFiles });
});
await getPool()
    .then(() => {
    console.log("MSSQL Database connected successfully");
})
    .catch((err) => {
    console.error("Error connecting to MSSQL Database:", err);
});
app.use((req, res, next) => {
    console.log("Time:", Date.now(), req.method, req.url);
    next();
});
app.get("/myjson", (req, res, next) => {
    res.json({ message: "my-api" });
});
if (process.env.NODE_ENV !== "production") {
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => {
        console.log(`Server is running on http://localhost:${PORT}`);
    });
}
export default app;
//# sourceMappingURL=app.js.map