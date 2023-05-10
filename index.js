const express = require("express");
const axios = require("axios");
const https = require("https");
const fs = require("fs");
const path = require("path");
const isUrl = require("is-url");
const { isImageType } = require("./helpers");
require("dotenv").config();

const app = express();
const port = process.env.PORT || 8443;

const keyPath = path.join(process.cwd(), "certs", "cert.key");
const certPath = path.join(process.cwd(), "certs", "cert.crt");

const parameters = {
  key: fs.readFileSync(keyPath, "utf-8"),
  cert: fs.readFileSync(certPath, "utf-8"),
};

app.get("/", async (req, res) => {
  try {
    const url = req.url.slice(6);
    if (!isUrl(url)) return res.status(400).send("Invalid URL");

    const response = await axios.get(url, { responseType: "arraybuffer" });
    const fileType = response.headers["content-type"];
    const isValidType = isImageType(fileType);
    if (!isValidType) return res.status(400).send("Invalid file type");

    res.contentType(fileType);
    res.send(response.data);
  } catch (error) {
    console.log("ERR FROM FILE PROXY SERVER ==> ", error.message);
    res.status(400).send(error.message);
  }
});

const server = https.createServer(parameters, app);
server.listen(port, () => {
  console.log(`Server is listening at port ${port}`);
});
