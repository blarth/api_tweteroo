import express from "express";
import cors from "cors";
import { body, validationResult, check } from "express-validator";

const app = express();
app.use(express.json());

app.use(cors());

const dbUser = [];
const dbTweet = [];

app.post(
  "/sign-up",
  check("username").isLength({ min: 1 }),
  check("avatar").isLength({ min: 1 }),
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).send("Todos os Campos sao obrigatórios");
    }

    const user = req.body;

    dbUser.push(user);
    res.status(201).send("OK");
  }
);

app.post("/tweets", check("tweet").isLength({ min: 1 }), (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).send("Todos os Campos sao obrigatórios");
  }

  const tweetVal = req.header("user");
  const tweet = req.body;

  const fetchUser = dbUser.find((infoUser) => tweetVal === infoUser.username);
  dbTweet.push({ ...fetchUser, tweet: tweet.tweet });

  res.status(201).send("OK");
});

app.get("/tweets", (req, res) => {
  const page = parseInt(req.query.page);

  const lastTweets = dbTweet.slice(-10);
  res.send(lastTweets);
});
app.get("/tweets/:username", (req, res) => {
  const tweetUser = req.params.username;

  const lastTweetsUser = dbTweet.filter(
    (tweets) => tweets.username === tweetUser
  );

  res.send(lastTweetsUser);
});

app.listen(5000, () => {
  console.log("Server is running");
});
