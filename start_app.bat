@echo off
title Daggerheart Adversary Architect
echo Starting Daggerheart Adversary Architect Local Server with Auto-Save...
echo.
start "" http://localhost:8000
python server.py 8000
if errorlevel 1 (
    echo.
    echo [Notice] server.py encountered an issue, falling back to standard http.server...
    python -m http.server 8000
)
pause

