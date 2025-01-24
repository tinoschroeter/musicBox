# Music Box

Is only a backend for [mfp music for programming](https://github.com/tinoschroeter/mfp) client.

All MP3's in the music folder are provided as an RSS feed and can be streamed in mfp.

## Uploading files

```bash
yt-dlp --embed-metadata --extract-audio --audio-format mp3 'https://www.youtube.com/watch?v=RC7CmEHuurQ'
kubectl cp Later_Bitches.mp3 musicbox-app-6495cc6dd5-jn8vk:/data/music/best_songs/
```

**Later Bitches ;)**
