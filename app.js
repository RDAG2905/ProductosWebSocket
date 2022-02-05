
const express = require('express')
const repositorio = require('./Repository.js')
const dao = new repositorio()

const { Server: HttpServer } = require('http')
const { Server: IOServer } = require('socket.io')
const app = express()
const httpServer = new HttpServer(app)
const io = new IOServer(httpServer)

app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(express.static('public'));


    io.on('connection', socket => {   
        socket.emit('productos', dao.getProducts())
    
    socket.on('addProduct',(payload)=>{ 
        dao.saveProduct(payload)     
        io.sockets.emit('productos', dao.getProducts());
         })
        })

        /////////////////////////////

        const PORT = 3000
        const connectedServer = httpServer.listen(PORT, () => {
            console.log(`Servidor http escuchando en el puerto ${connectedServer.address().port}`)
        })
        connectedServer.on('error', error => console.log(`Error en servidor ${error}`))
        