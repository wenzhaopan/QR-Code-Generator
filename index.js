import inquirer from 'inquirer';
import qr from "qr-image";
import fs from "fs";
import express from "express";
import bodyParser from "body-parser";
import { dirname } from "path";
import { fileURLToPath } from "url";
const __dirname = dirname(fileURLToPath(import.meta.url));

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({extended:true}));

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});

app.post("/submit", (req, res) => {
  const url = req.body.URL;
  var qr_svg = qr.image(url);
  qr_svg.pipe(fs.createWriteStream("qr_img.png"));
  console.log(url);
  res.sendFile(__dirname + "/qr_img.png");
})