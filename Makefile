#!/usr/bin/env make

.PHONY: help build dev clean install-deps check-node package-zip package-crx dist

help:
	@echo "Perplexity Citation Remover - Build System"
	@echo "=========================================="
	@echo ""
	@echo "Development:"
	@echo "  make build       - Build the extension for development"
	@echo "  make dev         - Watch mode (auto-rebuild on changes)"
	@echo "  make clean       - Remove build artifacts"
	@echo ""
	@echo "Distribution:"
	@echo "  make package-zip - Create .zip file for Chrome Web Store"
	@echo "  make package-crx - Create .crx file for direct installation"
	@echo "  make dist        - Create both .zip and .crx"
	@echo ""
	@echo "Dependencies:"
	@echo "  make install-deps - Install Node.js dependencies"
	@echo "  make check-node  - Verify Node.js is installed"
	@echo ""
	@echo "Quick Start:"
	@echo "  make install-deps"
	@echo "  make build"
	@echo "  Then load 'build/extension' folder in Chrome"

check-node:
	@command -v node >/dev/null 2>&1 || (echo "ERROR: Node.js not found. Install from https://nodejs.org/" && exit 1)
	@echo "✓ Node.js found: $$(node --version)"

install-deps: check-node
	@echo "Installing npm dependencies..."
	@npm install

build: install-deps
	@echo "Building extension for development..."
	@mkdir -p build/extension
	@echo "  → Copying manifest..."
	@cp src/manifest.json build/extension/manifest.json
	@echo "  → Copying popup.html..."
	@cp src/popup.html build/extension/popup.html
	@echo "  → Bundling and minifying popup.js..."
	@npm run build
	@echo "  → Copying icons..."
	@mkdir -p build/extension/icons
	@cp src/icons/icon16.png build/extension/icons/icon16.png
	@cp src/icons/icon48.png build/extension/icons/icon48.png
	@cp src/icons/icon128.png build/extension/icons/icon128.png
	@echo ""
	@echo "✓ Build complete! Extension is self-contained in build/extension/"
	@echo ""
	@echo "To load in Chrome:"
	@echo "  1. Open chrome://extensions/"
	@echo "  2. Enable 'Developer mode' (top right)"
	@echo "  3. Click 'Load unpacked'"
	@echo "  4. Select the 'build/extension' folder"
	@echo "  5. Go to perplexity.ai and click the extension icon!"

dev: install-deps
	@echo "Starting watch mode (Ctrl+C to exit)..."
	@mkdir -p build/extension
	@cp src/manifest.json build/extension/manifest.json
	@cp src/popup.html build/extension/popup.html
	@mkdir -p build/extension/icons
	@cp src/icons/icon16.png build/extension/icons/icon16.png
	@cp src/icons/icon48.png build/extension/icons/icon48.png
	@cp src/icons/icon128.png build/extension/icons/icon128.png
	@npm run dev

package-zip: build
	@echo "Creating .zip package for Chrome Web Store..."
	@mkdir -p dist
	@cd build/extension && zip -r -q ../../dist/extension.zip . -x ".git*" "node_modules/*" "*.map"
	@echo "✓ Created: dist/extension.zip"
	@echo "Ready to submit to Chrome Web Store"

package-crx: build
	@echo "Creating .crx package (unsigned)..."
	@mkdir -p dist
	@bash ./build_crx.sh build/extension dist/extension.crx
	@echo "✓ Created: dist/extension.crx"
	@echo "Users can drag & drop this file into chrome://extensions/"

dist: clean package-zip package-crx
	@echo ""
	@echo "✓ Distribution complete!"
	@echo "Files ready in dist/:"
	@echo "  - extension.zip (Chrome Web Store)"
	@echo "  - extension.crx (Direct installation)"
	@echo ""
	@echo "build/extension/ contains the self-contained extension"

clean:
	@echo "Cleaning build artifacts..."
	@rm -rf build dist
	@echo "✓ Clean complete"

.DEFAULT_GOAL := help
