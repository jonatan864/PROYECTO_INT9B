const express = require('express')
const router = express.Router()
const usuarioController = require('../controllers/usuarioController')
const productoController = require('../controllers/productoController')
const transferenciaController = require('../controllers/transferenciasController')
const verificarToken = require('../middlewares/verificarToken');

//Rutas usuario controller
router.get('/usuarios', usuarioController.buscarTodo) //Consulta general
router.post('/usuarios', usuarioController.guardarUsuario) //Crear usuario
router.get('/usuarios/:key/:value', usuarioController.buscarUsuario, usuarioController.mostrarUsuario) //Buscar registro por clave y valor
router.delete('/usuarios/:key/:value', usuarioController.buscarUsuario, usuarioController.eliminarUsuario) //Eliminar registro por clave y valor
router.put('/usuarios/:key/:value', usuarioController.buscarUsuario, usuarioController.editarUsuario) //Editar usuario por clave y valor
router.post('/usuarios/login', usuarioController.login) //Login

//Rutas transferencia controller
router.post('/transferencias', transferenciaController.guardarTransferencia)
router.get('/transferencias', transferenciaController.buscarTodasT)
router.get('/transferencias/filtroSucursal', verificarToken, transferenciaController.buscarTransferenciasPorSucursal);


//Rutas producto controller
router.get('/productos', productoController.buscarTodoP)
router.post('/productos', productoController.guardarProducto)
router.get('/productos/:key/:value', productoController.buscarProducto, productoController.mostrarProducto)
router.delete('/productos/:key/:value', productoController.buscarProducto, productoController.eliminarProducto)
router.put('/productos/:key/:value', productoController.buscarProducto, productoController.editarProducto)

module.exports = router