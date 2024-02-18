const voiceListUrl = process.env.VOICE_LIST_URL;
const audioRequestUrl = process.env.AUDIO_REQUEST_URL;
const pollAudioRequestUrl = process.env.POLL_AUDIO_URL;
const audioStorageUrl = process.env.AUDIO_STORAGE_URL;

console.log(voiceListUrl);

function generateRandomString() {
  const characters = "abcdefghijklmnopqrstuvwxyz0123456789";
  let randomString = "";
  for (let i = 0; i < 36; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    randomString += characters[randomIndex];
  }
  return randomString;
}

async function getVoiceList() {
  const response = await fetch(voiceListUrl);
  const data = await response.json();
  const chiquita = data.models.filter((voice) => voice.title === "Chiquito de la Calzada. (Castillian Spanish.)");
  console.log(chiquita);
  const titles = data.models.map((voice) => voice.title);
  return data;
}

  // getVoiceList();

async function audioRequest(
  model = "TM:1hj3fftb6yrb",
  text = "Texto de prueba",
  randomId = randomString
) {
  const dataToSend = {
    uuid_idempotency_token: randomId,
    tts_model_token: model,
    inference_text: text,
  };

  const response = await fetch(audioRequestUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(dataToSend),
  }).then((response) => response.json());
  console.log(response);
  return response;
}

async function pollAudioRequest(inferenceJobToken) {
  const response = await fetch(`${pollAudioRequestUrl}/${inferenceJobToken}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  }).then((response) => response.json());
  console.log(response);
  return response;
}

module.exports = { audioRequest, pollAudioRequest, generateRandomString };
