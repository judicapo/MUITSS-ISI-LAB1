import feathers from '@feathersjs/feathers'
import socketio from '@feathersjs/socketio-client'
import io from 'socket.io-client'

console.log(process.env.VUE_APP_BASE_API_URL)
const socket = io(process.env.VUE_APP_BASE_API_URL, {transports: ['websocket']})

const feathersClient = feathers()
  .configure(socketio(socket))

export default feathersClient