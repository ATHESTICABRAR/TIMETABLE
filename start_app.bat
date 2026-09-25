@echo off
echo ========================================================
echo Starting My Daily Discipline App...
echo ========================================================
echo.

echo Installing dependencies (this may take a minute)...
call npm install

echo.
echo Initializing the database...
call npx prisma db push

echo.
echo Starting the application...
echo The app will open in your browser automatically shortly.
start http://localhost:3000
call npm run dev

pause
