const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app)
const PORT = 8000;
const path = require('path');
const filepath = path.join(__dirname+'/index.html');


//initialization of socket
const io = require('socket.io')(server);

app.get('/',(req,res)=>{
    res.sendFile(filepath);
})


// let users = 0

let room = 1
let full = 0

// const namespace = io.of('/custome-namespace');
io.on('connection', client =>{
    console.log("a user connected");

    //1.Server side to client side.............................................................
    // setTimeout(()=>{
    //     client.emit("myCustomeEvent",{description:'helloo from the server side'})
    // },2000);


    //Client side to server side.............................................................
    // client.on("myCustomeEventFromClientSide",(data)=>{
    //     console.log(`message: ${data.description}`);
    // })

    //Broadcast..........................................
    // users++;

    //2.For All user.......................................
    // io.sockets.emit("broadcast",{message:users + "users connected!"}); 

    //For Join user getting welcome message and other getting user count.......................................
    // client.emit("newuserconnected",{message:"Hiii Welcome Dear"});  
    // client.broadcast.emit("newuserconnected",{message:users+"User Connected!"});


    //3.For rooms creation..........................................

    client.join(room+ "room");
    io.sockets.in(room+ "room").emit('connectedRoom',"you are connected to Room no."+room);

    full++;
    if (full >= 2){
        full=0;
        room++
    }

    client.on('disconnect',()=>{
        console.log(`user disconnected`);
        // users--;

        //For All user
        // io.sockets.emit("broadcast",{message:users + "users connected!"});  
        // client.broadcast.emit("newuserconnected",{message:users+"User Connected!"});
    })
})



server.listen(PORT,()=>{
    console.log(`Server is running on port http://localhost:${PORT}`);
})





