@echo off
echo Iniciando Football Streak Tracker...
echo Por favor, no cierres esta ventana mientras uses la aplicacion.

:: Cambiar al directorio del script
cd /d "%~dp0"

:: Iniciar el servidor de desarrollo y abrir el navegador usando el comando de Vite
echo.
echo Abriendo en el navegador...
call npm run dev -- --open
