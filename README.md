# Daggerheart Adversary Architect & Encounter Engine

A lightweight, standalone web application for **Daggerheart** Game Masters to create, customize, balance, and run combat encounters and environmental scenes.

---

## 🚀 Quick Start on Any Computer

### Option A: One-Click Launcher
- **Mac**: Double-click `start_app.command` (it will open Terminal, launch `server.py`, and open your browser to `http://localhost:8000`).
- **Windows**: Double-click `start_app.bat`.

### Option B: Terminal / Command Line (Mac or Windows)
Open Terminal / PowerShell in this folder and run:
```bash
python3 server.py 8000
```
*(or `python -m http.server 8000`)*

Then navigate to [http://localhost:8000](http://localhost:8000) in your browser.

*(If you have Node.js instead of Python: `npx serve .` or `npx http-server`)*

---

## 📁 Project Structure

| File | Description |
|---|---|
| `index.html` | The complete single-page application interface. |
| `app.js` | The application logic, math engine, combat tracker, and preset generator. |
| `style.css` | Daggerheart parchment/gold theme styling. |
| `custom-library.json` | **Portable Project Save File** containing your custom adversaries, environments, and saved encounters. Lives with the project files on Google Drive! |
| `server.py` | Lightweight Python standard library server providing direct auto-save to `custom-library.json`. |
| `daggerheart-srd-adversaries.json` | Official SRD Bestiary database (264 adversaries across Core and Hope & Fear). |
| `daggerheart-srd-environments.json` | Official SRD Environments database (47 scenes across Core and Hope & Fear). |
| `start_app.command` | Double-click macOS launcher to boot the server with auto-save and open your browser. |
| `start_app.bat` | Double-click Windows shortcut to boot the server with auto-save and open your browser. |

---

## 💾 How Saves & Custom Content Work

- **Automatic Project Auto-Save**: Whenever you click **"Save Encounter"** on the Active Encounter page or **"Save to Custom Library"** in the Creator, the app automatically writes directly to `custom-library.json` in this project folder via `server.py`. Google Drive syncs this file to the cloud so both your computers stay in sync.
- **Automatic Startup Load**: Whenever the app boots, it reads `custom-library.json` directly from this directory. Any custom adversaries, environments, or saved encounters will automatically load on any device.
- **Local Browser Cache**: Changes are also cached in `localStorage` for instant offline responsiveness.
- **Manual Export / Import**: Under the **Custom Library** tab, you can also manually click **"Save File"** or **"Import"** to backup or restore `custom-library.json` anytime.

---

## 🤖 Continuing Development in Google Antigravity

To continue developing or enhancing this app on another computer running Google Antigravity:
1. Copy or sync the `DH Adversary Architect` folder via Google Drive.
2. Open Antigravity and select the `DH Adversary Architect` folder as your workspace.
3. Start the server (`start_app.bat` or `python server.py 8000`).
4. Antigravity can immediately read, test, modify, and preview changes live!

