# Perplexity Citation Remover (Chrome + Firefox)

This repository contains build files and setup for a lightweight Chrome extension that removes inline citations from Perplexity.AI answers on demand with a single click.

The **FIREFOX** version can be found in the subdirectory `firefox_version` and can be installed
as plugin by simply copying the directory to a convenient location and loading it into firefox.

## Features

- ✅ **On-demand removal** - Click the extension icon, then "Remove Citations"
- ✅ **Works on any conversation** - No need to refresh or reload
- ✅ **Removes inline citations** - Targets `<span class="citation inline">` elements
- ✅ **Shows confirmation** - Tells you how many citations were removed
- ✅ **Zero external calls** - 100% client-side, no data collection
- ✅ **Privacy-first** - Source code fully transparent

## How to Use

1. Go to perplexity.ai
2. Ask a question (inline citations appear like [wiki.archlinux +2])
3. Click the extension icon in Chrome toolbar
4. Click "Remove Citations" button in the popup
5. Citations are removed! Click again anytime for new ones

## Installation

### From Source (Development)

```bash
# Clone or extract the repository
cd perplexity-citation-remover

# Install dependencies and build
make install-deps
make build

# Load in Chrome
# 1. Open chrome://extensions/
# 2. Enable "Developer mode" (top right toggle)
# 3. Click "Load unpacked"
# 4. Select the "build/extension" folder
# 5. Enjoy!
```

### For Distribution

```bash
# Create .zip for Chrome Web Store and .crx for direct distribution
make dist

# Files created:
# - dist/extension.zip (upload to Chrome Web Store)
# - dist/extension.crx (share with users for direct installation)
```

## Build Commands

```bash
make build              # Build extension for development
make dev                # Watch mode - auto-rebuild on file changes
make dist               # Create distribution files (.zip and .crx)
make clean              # Remove build artifacts
make help               # Show all available commands
```

## Project Structure

```
perplexity-citation-remover/
├── Makefile                 # Build commands
├── build_crx.sh            # CRX creation script
├── package.json            # Node.js config
├── README.md               # This file
├── README.DEV.md           # Developer guide
├── DISTRIBUTION.md         # Publishing guide
│
├── src/
│   ├── manifest.json       # Extension config
│   ├── popup.html          # Popup UI
│   ├── popup.js            # Popup logic
│   └── icons/
│       ├── icon16.png      # Toolbar icon
│       ├── icon48.png      # Management page icon
│       └── icon128.png     # Store/large icon
│
├── build/                  # Generated (after make build)
│   └── extension/          # Ready-to-load extension
│
└── dist/                   # Distribution files (after make dist)
    ├── extension.zip
    └── extension.crx
```

## Icon Design

The extension icon features:
- 📜 **Scroll** (left side) - Represents documents/text
- ✂️ **Scissors** (cutting diagonally) - Represents removal/editing
- 🎨 **Teal color scheme** - Clean, modern aesthetic
- 🌫️ **Transparent background** - Fits any Chrome toolbar

## Troubleshooting

**Button doesn't work?**
- Make sure you're on perplexity.ai
- Try refreshing the page (F5)
- Reload the extension: chrome://extensions/ → reload button

**No citations found?**
- Citations appear as you get responses from Perplexity
- Try asking a new question

**Want to uninstall?**
- Go to chrome://extensions/
- Click the trash icon on the extension card

## Security & Privacy

✅ **No external network calls** - Everything runs locally
✅ **No data collection** - Nothing is stored or sent anywhere
✅ **No tracking** - Your activity is private
✅ **No permissions** - Limited to content script execution
✅ **Source code transparent** - Fully auditable on GitHub

## License

MIT - Free to use, modify, and distribute

## Contributing

Found a bug? Want to improve it? Feel free to:
1. Open an issue
2. Submit a pull request
3. Suggest improvements

---

Made with ❤️ for clean reading on Perplexity.AI
