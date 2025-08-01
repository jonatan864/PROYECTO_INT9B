const transferencia = require("../models/transferenciasModel")
const transferenciaModel = require("../models/transferenciasModel")

function guardarTransferencia(req, res) {
    console.log(req.body)

    new transferenciaModel(req.body).save()
    .then(info => {
        return res.status(200).send({mensaje: "Informacion guardada correctamente", info})
    })
    .catch(e => {
        return res.status(404).send({mensaje: "Error al guardar", error: e.message})
    })
}

function buscarTodasT(req, res) {
    transferenciaModel.find({})
    .then(transferencias => {
        if (transferencias.length) {
            return res.status(200).send({transferencias})
        }
        return res.status(204).send({
            mensaje: "No hay informacion que mostrar"
        })
    })
    .catch(e => {
        return res.status(404).send({
            mensaje: `Error al buscar la informacion ${e.message}`
        })
    })
}

async function buscarUsuario(req, res, next) {
    try {
        const { key, value } = req.params;

        if (!key || !value) {
            return res.status(400).send({ mensaje: "Parámetros insuficientes para la búsqueda" });
        }

        const consulta = { [key]: value };
        const info = await usuarioModel.find(consulta);

        // Asegurarse de que req.body exista
        if (!req.body) req.body = {};

        req.body.usuarios = info.length ? info : null;
        return next();

    } catch (error) {
        if (!req.body) req.body = {};
        req.body.e = error;
        return next();
    }
}

function mostrarUsuario(req, res) {
    if (req.body?.e) {
        return res.status(500).send({
            mensaje: "Error al buscar la información",
            error: req.body.e.message || req.body.e
        });
    }

    if (!req.body?.usuarios) {
        return res.status(204).send({ mensaje: "No hay información que mostrar" });
    }

    return res.status(200).send({ usuarios: req.body.usuarios });
}

module.exports = {
    guardarTransferencia,
    buscarTodasT
}