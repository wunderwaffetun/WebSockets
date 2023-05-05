import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import mongoose from "mongoose";
import dotenv from 'dotenv'
import { v4 as uuidv4 } from "uuid";



const app = express();
dotenv.config()

const httpServer = createServer(app);
const io = new Server(httpServer, {cors: {
  origin: "*"
}});

io.on("connection", async (ws) => {
  ws.on('error', console.error);

  ws.on('message', async function message(data) {
    const {type, payload} = data
    console.log(type, payload)

    switch( type ){
      case 'delete':
        deleteData(payload)
          .catch( err => { 
            ws.send(JSON.stringify(err)) 
            console.log(err)
          })
          .then( async result => {
            sendAllClients(await getData())
          })
        break
      case 'create':
        
        createData(payload)
          .catch( err => { 
            ws.send(JSON.stringify(err)) 
            console.log(err)
          })
          .then( async result => {
            sendAllClients(await getData())
          })
        break
      default:
        ws.send('wtf')
    }
  });
  ws.send(await getData())
});

const name = process.env.NAME,
  password = process.env.PASS

const url = `mongodb+srv://${name}:${password}@cluster0.duf8uyv.mongodb.net/?retryWrites=true&w=majority`

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true });
const schema = mongoose.Schema({_id: String, innStr: Number });
let INN = mongoose.model('inn', schema);

const deleteData = async({id, innStr}) => {
  return INN.deleteOne({_id: id, innStr})
    .then(data => JSON.stringify(data))
    .catch( err => console.log(err))
}

const createData = async({innStr}) => {
  console.log(innStr)
  return INN.create({_id: uuidv4(), innStr: innStr})
    .then(data => JSON.stringify(data))
    .catch( err => console.log(err))
}

const getData = async () => {
  return INN.find({})
    .then(data => JSON.stringify(data))
}


function sendAllClients(data) {
  io.emit('message', data)
}

const updateAssociation = async () => {
  const db = await mongoose.createConnection(url).asPromise()

  INN = db.model('inn', schema)
  INN.collection.drop()

  let session = null
  INN.createCollection()
    .then(async () => {
      session = await db.startSession()
      const handleData = {_id: uuidv4(), innStr: Math.random()}
      return INN.create(handleData)
    })
    .then(() => {
      session.startTransaction()
      return INN.find({}).session(session)
    })
    .then(data => console.log(data))
}

updateAssociation()

httpServer.listen(8080);