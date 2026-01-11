# Perplexity Citation Remover

A Chrome extension that removes inline citations from Perplexity.AI answers on demand.

## How It Works

1. Click the extension icon while on perplexity.ai
2. Click "Remove Citations" button in the popup
3. Inline citations are removed instantly
4. See count of removed citations

## Installation

```bash
unzip perplexity-citation-remover.zip
cd perplexity-citation-remover
make build
```

Load `build/extension` into Chrome via `chrome://extensions/` → Load unpacked

## Usage

1. Go to perplexity.ai
2. Ask a question (inline citations appear as you get responses)
3. Click the extension icon in the toolbar
4. Click "Remove Citations" button
5. Citations are removed! Click again anytime

## Build Commands

```bash
make build              # Build for development
make dev                # Watch mode
make dist               # Create .zip and .crx for distribution
make clean              # Remove artifacts
```

## License

MIT
