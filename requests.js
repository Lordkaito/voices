// const voiceListUrl = "https://api.fakeyou.com/tts/list";
// const audioRequestUrl = "https://api.fakeyou.com/tts/inference";
// const pollAudioRequestUrl = "https://api.fakeyou.com/tts/job";
// const audioStorageUrl = "https://storage.googleapis.com/vocodes-public";
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

const randomString = generateRandomString();
console.log(randomString);

// window.addEventListener("onEventReceived", function (obj) {
//   if (obj.detail.event.value === "reset") {
//     clearApiData();
//     return;
//   }

//   const event = obj.detail.event;
//   let listener = obj.detail.listener;

//   if (event.isCommunityGift) return;

//   if (listener === "cheer-latest") {
//   }

//   if (listener === "tip-latest") {
//   }

//   if (listener === "subscriber-latest") {
//     console.log(event);
//     if (event.message !== "") {
//       const request = audioRequest(
//         "TM:1hj3fftb6yrb",
//         event.message,
//         randomString
//       );
//       if (request.status) {
//         const poll = pollAudioRequest(request.inferenceJobToken);
//         if (poll.status) {
//           requestAudio(poll.maybe_public_bucket_wav_audio_path);
//         }
//       }
//     }
//   }
// });

async function getVoiceList() {
  const response = await fetch(voiceListUrl);
  const data = await response.json();
  const titles = data.models.map((voice) => voice.title);
  const chiquito = data.models.find(
    (voice) => voice.title === "Chiquito de la Calzada. (Castillian Spanish.)"
  );
  console.log(chiquito);
  // console.log(titles);
  return data;
}

async function audioRequest(
  model = "TM:1hj3fftb6yrb",
  text = "Hola, soy chiquito",
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
      "Cross-Origin-Opener-Policy": "same-origin",
    },
    body: JSON.stringify(dataToSend),
  }).then((response) => response.json());
  console.log(response);
  return response;
}

async function pollAudioRequest(
  inferenceJobToken = "jinf_gvpdmyjr4kcvmmaev6z5380xxfn"
) {
  const response = await fetch(`${pollAudioRequestUrl}/${inferenceJobToken}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  }).then((response) => response.json());
  console.log(response);
  return response;
}

// async function requestAudio(
//   audioPath = "/media/v/e/w/d/5/vewd5jyjy4byf8hqw4927b1c4vwadckn/fakeyou_vewd5jyjy4byf8hqw4927b1c4vwadckn.wav"
// ) {
//   const audioElement = new Audio(audioStorageUrl + audioPath);
//   audioElement.play();
// }
// getVoiceList();
// audioRequest();
// pollAudioRequest();
// requestAudio();

module.exports = { audioRequest, pollAudioRequest, generateRandomString };
