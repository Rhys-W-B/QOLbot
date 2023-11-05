## About

`discord-voip` is a TypeScript implementation of the Discord Voice API for Node.js, forked from `@discordjs/voice`.

**Features:**

- Send and receive\* audio in Discord voice-based channels
- A strong focus on reliability and predictable behaviour
- Horizontal scalability and libraries other than [discord.js](https://discord.js.org/) are supported with custom adapters
- A robust audio processing system that can handle a wide range of audio sources

\*_Audio receive is not documented by Discord so stable support is not guaranteed_

## Installation

**Node.js 16.9.0 or newer is required.**

```sh
npm install discord-voip
yarn add discord-voip
pnpm add discord-voip
```

## Dependencies

This library has several optional dependencies to support a variety
of different platforms. Install one dependency from each of the
categories shown below. The dependencies are listed in order of
preference for performance. If you can't install one of the options,
try installing another.

**Encryption Libraries (npm install):**

- `sodium-native`: ^3.3.0
- `sodium`: ^3.0.2
- `tweetnacl`: ^1.0.3
- `libsodium-wrappers`: ^0.7.9

**Opus Libraries (npm install):**

- `mediaplex`: ^0.0.2
- `@discordjs/opus`: ^0.4.0
- `opusscript`: ^0.0.7
- `@evan/opus`: ^1.0.2

**FFmpeg:**

- [`FFmpeg`](https://ffmpeg.org/) (installed and added to environment)
- `ffmpeg-static`: ^4.2.7 (npm install)
