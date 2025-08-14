const mongoose = require('mongoose')
const usuarioEschema = mongoose.Schema({
    nombre: {
        type: String,
        required: true
    },

    usuario: {
        type: String,
        required: true
    },

    contraseña: {
        type: String,
        required: true
    },

    sucursal: {
        type: String,
        required: true
    },

    rol: {
        type: String,
        required: true
    }
})

const usuario = mongoose.model('usuarios', usuarioEschema)
module.exports = usuario