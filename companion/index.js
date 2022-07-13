import { settingsStorage } from "settings";
import * as messaging from "messaging";
import { me as companion } from "companion";

let KEY_COLOR = "URL";


var URL = settingsStorage.getItem("URL");
var KEY = settingsStorage.getItem("key");
if (URL != "" && KEY != ""){
  userData = request("GET", "{}", "https://" + KEY + "@" + URL + "/api_student/student/");
  console.log(userData)
}

messaging.peerSocket.addEventListener("message", (evt) => {
  console.log("Ready to recive messages")
  if (evt && evt.data && evt.data.key === "fetch") {
    console.log("Recived");
  }
});

function request(method, data, url) {
  let options = {
    method: method,
    headers: {
      'Content-Type': 'application/json;charset=utf-8'
    },
    body: JSON.stringify(data)
  }
  var response = fetch(url, options);
  response.then(res =>
    res.json()).then(d => {
      return d
    })
}

// Settings have been changed
settingsStorage.addEventListener("change", (evt) => {
  sendValue(evt.key, evt.newValue);
});

// Settings were changed while the companion was not running
if (companion.launchReasons.settingsChanged) {
  // Send the value of the setting
  sendValue(KEY_COLOR, settingsStorage.getItem(KEY_COLOR));
}

function sendValue(key, val) {
  if (val) {
    sendSettingData({
      key: key,
      value: JSON.parse(val)
    });
  }
}
function sendSettingData(data) {
  // If we have a MessageSocket, send the data to the device
  if (messaging.peerSocket.readyState === messaging.peerSocket.OPEN) {
    messaging.peerSocket.send(data);
  } else {
    console.log("No peerSocket connection");
  }
}
