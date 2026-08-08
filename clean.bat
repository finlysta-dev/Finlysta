@echo off
echo Closing processes...
taskkill /F /IM node.exe 2>nul
taskkill /F /IM code.exe 2>nul
timeout /t 2 /nobreak >nul

echo Removing node_modules...
rmdir /s /q node_modules 2>nul

echo Removing .next...
rmdir /s /q .next 2>nul

echo Removing package-lock.json...
del package-lock.json 2>nul

echo Cleaning npm cache...
call npm cache clean --force

echo Installing packages...
call npm install

echo Generating Prisma client...
call npx prisma generate

echo Done! Starting dev server...
call npm run dev

pause