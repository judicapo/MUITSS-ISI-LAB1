import feathers from '@feathersjs/feathers'
import socketio from '@feathersjs/socketio-client'
import io from 'socket.io-client'

const socket = io(process.env.baseApiUrl)

const feathersClient = feathers()
  .configure(socketio(socket))

export default feathersClient
