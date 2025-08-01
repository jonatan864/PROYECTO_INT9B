const mongoose = require('mongoose')

const productoEschema = mongoose.Schema({
    clave: {
        type: String,
        required: true
    },

    descripcion: {
        type: String,
        required: true
    },

    stock: {
        type: Number,
        required: true
    },

    sucursalUbicacion: {
        type: String,
        required: true
    }
})

const producto = mongoose.model('productos', productoEschema)
module.exports = producto