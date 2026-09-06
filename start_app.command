#!/bin/bash
# Move to the directory containing this script
cd "$(dirname "$0")"

echo "================================================================"
echo "  Starting Daggerheart Adversary Architect on macOS"
echo "  Auto-Save Enabled -> custom-library.json"
echo "================================================================"
echo ""

# Open Chrome if available, otherwise open default browser
if [ -d "/Applications/Google Chrome.app" ]; then
    open -a "Google Chrome" "http://localhost:8000"
else
    open "http://localhost:8000"
fi

# Start Python server
if command -v python3 &>/dev/null; then
    python3 server.py 8000
elif command -v python &>/dev/null; then
    python server.py 8000
else
    echo "[Error] Python 3 is not found. Please install Python 3 to run the local server."
    echo "Press any key to exit..."
    read -n 1
fi
