const { exec } = require('child_process');
const path = require('path');
const fs = require('fs');

// Configuración
const DB_NAME = 'ProyectoEP3'; // Cambia por el nombre de tu BD
const BACKUP_DIR = path.join(__dirname, 'backups');

// Crear carpeta si no existe
if (!fs.existsSync(BACKUP_DIR)) {
    fs.mkdirSync(BACKUP_DIR);
}

// Formato de fecha
const fecha = new Date().toISOString().replace(/T/, '_').replace(/:/g, '-').replace(/\..+/, '');
const archivoBackup = path.join(BACKUP_DIR, `${DB_NAME}_${fecha}`);

// Comando mongodump
const comando = `mongodump --db ${DB_NAME} --out "${archivoBackup}"`;

console.log('📦 Creando copia de seguridad...');

exec(comando, (error, stdout, stderr) => {
    if (error) {
        console.error(`❌ Error: ${error.message}`);
        return;
    }
    if (stderr) {
        console.error(`⚠️ Advertencia: ${stderr}`);
    }
    console.log(`✅ Backup completado en: ${archivoBackup}`);
});
