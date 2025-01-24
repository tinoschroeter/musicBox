const express = require("express");
const app = express();

const pinoHttp = require("pino-http");
const pino = require("pino");
const logger = pino();

const fs = require("fs");
const path = require("path");
const RSS = require("feed").Feed;

const musicDir = process.env.MUSIC_DIR || "./music";
const hostName = process.env.HOST_NAME || "http://localhost:3000";

app.use(express.json());
app.use(pinoHttp({ logger }));
app.use(express.static(musicDir));

const createRSSFeed = (folderPath, folderName) => {
  const feed = new RSS({
    title: folderName,
    description: `MP3 files in the folder ${folderName}`,
    link: `${hostName}/${folderName}`,
  });

  const mp3Files = fs
    .readdirSync(folderPath)
    .filter((file) => path.extname(file).toLowerCase() === ".mp3");

  mp3Files.forEach((file) => {
    const filePath = path.join(folderPath, file);
    const stats = fs.statSync(filePath);

    feed.addItem({
      title: file,
      id: filePath,
      link: `${hostName}/${folderName}/${file}`,
      description: `MP3-File: ${file}`,
      date: stats.mtime,
    });
  });

  return feed.rss2();
};

const generateFeeds = () => {
  const feeds = {};
  fs.readdirSync(musicDir)
    .filter((folder) => fs.statSync(path.join(musicDir, folder)).isDirectory())
    .forEach((folder) => {
      const folderPath = path.join(musicDir, folder);
      feeds[folder] = createRSSFeed(folderPath, folder);
    });

  return feeds;
};

app.get("/", (_req, res) => {
  const feeds = generateFeeds();
  const list = Object.keys(feeds).map(
    (item) => `${hostName}/${item}/music.rss`,
  );
  res.json(list);
});

app.get("/:folder/music.rss", (req, res) => {
  const feeds = generateFeeds();
  const feed = feeds[req.params.folder];

  if (feed) {
    res.set("Content-Type", "application/rss+xml");
    return res.send(feed);
  }

  res.status(404).send("Feed not found");
});

app.listen(3000, () => logger.info("Server is running on port 3000"));
