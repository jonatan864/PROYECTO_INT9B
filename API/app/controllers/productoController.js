const productoModel = require('../models/productosModel')

function buscarTodoP(req, res) {
    productoModel.find({})
    .then(productos => {
        if (productos.length) {
            return res.status(200).send({productos})
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

function guardarProducto(req, res) {
    console.log(req.body)

    new productoModel(req.body).save()
    .then(info => {
        return res.status(200).send({mensaje: "Informacion guardada correctamente", info})
    })
    .catch(e => {
        return res.status(404).send({mensaje: "Error al guardar", error: e.message})
    })
}

async function buscarProducto(req, res, next) {
    try {
        const { key, value } = req.params;

        if (!key || !value) {
            return res.status(400).send({ mensaje: "Parámetros insuficientes para la búsqueda" });
        }

        const consulta = { [key]: value };
        const info = await productoModel.find(consulta);

        // Asegurarse de que req.body exista
        if (!req.body) req.body = {};

        req.body.productos = info.length ? info : null;
        return next();

    } catch (error) {
        if (!req.body) req.body = {};
        req.body.e = error;
        return next();
    }
}

function mostrarProducto(req, res) {
    if (req.body?.e) {
        return res.status(500).send({
            mensaje: "Error al buscar la información",
            error: req.body.e.message || req.body.e
        });
    }

    if (!req.body?.productos) {
        return res.status(204).send({ mensaje: "No hay información que mostrar" });
    }

    return res.status(200).send({ productos: req.body.productos });
}


async function eliminarProducto(req, res) {
  if(req.body.e) return res.status(404).send({
      mensaje: "Error al buscar la información",
      error: req.body.e
  });

  if(!req.body.productos || req.body.productos.length === 0) 
    return res.status(204).send({mensaje: "No hay información que mostrar"});

  try {
    const id = req.body.productos[0]._id;
    const eliminado = await productoModel.findByIdAndDelete(id);

    if(!eliminado) {
      return res.status(404).send({mensaje: "Producto no encontrado"});
    }

    return res.status(200).send({
      mensaje: "Información eliminada",
      info: eliminado
    });
  } catch(e) {
    return res.status(500).send({
      mensaje: "Error al eliminar la información",
      error: e.message
    });
  }
}

function editarProducto(req, res) {
    if (req.body?.e) {
        return res.status(500).send({
            mensaje: "Error al buscar la información",
            error: req.body.e.message || req.body.e
        });
    }

    if (!req.body?.productos || req.body.productos.length === 0) {
        return res.status(204).send({ mensaje: "No hay información que editar" });
    }

    const producto = req.body.productos[0];

    // Actualizar los campos con los nuevos datos del cuerpo de la petición
    Object.assign(producto, req.body);

    producto.save()
        .then(info => {
            return res.status(200).send({ mensaje: "Usuario actualizado correctamente", info });
        })
        .catch(e => {
            return res.status(500).send({ mensaje: "Error al actualizar el usuario", error: e.message });
        });
}


module.exports = {
    buscarTodoP,
    guardarProducto,
    buscarProducto, 
    mostrarProducto,
    eliminarProducto,
    editarProducto
}