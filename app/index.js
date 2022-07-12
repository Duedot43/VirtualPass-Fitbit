import * as messaging from "messaging";
import { getElementById } from "document";
import { existsSync } from "fs";
import { writeFileSync } from "fs";
import { readFileSync } from "fs";

//console.log(existsSync("/private/data/info.json") + "  WEEEEEEEE OOOO");
if (!existsSync("/private/data/info.json")){
    writeFile("/private/data/info.json", '{"hostname":"", "key":""}');
    console.log("File write");
}


let activ = getElementById("activ");


//let myElement = document.getElementById("myElement");
//Trigger the event if the settings are changed
messaging.peerSocket.addEventListener("message", (evt) => {
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
});
function readFile(path) {
    let ascii_read = readFileSync(path, "ascii");
    return ascii_read;
}
function writeFile(path, content){
    writeFileSync(path, content, "ascii");
}