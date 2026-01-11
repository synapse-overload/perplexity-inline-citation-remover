# Developer Guide

## Files

- **manifest.json** - Extension config with scripting permission
- **popup.html** - UI with button
- **popup.js** - Logic: uses chrome.scripting.executeScript (Manifest V3 API)

## Key API Change

Manifest V3 uses `chrome.scripting.executeScript()` instead of `chrome.tabs.executeScript()`:

```javascript
// Manifest V3 (correct)
const results = await chrome.scripting.executeScript({
    target: { tabId: tab.id },
    function: removeCitations
});
const count = results[0].result;
```

## Build

```bash
make build
```

## Testing

1. Load into Chrome (chrome://extensions/)
2. Go to perplexity.ai
3. Click extension icon
4. Click button
5. Should remove inline citations

## Permission

The `scripting` permission in manifest.json is required for `chrome.scripting.executeScript()`.
