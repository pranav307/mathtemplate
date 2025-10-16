import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import interestRoutes from "./routes/interest.js";
import trigRoutes from "./routes/trigno.js";


dotenv.config();


const app = express();
const PORT = process.env.PORT || 5000;


app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


// Static example frontend
app.use(express.static("public"));


// Routes
app.use("/api/interest", interestRoutes);
app.use("/api/trig", trigRoutes);


app.get("/", (req, res) => {
res.sendFile(new URL("./public/index.html", import.meta.url).pathname);
});


app.use((err, req, res, next) => {
console.error(err.stack);
res.status(500).json({ error: true, message: "Internal Server Error" });
});


app.listen(PORT, () => console.log(`Server listening on port ${PORT} http://localhost:5000/`));