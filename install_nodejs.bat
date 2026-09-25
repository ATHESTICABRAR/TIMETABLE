@echo off
echo ========================================================
echo Downloading Node.js (this might take a minute)...
echo ========================================================
curl -o nodejs_installer.msi https://nodejs.org/dist/v20.11.0/node-v20.11.0-x64.msi

echo.
echo ========================================================
echo Running the Node.js Installer...
echo.
echo IMPORTANT: A setup window will appear. 
echo Please click "Next" through the setup to install Node.js.
echo ========================================================
start /wait nodejs_installer.msi

echo.
echo ========================================================
echo Node.js installation finished!
echo.
echo YOU CAN NOW CLOSE THIS WINDOW!
echo Then, double-click your "start_app.bat" file again to launch the app!
echo ========================================================
pause
