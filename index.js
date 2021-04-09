var hihat = document.querySelector('[data-sound="hihat"]');
var kick = document.querySelector('[data-sound="kick"]');
var snare = document.querySelector('[data-sound="snare"]');
var ride = document.querySelector('[data-sound="ride"]');
var hihatDiv = document.querySelector('#hihatDiv');
var kickDiv = document.querySelector('#kickDiv');
var snareDiv = document.querySelector('#snareDiv');
var rideDiv = document.querySelector('#rideDiv');
var btnRecord0 = document.querySelector('[data-record="0"]');
var btnPlay0 = document.querySelector('[data-play="0"]');
var btnRecord1 = document.querySelector('[data-record="1"]');
var btnPlay1 = document.querySelector('[data-play="1"]');
var btnRecord2 = document.querySelector('[data-record="2"]');
var btnPlay2 = document.querySelector('[data-play="2"]');
var btnNodeRecord = document.querySelectorAll('.btn--record');
var btnPlayAll = document.querySelector('.button--playAll');
var inputCheck1 = document.querySelector('[data-input="0"]');
var channelPlay = [[], [], []];
var recordTimeStampArray = [[], [], []];
var isRecording = false;
var currentRecordChannel;
appStart();
function appStart() {
    document.addEventListener('keydown', readKey);
    btnRecord0.addEventListener('click', pressRecord);
    btnPlay0.addEventListener('click', playChannel);
    btnRecord1.addEventListener('click', pressRecord);
    btnPlay1.addEventListener('click', playChannel);
    btnRecord2.addEventListener('click', pressRecord);
    btnPlay2.addEventListener('click', playChannel);
    btnPlayAll.addEventListener('click', playAll);
}
function pressRecord(e) {
    var recordNumber = this.getAttribute("data-record");
    var recordTimeStamp = e.timeStamp;
    currentRecordChannel = recordNumber;
    if (recordTimeStampArray[recordNumber][0] == undefined && recordTimeStampArray[recordNumber][1] == undefined) {
        //setting start record
        isRecording = true;
        recordTimeStampArray[recordNumber].push(recordTimeStamp);
        recordAnimation(btnNodeRecord[recordNumber]);
    }
    else if (recordTimeStampArray[recordNumber][1] == undefined) {
        //setting stop record      
        isRecording = false;
        recordTimeStampArray[recordNumber].push(recordTimeStamp);
        recordAnimation(btnNodeRecord[recordNumber]);
    }
    else {
        //channel is already filled
        return;
    }
}
function playAll() {
    channelPlay.forEach(function (channel) {
        channel.forEach(function (sound) {
            var timeStart = sound.time - recordTimeStampArray[0];
            setTimeout(function () { return playSound(sound.key); }, timeStart);
        });
    });
    // console.log(channelPlay.length)
    // console.log(channelPlay[0][0].time)
    // for(let i=0;i<=channelPlay.length;i++){
    //     for(let j=0;i<=channelPlay[i].length;i++){
    //         // let timeStart = channelPlay[i][j].time-recordTimeStampArray[0];
    //         // setTimeout(()=>playSound(channelPlay[i][j].key), timeStart)   
    //     }
    // }
}
function playChannel(e) {
    var channelNumber = this.getAttribute("data-play");
    channelPlay[channelNumber].forEach(function (sound) {
        var timeStart = sound.time - recordTimeStampArray[channelNumber][0];
        setTimeout(function () { return playSound(sound.key); }, timeStart);
    });
}
function readKey(e) {
    var key = e.key;
    var time = e.timeStamp;
    playSound(key);
    animationBlock(key);
    if (isRecording) {
        channelPlay[currentRecordChannel].push({ key: key, time: time });
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
// animation functions
function blockAnimation(el) {
    el.style.transform = 'scale(0.95)';
    setTimeout(function () {
        el.style.transform = 'scale(1)';
    }, 10);
}
function recordAnimation(el) {
    el.classList.toggle('pressedRecordButton');
}
function animationBlock(key) {
    switch (key) {
        case 'q':
            blockAnimation(hihatDiv);
            break;
        case 'w':
            blockAnimation(kickDiv);
            break;
        case 'e':
            blockAnimation(snareDiv);
            break;
        case 'r':
            blockAnimation(rideDiv);
            break;
    }
}
