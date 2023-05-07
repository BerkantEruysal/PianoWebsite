"use strict"
const soundFolderPath = "./static/notes/";
const keyPaths = {
    A0 : "a0.ogg",
    A0d : "a0d.ogg",
    B0 : "b0.ogg",
    C1 : "c1.ogg",
    C1d : "c1d.ogg",
    D1 : "d1.ogg",
    D1d : "d1d.ogg",
    E1 : "e1.ogg",
    F1 : "f1.ogg",
    F1d : "f1d.ogg",
    G1 : "g1.ogg",
    G1d : "g1d.ogg",
    A1 : "a1.ogg",
    A1d : "a1d.ogg",
    B1 : "b1.ogg",
    C2 : "c2.ogg",
    C2d : "c2d.ogg",
    D2 : "d2.ogg",
    D2d : "d2d.ogg",
    E2 : "e2.ogg",
    F2 : "f2.ogg",
    F2d : "f2d.ogg",
    G2 : "g2.ogg",
    G2d : "g2d.ogg",
    A2 : "a2.ogg",
    A2d : "a2d.ogg",
    B2 : "b2.ogg",
    C3 : "c3.ogg",
    C3d : "c3d.ogg",
    D3 : "d3.ogg",
    D3d : "d3d.ogg",
    E3 : "e3.ogg",
    F3 : "f3.ogg",
    F3d : "f3d.ogg",
    G3 : "g3.ogg",
    G3d : "g3d.ogg",
    A3 : "a3.ogg",
    A3d : "a3d.ogg",
    B3 : "b3.ogg",
    C4 : "c4.ogg",
    C4d : "c4d.ogg",
    D4 : "d4.ogg",
    D4d : "d4d.ogg",
    E4 : "e4.ogg",
    F4 : "f4.ogg",
    F4d : "f4d.ogg",
    G4 : "g4.ogg",
    G4d : "g4d.ogg",
    A4 : "a4.ogg",
    A4d : "a4d.ogg",
    B4 : "b4.ogg",
    C5 : "c5.ogg",
    C5d : "c5d.ogg",
    D5 : "d5.ogg",
    D5d : "d5d.ogg",
    E5 : "e5.ogg",
    F5 : "f5.ogg",
    F5d : "f5d.ogg",
    G5 : "g5.ogg",
    G5d : "g5d.ogg",
    A5 : "a5.ogg",
    A5d : "a5d.ogg",
    B5 : "b5.ogg",
    C6 : "c6.ogg",
    C6d : "c6d.ogg",
    D6 : "d6.ogg",
    D6d : "d6d.ogg",
    E6 : "e6.ogg",
    F6 : "f6.ogg",
    F6d : "f6d.ogg",
    G6 : "g6.ogg",
    G6d : "g6d.ogg",
    A6 : "a6.ogg",
    A6d : "a6d.ogg",
    B6 : "b6.ogg",
    C7 : "c7.ogg",
    C7d : "c7d.ogg",
    D7 : "d7.ogg",
    D7d : "d7d.ogg",
    E7 : "e7.ogg",
    F7 : "f7.ogg",
    F7d : "f7d.ogg",
    G7 : "g7.ogg",
    G7d : "g7d.ogg",
    A7 : "a7.ogg",
    A7d : "a7d.ogg",
    B7 : "b7.ogg",
    C8 : "c8.ogg",
}

let soundEvents = {};

const easeOutDuration = 300;

const activeIntervals = {}

function easeOutStop(audio, key) {
  const startVolume = audio.volume;
  const startTime = performance.now(); 
  const animationInterval = setInterval(() => {
    const elapsedTime = performance.now() - startTime;
    const volume = startVolume * (1 - (elapsedTime / easeOutDuration));
    audio.volume = volume < 0 ? 0 : volume;
    
    if (elapsedTime >= easeOutDuration) {
      audio.pause();
      audio.volume = startVolume
      audio.currentTime = 0
      delete activeIntervals[key]
      clearInterval(animationInterval);
    }
  }, 10);
  activeIntervals[key] = animationInterval
}



for(let key in keyPaths){
    const audio = new Audio(`${soundFolderPath}${keyPaths[key]}`);
    const playEvent = new Event(`playKey${keyPaths[key]}`);
    const stopEvent = new Event(`stopKey${keyPaths[key]}`);
    soundEvents[key] = {playEvent, stopEvent, isPlaying : false}; 
    document.addEventListener(`playKey${keyPaths[key]}`, (e) => {
            document.querySelector(`div[data-key=${key}]`).classList.add("active")
            clearInterval(activeIntervals[key])
            audio.pause()
            audio.volume = 1
            audio.currentTime = 0
            audio.play()
    })
    document.addEventListener(`stopKey${keyPaths[key]}`, (e) => {
        document.querySelector(`div[data-key=${key}]`).classList.remove("active")
        
        easeOutStop(audio, key)
    })
}

export default soundEvents;