# Distribution Guide

## Create Distribution Files

```bash
make dist
```

Creates:
- `dist/extension.zip` - Chrome Web Store submission
- `dist/extension.crx` - Direct installation

## Chrome Web Store

1. Create account at https://chrome.google.com/webstore/devconsole
2. Upload `dist/extension.zip`
3. Fill metadata and submit

## Direct Distribution

- Share `dist/extension.crx`
- Users drag & drop into `chrome://extensions/`

## License

MIT
