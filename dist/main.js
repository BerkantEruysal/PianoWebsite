import soundEvents from "./sounds.js";
import ToolImage from "./ToolImageClass.js"

let counter = 0;
var origin = 36;
let listenedKeys = "q2w3e4rt6y7uı9o0p*ğü"

function onKeyDown(e){
    if(e.keyCode == 83){
        if(origin + 12 > 88){
            origin = 88;
        }else{
            origin += 12;
        }
        scrollToTarget()
        return
    }
    if(e.keyCode == 65){
        if(origin - 12 < 0){
            origin = 0
        }else{
            origin -= 12;
        }
        scrollToTarget()
        return
    }

    if(e.repeat){return}
    const keyIndex = listenedKeys.indexOf(e.key.toLowerCase());
    if(keyIndex != -1){
        const events = soundEvents[Object.keys(soundEvents)[origin + keyIndex + 8]];
        if(events.isPlaying){return}
        events.isPlaying = true
        document.dispatchEvent(events.playEvent)
    }
}

function onKeyUp(e){
    const keyIndex = listenedKeys.indexOf(e.key.toLowerCase());
    if(keyIndex != -1){
        const events = soundEvents[Object.keys(soundEvents)[origin + keyIndex + 8]];
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

    keyElement.content.firstChild.addEventListener('mousedown', () => {document.dispatchEvent(soundEvents[key].playEvent)});
    keyElement.content.firstChild.addEventListener('mouseup', () => {document.dispatchEvent(soundEvents[key].stopEvent)});
    keyElement.content.firstChild.addEventListener('mouseleave', () => {document.dispatchEvent(soundEvents[key].stopEvent)});
    keyboardElement.appendChild(keyElement.content.firstChild)
})

function scrollToTarget(){
    const targetKey = document.querySelector(`div[data-key=${Object.keys(soundEvents)[origin]}]`)
    keyboardElement.parentElement.scroll(targetKey.offsetLeft, 0)
}

scrollToTarget()


const imageInput = document.getElementById("image-input")
const galleryElement = document.getElementById("gallery")
const toolImageInstances = []


imageInput.addEventListener('change', () => {
    const images = imageInput.files;
    for(let index = 0; index < images.length; index++ ) {
        const image = images[index]
        const toolImage = new ToolImage(image, index, galleryElement)
        toolImageInstances.push(toolImage)
    }
    toolImageInstances[0].appendToDocument(galleryElement)
})




