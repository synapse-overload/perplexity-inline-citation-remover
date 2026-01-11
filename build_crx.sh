#!/bin/bash
set -e

EXTENSION_DIR="${1:-.}"
OUTPUT_FILE="${2:-extension.crx}"

if [ ! -f "$EXTENSION_DIR/manifest.json" ]; then
    echo "ERROR: manifest.json not found in $EXTENSION_DIR"
    exit 1
fi

TEMP_DIR=$(mktemp -d)
trap "rm -rf $TEMP_DIR" EXIT

{
    printf '\x43\x72\x32\x34'
    printf '\x03\x00\x00\x00'
    printf '\x00\x00\x00\x00'
} > "$TEMP_DIR/header"

cd "$EXTENSION_DIR"
zip -r -q "$TEMP_DIR/extension.zip" . -x ".git*" "node_modules/*" "*.map"
cd - > /dev/null

cat "$TEMP_DIR/header" "$TEMP_DIR/extension.zip" > "$OUTPUT_FILE"

echo "Generated unsigned .crx: $OUTPUT_FILE"
