import fs_p from "fs/promises";
import express from "express";
import { upload } from "./utils.js"
import path from "path";
import fs from "fs";

const app = express();

app.get("/", (req, res) => {
    res.sendFile(path.join(process.cwd(), "static/page.html"));
})

app.post("/upload", upload.single("file"), (req, res) => {
    res.status(200).json({});
})

app.get("/images", async (req, res) => {
    const files = await fs_p.readdir(path.join(process.cwd(), "/images"));
    res.status(200).json(files.map((filename) => `http://localhost:3000/images/${filename}`));
})

app.get("/images/:filename", (req, res) => {
    const filename = req.params.filename;
    const stream = fs.createReadStream(`images/${filename}`);
    stream.pipe(res);
})

app.get("/delete-images/:filename", async (req, res) => {
    const deleted = await fs_p.unlink(path.join(process.cwd(), "images", req.params.filename));
    res.status(200).json({ message: `deleted ${req.params.filename}` });
})


app.listen(3000, (err) => {
    console.log(err ? err : "listening");
})
