import express from 'express';
import cors from "cors"
import { body, validationResult, check } from 'express-validator';

const app = express(); 
app.use(express.json());

app.use(cors())

const dbUser = []
const dbTweet = []



app.post('/sign-up',
check('username')
    .isLength({ min: 1 })
    .withMessage('Todos os Campos sao obrigatórios'),
check('avatar')
    .isLength({ min: 5 })
    .withMessage('Todos os Campos sao obrigatórios'),

 (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }


  const user = req.body
  
  
  dbUser.push(user)
  res.status(201).send("OK")
  
  
});

app.post('/tweets',
check('username')
    .isLength({ min: 1 })
    .withMessage('Todos os Campos sao obrigatórios'),
check('tweet')
    .isLength({ min: 5 })
    .withMessage('Todos os Campos sao obrigatórios'),
 (req, res) => {


    const tweet = req.body
    const fetchUser = dbUser.find(infoUser => tweet.username === infoUser.username)
    dbTweet.push({...fetchUser, tweet : tweet.tweet})
    

  res.status(201).send("OK");
});

app.get("/tweets" , (req, res) => {
    const lastTweets = dbTweet.slice(-10)
    res.send(lastTweets)


})
app.get("/tweets/:username" , (req, res) => {

  const tweetUser = req.params.username

  console.log(tweetUser)
  

  const lastTweetsUser = dbTweet.filter(tweets => tweets.username === tweetUser)
  console.log(lastTweetsUser)
  res.send(lastTweetsUser)


})

app.listen(5000, () => {

    console.log("Server is running")
});


