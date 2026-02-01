@echo off
echo [1/2] Installing dependencies...
call npm install

echo.
echo [2/2] Starting development server...
npm run dev

pause
