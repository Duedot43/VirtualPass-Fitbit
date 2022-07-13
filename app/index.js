import * as messaging from "messaging";
import { getElementById } from "document";
import { existsSync } from "fs";
import { writeFileSync } from "fs";
import { readFileSync } from "fs";
import { me as companion } from "companion";

//console.log(existsSync("/private/data/info.json") + "  WEEEEEEEE OOOO");
if (!existsSync("/private/data/info.json")) {
    writeFile("/private/data/info.json", '{"hostname":"", "key":""}');
    console.log("File write");
}

const val = {
    "method": "method",
    "data": "data",
    "url": "url"
}

setTimeout(() => { request("GET", val, "https://google.com", "fetch"); }, 3000);


let activ = getElementById("activ");

let button = getElementById("button");
button.onactivate = function (evt) {
    button.text = "Clicked";
}


//let myElement = document.getElementById("myElement");
//Trigger the event if the settings are changed
messaging.peerSocket.addEventListener("message", (evt) => {
    console.log("Ready to recive messages")
    if (evt && evt.data && evt.data.key === "URL") {
        //evt.data.value is the value of the setting URL
        var infoJson = JSON.parse(readFile("/private/data/info.json"));
        infoJson['hostname'] = evt.data.value['name'];
        writeFile("/private/data/info.json", JSON.stringify(infoJson));
        console.log(readFile("/private/data/info.json"));
    }
    if (evt && evt.data && evt.data.key === "key") {
        //evt.data.value is the value of the setting URL
        var infoJson = JSON.parse(readFile("/private/data/info.json"));
        infoJson['key'] = evt.data.value['name'];
        writeFile("/private/data/info.json", JSON.stringify(infoJson));
        console.log(readFile("/private/data/info.json"));
    }
    if (evt && evt.data && evt.data.key === "request") {
        var recive = evt.data.value;
    }
});
function readFile(path) {
    let ascii_read = readFileSync(path, "ascii");
    return ascii_read;
}
function writeFile(path, content) {
    writeFileSync(path, content, "ascii");
}
function request(method, data, url, value) {
    const val = {
        method: method,
        data: data,
        url: url
    }
    sendValue(value, JSON.stringify(val))
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
