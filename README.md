# Kids TV App 🎬

A safe, curated video app for children ages 3-8. No ads, no algorithmic recommendations, no autoplay — just parent-approved content from trusted sources.

## Features

### For Kids
- 🎨 **Simple, colorful interface** with large thumbnails perfect for little fingers
- 📺 **Curated content** from trusted channels: PBS Kids, Super Simple Songs, Blippi, and Cocomelon
- 🚫 **No ads** and no algorithmic recommendations
- 🎮 **Easy navigation** with channel filtering

### For Parents
- 🔒 **PIN protection** for parent settings
- ✅ **Content whitelist** - only approved channels and videos
- ➕ **Add custom videos** from YouTube (with PIN)
- 👁️ **Channel controls** - enable/disable specific channels
- 🔇 **No autoplay** - kids choose what to watch next

## Tech Stack

- **Frontend:** Next.js 14 + TypeScript + Tailwind CSS
- **UI Components:** shadcn/ui
- **Desktop App:** Electron with kiosk mode support
- **Video:** YouTube privacy-enhanced embeds (youtube-nocookie.com)
- **Storage:** localStorage for settings persistence

## Quick Start

### Web (Browser)

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Desktop (Electron)

```bash
# Install dependencies
npm install

# Run in development mode
npm run electron:dev

# Build desktop app
npm run dist

# Build for specific platforms
npm run dist:mac      # macOS
npm run dist:win      # Windows
npm run dist:linux    # Linux
```

### Kiosk Mode (TV/Raspberry Pi)

```bash
# Run in fullscreen kiosk mode
electron electron/main.js --kiosk
```

## Project Structure

```
kids-tv-app/
├── app/                    # Next.js app directory
│   ├── layout.tsx         # Root layout
│   ├── page.tsx           # Main page
│   └── globals.css        # Global styles
├── components/
│   ├── ui/                # shadcn/ui components
│   └── kids/              # Kids app components
│       ├── VideoCard.tsx  # Video thumbnail card
│       ├── VideoGrid.tsx  # Main video grid
│       ├── VideoPlayer.tsx # YouTube embed player
│       └── ParentSettings.tsx # PIN-protected settings
├── data/
│   └── content.json       # Curated video content
├── electron/
│   ├── main.js            # Electron main process
│   └── package.json       # Electron config
├── hooks/
│   └── useSettings.ts     # Settings management hook
├── types/
│   └── index.ts           # TypeScript types
└── public/                # Static assets
```

## Default Content

### Channels
- **PBS Kids** - Educational shows like Daniel Tiger, Wild Kratts, Arthur
- **Super Simple Songs** - Classic nursery rhymes and songs
- **Blippi** - Educational adventures and exploration
- **Cocomelon** - Fun songs for kids

### Adding Custom Videos

1. Click "Parents" button in the top right
2. Enter your PIN (or create one on first use)
3. Go to "Add Videos" tab
4. Paste a YouTube URL and fill in details
5. Video appears in the main grid

## Security Features

- ✅ **External navigation blocked** in Electron
- ✅ **Popups blocked** - no unexpected windows
- ✅ **YouTube privacy mode** - no tracking cookies
- ✅ **PIN protection** for parent controls
- ✅ **No external links** in video descriptions

## Configuration

### Environment Variables

Create a `.env.local` file:

```env
# Development
NODE_ENV=development

# For custom builds
ELECTRON_KIOSK=false
```

### Customizing Content

Edit `data/content.json` to modify default channels and videos:

```json
{
  "channels": [
    {
      "id": "your-channel",
      "name": "Your Channel Name",
      "logo": "/logos/your-logo.png",
      "color": "#FF0000",
      "isDefault": true
    }
  ],
  "videos": [
    {
      "id": "unique-id",
      "title": "Video Title",
      "youtubeId": "YOUTUBE_VIDEO_ID",
      "thumbnail": "https://img.youtube.com/vi/YOUTUBE_VIDEO_ID/maxresdefault.jpg",
      "channelId": "your-channel",
      "description": "Video description"
    }
  ]
}
```

## Deployment

### Static Hosting (Vercel, Netlify, etc.)

```bash
npm run build
# Deploy the 'dist' folder
```

### Raspberry Pi / TV Setup

1. Install Raspberry Pi OS
2. Install Node.js and npm
3. Clone this repository
4. Run `npm install && npm run dist:linux`
5. Set up auto-start for kiosk mode:

```bash
# Add to ~/.config/lxsession/LXDE-pi/autostart
@electron /path/to/kids-tv-app/release/linux-unpacked/kids-tv-app --kiosk
```

## Development

### Adding New shadcn Components

```bash
npx shadcn add [component-name]
```

### Code Style

- TypeScript for type safety
- Tailwind CSS for styling
- React hooks for state management
- Local storage for persistence

## Browser Support

- Chrome/Edge (recommended)
- Firefox
- Safari
- Electron (desktop wrapper)

## License

MIT License - Feel free to use and modify for your family!

## Contributing

This is a personal project focused on child safety. Contributions that enhance safety, accessibility, or add educational content are welcome.

## Safety Notes

- Always supervise young children during screen time
- Review custom videos before adding them
- The PIN is stored locally and is not recoverable if forgotten
- YouTube content is subject to the platform's availability

---

Made with ❤️ for safe, fun screen time.
