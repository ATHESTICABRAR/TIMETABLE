@echo off
echo ========================================================
echo Pushing code to GitHub: https://github.com/ATHESTICABRAR/TIMETABLE.git
echo ========================================================
echo.

echo Initializing Git...
git init

echo Adding files...
git add .

echo Committing code...
git commit -m "Initial commit - Daily Routine Tracker"

echo Setting main branch...
git branch -M main

echo Adding remote repository...
git remote remove origin 2>nul
git remote add origin https://github.com/ATHESTICABRAR/TIMETABLE.git

echo Pushing to GitHub (a browser window might open asking you to log in)...
git push -u origin main --force

echo.
echo ========================================================
echo Code successfully pushed to GitHub!
echo ========================================================
pause
