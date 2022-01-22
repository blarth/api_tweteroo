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
  console.log(dbUser)
  
});

app.post('/tweets', (req, res) => {
    const tweet = req.body
    const fetchUser = dbUser.find(infoUser => tweet.username === infoUser.username)
    dbTweet.push({...fetchUser, tweet : tweet.tweet})
    

  res.send("OK");
});

app.get("/tweets" , (req, res) => {
    res.send(dbTweet)


})

app.listen(5000, () => {

    console.log("Server is running")
});


