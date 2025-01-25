FROM node:22 AS app

RUN apt-get update && apt-get install ffmpeg -y && \
  rm -rf /var/lib/apt/lists/*

RUN curl -L https://github.com/yt-dlp/yt-dlp/releases/latest/download/yt-dlp -o /usr/local/bin/yt-dlp && \
  chmod +x /usr/local/bin/yt-dlp

WORKDIR /app
COPY ./rename_files.sh /usr/local/bin/rename_files.sh
COPY src .

RUN npm install --production

CMD ["node", "index.js"]
