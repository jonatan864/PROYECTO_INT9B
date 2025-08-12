const usuarioModel = require('../models/usuariosModel')
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

function buscarTodo(req, res) {
    usuarioModel.find({})
    .then(usuarios => {
        if (usuarios.length) {
            return res.status(200).send({usuarios})
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

const buscarUsuariosPorSucursal = async (req, res) => {
    const sucursal = req.user.sucursal;

    try {
        const usuarios = await usuarioModel.find({ sucursal: sucursal });

        if (!usuarios.length) {
            return res.status(204).json({ mensaje: 'No hay usuarios para esta sucursal' });
        }

        res.status(200).json({
            mensaje: 'Usuarios encontradas',
            total: usuarios.length,
            usuarios
        });
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al obtener usuarios', error: error.message });
    }
};

function guardarUsuario(req, res) {
    console.log(req.body)

    new usuarioModel(req.body).save()
    .then(info => {
        return res.status(200).send({mensaje: "Informacion guardada correctamente", info})
    })
    .catch(e => {
        return res.status(404).send({mensaje: "Error al guardar", error: e.message})
    })
}

async function buscarUsuario(req, res, next) {
    try {
        const { key, value } = req.params;

        if (!key || !value) {
            return res.status(400).send({ mensaje: "Parámetros insuficientes para la búsqueda" });
        }

        const consulta = { [req.params.key]: req.params.value };
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


async function eliminarUsuario(req, res) {
  if(req.body.e) return res.status(404).send({
      mensaje: "Error al buscar la información",
      error: req.body.e
  });

  if(!req.body.usuarios || req.body.usuarios.length === 0) 
    return res.status(204).send({mensaje: "No hay información que mostrar"});

  try {
    const id = req.body.usuarios[0]._id;
    const eliminado = await usuarioModel.findByIdAndDelete(id);

    if(!eliminado) {
      return res.status(404).send({mensaje: "Usuario no encontrado"});
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


function editarUsuario(req, res) {
    if (req.body?.e) {
        return res.status(500).send({
            mensaje: "Error al buscar la información",
            error: req.body.e.message || req.body.e
        });
    }

    if (!req.body?.usuarios || req.body.usuarios.length === 0) {
        return res.status(204).send({ mensaje: "No hay información que editar" });
    }

    const usuario = req.body.usuarios[0];

    // Actualizar los campos con los nuevos datos del cuerpo de la petición
    Object.assign(usuario, req.body);

    usuario.save()
        .then(info => {
            return res.status(200).send({ mensaje: "Usuario actualizado correctamente", info });
        })
        .catch(e => {
            return res.status(500).send({ mensaje: "Error al actualizar el usuario", error: e.message });
        });
}


const login = async (req, res) => {
    console.log('POST /login', req.body);
    const { correo, password } = req.body;

    if (!correo || !password) {
        return res.status(400).json({ msg: 'Todos los campos son obligatorios' });
    }

    try {
        const usuario = await usuarioModel.findOne({ usuario: correo });

        if (!usuario) {
            return res.status(404).json({ msg: 'Usuario no encontrado' });
        }

        if (usuario.contraseña !== password) {
            return res.status(401).json({ msg: 'Contraseña incorrecta' });
        }

        const token = jwt.sign(
            {
                id: usuario._id,
                rol: usuario.rol,
                sucursal: usuario.sucursal
            },
            'CLAVE_SECRETA', // cámbiala por una fuerte en .env
            { expiresIn: '1h' }
        );

        return res.status(200).json({
            msg: "Login exitoso",
            token,
            usuario: {
                id: usuario._id,
                nombre: usuario.nombre,
                usuario: usuario.usuario,
                sucursal: usuario.sucursal,
                rol: usuario.rol
            }
        });

    } catch (error) {
        console.error('Error en login:', error);
        res.status(500).json({ msg: 'Error interno del servidor' });
    }
};


module.exports = {
    buscarTodo,
    guardarUsuario,
    buscarUsuario, 
    mostrarUsuario,
    eliminarUsuario,
    editarUsuario,
    login,
    buscarUsuariosPorSucursal
}