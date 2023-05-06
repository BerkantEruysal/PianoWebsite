import soundEvents from "./sounds.js";

let counter = 0;
var origin = 30
let listenedKeys = "q2we4r5ty7u8"

function onKeyDown(e){
    if(e.repeat){return}
    const keyIndex = listenedKeys.indexOf(e.key.toLowerCase());
    if(keyIndex != -1){
        const events = soundEvents[Object.keys(soundEvents)[origin + keyIndex]];
        document.dispatchEvent(events.playEvent)
    }
    
}

function onKeyUp(e){
    console.log(e.key)
    const keyIndex = listenedKeys.indexOf(e.key.toLowerCase());
    if(keyIndex != -1){
        const events = soundEvents[Object.keys(soundEvents)[origin + keyIndex]];
        document.dispatchEvent(events.stopEvent)
    }
}

document.addEventListener('keydown', onKeyDown)

document.addEventListener('keyup',  onKeyUp)





