var hihat = document.querySelector('[data-sound="hihat"]');
var kick = document.querySelector('[data-sound="kick"]');
var snare = document.querySelector('[data-sound="snare"]');
var ride = document.querySelector('[data-sound="ride"]');
var hihatDiv = document.querySelector('#hihatDiv');
var kickDiv = document.querySelector('#kickDiv');
var snareDiv = document.querySelector('#snareDiv');
var rideDiv = document.querySelector('#rideDiv');
var btnRecord = document.querySelector('.btn--record');
var btnPlay = document.querySelector('.btn--play');
var channelPlay = [];
var recordTimeStamp = [];
appStart();
function appStart() {
    document.addEventListener('keydown', readKey);
    btnRecord.addEventListener('click', record);
    btnPlay.addEventListener('click', playChannel);
}
function record(e) {
    var singleRecordTimeStamp = e.timeStamp;
    recordTimeStamp.push({ 'ch1': singleRecordTimeStamp });
}
function playChannel() {
    console.log(recordTimeStamp[0].ch1);
    console.log(channelPlay);
    channelPlay.forEach(function (sound) {
        var time = recordTimeStamp[0].ch1 - sound.time;
        setTimeout(function () { return playSound(sound.key); }, time);
    });
}
function readKey(e) {
    var key = e.key;
    var time = e.timeStamp;
    // tylko wybrane klawisze mają być pushowane i odtwarzane
    channelPlay.push({ key: key, time: time });
    playSound(key);
    animationBlock(key);
}
function addAnimation(el) {
    el.style.transform = 'scale(0.95)';
    setTimeout(function () {
        el.style.transform = 'scale(1)';
    }, 10);
}
function animationBlock(key) {
    switch (key) {
        case 'q':
            addAnimation(hihatDiv);
            break;
        case 'w':
            addAnimation(kickDiv);
            break;
        case 'e':
            addAnimation(snareDiv);
            break;
        case 'r':
            addAnimation(rideDiv);
            break;
    }
}
function playSound(key) {
    switch (key) {
        case 'q':
            hihat.play();
            hihat.currentTime = 0;
            break;
        case 'w':
            kick.play();
            kick.currentTime = 0;
            break;
        case 'e':
            snare.play();
            snare.currentTime = 0;
            break;
        case 'r':
            ride.play();
            ride.currentTime = 0;
            break;
    }
}
