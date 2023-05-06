import soundEvents from "./sounds.js";

let counter = 0;
var origin = 28
let listenedKeys = "q2we4r5ty7u8"

function onKeyDown(e){
    if(e.repeat){return}
    const keyIndex = listenedKeys.indexOf(e.key.toLowerCase());
    if(keyIndex != -1){
        const events = soundEvents[Object.keys(soundEvents)[origin + keyIndex]];
        if(events.isPlaying){return}
        events.isPlaying = true
        document.dispatchEvent(events.playEvent)
    }

    if(e.key == "+"){
        if(origin + 7 > 88){
            origin = 88;
        }else{
            origin += 7;
        }
        return
    }
    if(e.key == "-"){
        if(origin - 7 < 0){
            origin = 0
        }else{
            origin -= 7;
        }
        return
    }
}

function onKeyUp(e){
    console.log(e.key)
    const keyIndex = listenedKeys.indexOf(e.key.toLowerCase());
    if(keyIndex != -1){
        const events = soundEvents[Object.keys(soundEvents)[origin + keyIndex]];
        events.isPlaying = false
        document.dispatchEvent(events.stopEvent)
    }
}

document.addEventListener('keydown', onKeyDown)

document.addEventListener('keyup',  onKeyUp)

const keyboardElement = document.getElementById("keyboard")
let tempKey;
Object.keys(soundEvents).map( (key,index) => {
    let keyElement = document.createElement("template");
    if(key.split("")[key.split("").length - 1] != "d"){
        keyElement.innerHTML = `<div data-key=${key} class="white-key key"><span>${key}</span></div>`
    }else{
        keyElement.innerHTML = `<div data-key=${key} class="black-key key active-black"><span>${key}</span></div>`
    }
    if(tempKey && tempKey.split('')[tempKey.split('').length - 1] == 'd'){
        keyElement.content.firstChild.classList.add("a")
    } 
    tempKey = key
    keyboardElement.appendChild(keyElement.content.firstChild)
})




