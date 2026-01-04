@echo off
taskkill /F /IM node.exe >nul 2>&1
timeout /t 2 /nobreak >nul
rmdir /s /q web
del /f /q fix-site.bat migrate.bat move-files.js
del /f /q cleanup.bat
echo Done.
pause
