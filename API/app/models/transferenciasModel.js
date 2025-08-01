const mongoose = require('mongoose')
const transferenciaEschema = mongoose.Schema({
    sucursalOrigen: {
        type: String,
        required: true
    },

    sucursalDestino: {
        type: String,
        required: true
    },

    productosEnviados: {
        type: String,
        required: true
    },

    cantidad: {
        type: Number,
        required: true
    },

    usuario: {
        type: String,
        required: true
    },

    fecha: {
        type: Date,
        default: Date.now(),
        required: true
    },

    tipo: {
        type: String,
        required: true
    }
})

const transferencia = mongoose.model('transferencias', transferenciaEschema)
module.exports = transferencia