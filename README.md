# Kids TV App

A safe, curated video app for children with no algorithms, no ads, and full parental control.

## Features

- ✅ **Curated Content Only**: Whitelist-based video library
- ✅ **No Algorithms**: Kids see only what parents approve
- ✅ **No Ads**: Clean viewing experience
- ✅ **No Autoplay**: Child controls playback
- ✅ **Parental Lock**: PIN-protected settings
- ✅ **Cross-Platform**: Web, Desktop, TV (Electron)

## Quick Start

### Development

```bash
cd /Users/newuser/clawd/projects/kids-tv-app
npm install
npm run dev
```

Open http://localhost:3000

### Build for Production

```bash
# Static web build
npm run build

# Desktop app (macOS/Windows/Linux)
npm run electron:build

# Kiosk mode for TV/Raspberry Pi
npm run electron:build:kiosk
```

## Adding Content

### Method 1: Edit data/content.json

Add channels and videos to the built-in whitelist:

```json
{
  "channels": [
    {
      "id": "my-channel",
      "name": "My Channel",
      "logo": "/thumbnails/my-channel.png",
      "approved": true
    }
  ],
  "videos": [
    {
      "id": "123",
      "title": "My Video",
      "channel": "My Channel",
      "youtubeId": "YOUTUBE_VIDEO_ID",
      "thumbnail": "/thumbnails/my-video.jpg",
      "duration": "10:00",
      "category": "education",
      "ageRange": [3, 8]
    }
  ]
}
```

### Method 2: Parent Settings UI

1. Go to `/parent/settings`
2. Set up a 4-digit PIN
3. Toggle approved channels
4. Add custom YouTube videos

## Deployment

### Raspberry Pi / Android TV

1. Build the kiosk version:
   ```bash
   npm run electron:build:kiosk
   ```

2. Copy `dist/` to your device

3. Run the AppImage (Linux) or install the package

### Browser

Deploy the `out/` folder to any static hosting (Vercel, Netlify, etc.)

## Tech Stack

- Next.js 14 + TypeScript
- Tailwind CSS
- shadcn/ui components
- Electron
- YouTube Privacy-Enhanced Embed

## Safety Notes

- All content is loaded from a parent-controlled whitelist
- YouTube embeds use `youtube-nocookie.com` (reduced tracking)
- Related videos are disabled
- External navigation is blocked in Electron builds
- No analytics or telemetry

## Project Structure

```
kids-tv-app/
├── app/
│   ├── (kids)/page.tsx          # Kids main view
│   ├── parent/settings/page.tsx # Parent settings
│   ├── layout.tsx               # Root layout
│   └── globals.css              # Global styles
├── components/
│   ├── kids/                    # Kids-facing components
│   │   ├── VideoCard.tsx
│   │   ├── VideoGrid.tsx
│   │   ├── VideoPlayer.tsx
│   │   └── YouTubeEmbed.tsx
│   ├── parent/                  # Parent settings components
│   │   ├── PinLock.tsx
│   │   ├── ChannelManager.tsx
│   │   └── VideoManager.tsx
│   └── ui/                      # UI primitives
├── hooks/
│   ├── useContent.ts            # Content loading hook
│   └── useParentAuth.ts         # PIN auth hook
├── data/
│   └── content.json             # Default content whitelist
├── types/
│   └── index.ts                 # TypeScript types
├── electron/
│   ├── main.js                  # Electron main process
│   └── preload.js               # Preload script
└── lib/
    └── utils.ts                 # Utility functions
```

## License

MIT
