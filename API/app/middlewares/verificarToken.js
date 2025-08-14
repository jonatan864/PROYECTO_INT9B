const jwt = require('jsonwebtoken');

function verificarToken(req, res, next) {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(403).json({ mensaje: 'Token no proporcionado' });
    }

    const token = authHeader.split(' ')[1];

    try {
        const decoded = jwt.verify(token, 'CLAVE_SECRETA'); // Usa tu clave secreta
        req.user = decoded; // Esto agrega { id, rol, sucursal } a req.user
        next(); // Avanza al controlador
    } catch (err) {
        return res.status(401).json({ mensaje: 'Token inválido o expirado' });
    }
}

module.exports = verificarToken;
