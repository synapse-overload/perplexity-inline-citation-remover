# Developer Guide

## How It Works

```
User clicks extension icon
    ↓
popup.html displays
    ↓
User clicks "Remove Citations" button
    ↓
popup.js uses chrome.scripting.executeScript()
    ↓
removeCitations() function runs on the page
    ↓
Finds all <span class="citation inline"> elements
    ↓
Removes them from the DOM
    ↓
Returns count to popup
    ↓
Popup displays "✓ Removed X citations"
```

## Key Files

### manifest.json
- Manifest V3 configuration
- Defines permissions and popup
- References icons

### popup.html
- Simple UI with button and result display
- Minimal CSS styling

### popup.js
- Button click handler
- Uses `chrome.scripting.executeScript()` (Manifest V3 API)
- Injects `removeCitations()` function into the page

## Manifest V3 API

The extension uses the modern Chrome Manifest V3 API:

```javascript
// Manifest V3 (Correct)
const results = await chrome.scripting.executeScript({
    target: { tabId: tab.id },
    function: removeCitations
});

const count = results[0].result;
```

**Note:** Manifest V2's `chrome.tabs.executeScript()` is deprecated.

## Building & Testing

```bash
# Install dependencies
make install-deps

# Build
make build

# Load in Chrome
# chrome://extensions/ → Load unpacked → select build/extension/

# Make changes to src/ files

# Rebuild
make build

# Chrome should auto-reload, or reload via chrome://extensions/
```

## Modifying Citation Selector

To target different citations, edit the selector in `popup.js`:

```javascript
// Current: removes inline span citations
const citationSpans = document.querySelectorAll('span.citation.inline');

// Example: also remove numbered citations
const citationSpans = document.querySelectorAll('span.citation.inline, span[class*="citation-number"]');

// Example: remove by data attribute
const citationSpans = document.querySelectorAll('[data-citation-id]');
```

## Extending to Other Sites

To add support for other websites:

1. Edit `manifest.json`:
   ```json
   "host_permissions": [
       "https://www.perplexity.ai/*",
       "https://example.com/*"
   ]
   ```

2. Update URL check in `popup.js`:
   ```javascript
   if (!tab.url.includes('perplexity.ai') && !tab.url.includes('example.com')) {
       // error
   }
   ```

3. Adjust selector for that site's citation markup

## Customizing Icons

Icons are in `src/icons/`:
- `icon16.png` - Chrome toolbar (small)
- `icon48.png` - Extension management page
- `icon128.png` - Chrome Web Store (large)

To replace with custom icons:
1. Create 16x16, 48x48, 128x128 PNG files
2. Replace the files in `src/icons/`
3. Run `make build`

## Performance

- Extension size: ~2KB (minified)
- Execution time: <5ms
- Memory: ~100KB per tab
- Zero ongoing monitoring - only runs on click

## Security Checklist

Before distributing:
- ✅ No external network calls
- ✅ No data collection or storage
- ✅ No eval() or unsafe operations
- ✅ Limited permissions
- ✅ Source code auditable
- ✅ No user input execution

## Resources

- [Manifest V3 Docs](https://developer.chrome.com/docs/extensions/mv3/)
- [Scripting API](https://developer.chrome.com/docs/extensions/reference/scripting/)
- [Chrome Extension Tutorial](https://developer.chrome.com/docs/extensions/mv3/getstarted/)
