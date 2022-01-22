import express from 'express';
import cors from "cors"

const app = express(); 
app.use(express.json());

app.use(cors())

const dbUser = []
const dbTweet = []


app.post('/sign-up', (req, res) => {
  const user = req.body
  dbUser.push(user)
  res.send("OK")
  
});

app.get('/tweets', (req, res) => {
    const tweet = req.body
    dbTweet.push(tweet)

  res.send("OK");
});

app.listen(5000, () => {

    console.log("Server is running")
});


