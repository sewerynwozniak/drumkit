const hihat : HTMLAudioElement = document.querySelector('[data-sound="hihat"]');
const kick : HTMLAudioElement = document.querySelector('[data-sound="kick"]');
const snare : HTMLAudioElement = document.querySelector('[data-sound="snare"]');
const ride : HTMLAudioElement = document.querySelector('[data-sound="ride"]');

const hihatDiv : HTMLDivElement = document.querySelector('#hihatDiv');
const kickDiv : HTMLDivElement = document.querySelector('#kickDiv');
const snareDiv : HTMLDivElement = document.querySelector('#snareDiv');
const rideDiv : HTMLDivElement = document.querySelector('#rideDiv');

const btnRecord : HTMLButtonElement = document.querySelector('.btn--record');
const btnPlay : HTMLButtonElement = document.querySelector('.btn--play');
const channelPlay:any[] =[];
const recordTimeStamp:any[]=[];

appStart();
function appStart():void{
    document.addEventListener('keydown', readKey);
    btnRecord.addEventListener('click', record);
    btnPlay.addEventListener('click', playChannel);
}


function record(e :KeyboardEvent):void{
const singleRecordTimeStamp = e.timeStamp;
recordTimeStamp.push({'ch1': singleRecordTimeStamp});
}


function playChannel():void{
    console.log(recordTimeStamp[0].ch1)
    console.log(channelPlay)
    channelPlay.forEach((sound)=>{
        let time = recordTimeStamp[0].ch1 - sound.time;
        setTimeout(()=>playSound(sound.key), time) 
    })
}


function readKey(e :KeyboardEvent) :void{
    const key = e.key;
    const time = e.timeStamp;
    // tylko wybrane klawisze mają być pushowane i odtwarzane
    channelPlay.push({key, time});
   
    playSound(key);
    animationBlock(key)
}


function addAnimation(el:HTMLDivElement):void{
el.style.transform = 'scale(0.95)';
setTimeout(()=>{
    el.style.transform = 'scale(1)';
},10)
}


function animationBlock(key: string):void{

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

function playSound(key: string):void {
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
