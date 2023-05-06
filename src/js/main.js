document.addEventListener('keydown', (event) => {
    var audio = new Audio('/src/static/notes/448532__tedagame__c5.ogg');
    audio.play();
    console.log(event)
})