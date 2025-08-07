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

const buscarTransferenciasPorSucursal = async (req, res) => {
    const sucursal = req.user.sucursal;

    try {
        const transferencias = await transferenciaModel.find({ sucursalDestino: sucursal });

        if (!transferencias.length) {
            return res.status(204).json({ mensaje: 'No hay transferencias para esta sucursal' });
        }

        res.status(200).json({
            mensaje: 'Transferencias encontradas',
            total: transferencias.length,
            transferencias
        });
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al obtener transferencias', error: error.message });
    }
};


module.exports = {
    guardarTransferencia,
    buscarTodasT,
    buscarTransferenciasPorSucursal
}