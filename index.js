import { WebSocketServer } from 'ws';
import axios from "axios"

const wss = new WebSocketServer({ port: 8080 });

wss.on('connection', function connection(ws) {
  ws.on('message', function message(rawData) {
    const data = JSON.parse(rawData.toString())
    console.log(data);
    const question = data.prompt.substring('ipb:'.length).trim()

    const dt = {
      model: "tinyllama",
      prompt:  question,
      stream: false
    };
    
    const request = axios.post('http://localhost:11434/api/generate', dt)  
      .then((response) => {
          console.log(response)
          const jsonData = JSON.stringify({ answer: response.data.response, session: [] })
          ws.send(jsonData) 
      });
  });
});


