const express = require('express')
const router = express.Router()
const usuarioController = require('../controllers/usuarioController')
const productoController = require('../controllers/productoController')
const transferenciaController = require('../controllers/transferenciasController')

//Rutas usuario controller
router.get('/usuarios', usuarioController.buscarTodo)
router.post('/usuarios', usuarioController.guardarUsuario)
router.get('/usuarios/:key/:value', usuarioController.buscarUsuario, usuarioController.mostrarUsuario)
router.delete('/usuarios/:key/:value', usuarioController.buscarUsuario, usuarioController.eliminarUsuario)
router.put('/usuarios/:key/:value', usuarioController.buscarUsuario, usuarioController.editarUsuario)

//Rutas transferencia controller
router.post('/transferencias', transferenciaController.guardarTransferencia)
router.get('/transferencias', transferenciaController.buscarTodasT)

//Rutas producto controller
router.get('/productos', productoController.buscarTodoP)
router.post('/productos', productoController.guardarProducto)
router.get('/productos/:key/:value', productoController.buscarProducto, productoController.mostrarProducto)
router.delete('/productos/:key/:value', productoController.buscarProducto, productoController.eliminarProducto)
router.put('/productos/:key/:value', productoController.buscarProducto, productoController.editarProducto)

module.exports = router