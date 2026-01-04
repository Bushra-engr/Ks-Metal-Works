@echo off
echo ==============================================
echo      K'S METALWORKS - QUICK FIX TOOL
echo ==============================================
echo.
echo 1. Cleaning old files...
cd web
rmdir /s /q node_modules
del package-lock.json

echo.
echo 2. Installing dependencies (This takes 2-3 mins)...
echo    Please wait...
call npm install
call npm install -D tailwindcss postcss autoprefixer

echo.
echo 3. Configuring Styles...
echo    (Tailwind config already exists)

echo.
echo 4. Starting Website...
echo    Aapka browser apne aap open hoga.
echo.
call npm run dev
pause
