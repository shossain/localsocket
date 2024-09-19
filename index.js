import { WebSocketServer } from 'ws';
import axios from "axios"


const wss = new WebSocketServer({ port: 8080 });

wss.on('connection', function connection(ws) {
  ws.on('message', function message(data) {
    console.log('received: %s', data);
  
  const dt = {
  model: "tinyllama",
  prompt:  data.toString(),
  stream: false
};
  const request = axios.post('http://localhost:11434/api/generate', dt)  
    .then((response) => {
        console.log(response)
        ws.send(response.data.response) 
    });
});

ws.send('open')   
 
});


