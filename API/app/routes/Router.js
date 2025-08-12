const express = require('express')
const mongoose = require('mongoose')
const router = express.Router()
const usuarioController = require('../controllers/usuarioController')
const productoController = require('../controllers/productoController')
const transferenciaController = require('../controllers/transferenciasController')
const verificarToken = require('../middlewares/verificarToken');

//Rutas usuario controller
router.get('/usuarios', usuarioController.buscarTodo) //Consulta general
router.post('/usuarios', usuarioController.guardarUsuario) //Crear usuario
router.get('/usuarios/:key/:value', usuarioController.buscarUsuario, usuarioController.mostrarUsuario) //Buscar registro por clave y valor
//router.delete('/usuarios/:key/:value', usuarioController.buscarUsuario, usuarioController.eliminarUsuario) //Eliminar registro por clave y valor
//RUTA NUEVA: Elimina por nombre (clave fija)
router.delete('/usuarios/:value',
  (req, res, next) => {
    const value = req.params.value;  // <- Aquí defines 'value'

    if (mongoose.Types.ObjectId.isValid(value)) {
      req.params.key = '_id';
    } else {
      req.params.key = 'nombre';
    }

    next();
  },
  usuarioController.buscarUsuario,
  usuarioController.eliminarUsuario
);


router.put('/usuarios/:key/:value', usuarioController.buscarUsuario, usuarioController.editarUsuario) //Editar usuario por clave y valor
router.post('/usuarios/login', usuarioController.login) //Login
router.get('/usuarios/filtroSucursal', verificarToken, usuarioController.buscarUsuariosPorSucursal)

//Rutas transferencia controller
router.post('/transferencias', transferenciaController.guardarTransferencia)
router.get('/transferencias', transferenciaController.buscarTodasT)
router.get('/transferencias/filtroSucursal', verificarToken, transferenciaController.buscarTransferenciasPorSucursal);


//Rutas producto controller
router.get('/productos', productoController.buscarTodoP)
router.post('/productos', productoController.guardarProducto)
router.get('/productos/:key/:value', productoController.buscarProducto, productoController.mostrarProducto)
router.delete('/productos/:value',
  (req, res, next) => {
    const value = req.params.value;  // <- Aquí defines 'value'

    if (mongoose.Types.ObjectId.isValid(value)) {
      req.params.key = '_id';
    } else {
      req.params.key = 'clave';
    }

    next();
  },
  productoController.buscarProducto,
  productoController.eliminarProducto
);
router.put('/productos/:key/:value', productoController.buscarProducto, productoController.editarProducto)

module.exports = router