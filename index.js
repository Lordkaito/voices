const express = require("express");
const cors = require("cors");
const {
  pollAudioRequest,
  audioRequest,
  generateRandomString,
} = require("./requests");
const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

app.post("/audio", async (req, res) => {
  const randomString = generateRandomString();
  let { message, model } = req.body;
  const request = await audioRequest(
    (model = "TM:1hj3fftb6yrb"),
    (message = "Hola, soy chiquito"),
    randomString
  ).then(async (res) => {
    const result = await pollAudioRequest(res.inferenceJobToken);
    return result;
  }).catch((err) => {
    console.log(err);
  });
  return res.json(request);
});

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});

export default app;