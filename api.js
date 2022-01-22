import express from 'express';
import cors from "cors"

const app = express(cors()); 
app.use(express.json());


const pessoas = [];

app.post('/', (req, res) => {
  
});

app.get('/', (req, res) => {
  res.send();
});

app.listen(5000, () => {

    console.log("Server is running")
});


