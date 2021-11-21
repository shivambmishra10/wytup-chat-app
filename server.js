const express=require('express')
const { Socket } = require('socket.io')

const app=express()

const http=require('http').createServer(app)

const port=process.env.PORT || 3000
app.use(express.static(__dirname+'/public'))
app.get('/',(req,res)=>
{
    res.sendFile(__dirname+'/index.html')
})
http.listen(port,()=>
{
    console.log(`listen to port ${port}`)
})
//socket
const io=require('socket.io')(http)
io.on('connection',(socket)=>
{
    console.log('Connected.....')
    socket.on('message',(msg)=>
    {
        socket.broadcast.emit('message',msg)
    })
})