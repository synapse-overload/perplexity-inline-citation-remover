# Distribution Guide

## Create Distribution Files

```bash
make dist
```

This creates:
- `dist/extension.zip` - For Chrome Web Store submission
- `dist/extension.crx` - For direct user installation

## Option 1: Chrome Web Store (Recommended)

### Benefits
- Official distribution channel
- Automatic updates for users
- Discoverability via store search
- User reviews and ratings
- Trust badge

### Steps

1. **Create developer account**
   - https://chrome.google.com/webstore/devconsole
   - $5 one-time fee
   - Verify email

2. **Prepare submission**
   ```bash
   make dist
   # Upload dist/extension.zip
   ```

3. **Add metadata**
   - Short description (max 132 chars)
   - Full description
   - Screenshots (1280x800 recommended)
   - Category: Productivity
   - Language: English

4. **Submit for review**
   - Google reviews within 1-3 hours
   - Checks for malware, policies, deception
   - Once approved: live to all users

5. **Updates**
   - Increment version in package.json
   - Run `make dist`
   - Upload new extension.zip
   - Users auto-update

## Option 2: Direct Distribution

### Drag & Drop Installation
Users can install .crx files directly without review:

1. Users download `extension.crx`
2. Open `chrome://extensions/`
3. Drag & drop .crx into the page
4. Confirm installation

Works on Chrome 45+

### GitHub Releases

1. Push to GitHub
2. Create release: `git tag v1.0.0 && git push --tags`
3. Upload `dist/extension.crx` to release
4. Users download and drag into Chrome

No review process, instant availability.

## Option 3: Self-Hosted

Host .crx on any web server:
1. Upload `dist/extension.crx` to your server
2. Create download link
3. Users download and install via drag & drop

## File Comparison

| File | Format | Use Case | Size | Update |
|------|--------|----------|------|--------|
| extension.zip | ZIP archive | Web Store | ~7KB | Auto |
| extension.crx | Chrome format | Direct install | ~7KB | Manual |

## Recommended Distribution Path

**For maximum reach:**

1. **Submit to Chrome Web Store**
   - Official channel
   - Automatic updates
   - Best discoverability
   - User trust

2. **Create GitHub releases**
   - Backup option
   - Open source transparency
   - Direct access for developers
   - Build your community

3. **Optional: Self-hosted .crx**
   - Personal/organizational use
   - Full control over distribution

## License & Compliance

Before distribution, ensure:
- ✅ MIT license included
- ✅ No trademark violations
- ✅ No deceptive practices
- ✅ Privacy policy clear
- ✅ Source code transparent

## Versioning

Use semantic versioning in `package.json`:
- `1.0.0` - Initial release
- `1.0.1` - Bug fix
- `1.1.0` - New feature
- `2.0.0` - Major changes

Update version before each distribution release.

## Marketing

After release, consider:
- GitHub stars badge
- Product Hunt submission
- Tech blogs/forums
- README examples
- User testimonials

---

Happy distributing! 🚀
