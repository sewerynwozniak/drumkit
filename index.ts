const hihat : HTMLAudioElement = document.querySelector('[data-sound="hihat"]');
const kick : HTMLAudioElement = document.querySelector('[data-sound="kick"]');
const snare : HTMLAudioElement = document.querySelector('[data-sound="snare"]');
const ride : HTMLAudioElement = document.querySelector('[data-sound="ride"]');

const hihatDiv : HTMLDivElement = document.querySelector('#hihatDiv');
const kickDiv : HTMLDivElement = document.querySelector('#kickDiv');
const snareDiv : HTMLDivElement = document.querySelector('#snareDiv');
const rideDiv : HTMLDivElement = document.querySelector('#rideDiv');

const btnRecord0 : HTMLButtonElement = document.querySelector('[data-record="0"]');
const btnPlay0 : HTMLButtonElement = document.querySelector('[data-play="0"]');
const btnRecord1 : HTMLButtonElement = document.querySelector('[data-record="1"]');
const btnPlay1 : HTMLButtonElement = document.querySelector('[data-play="1"]');
const btnRecord2 : HTMLButtonElement = document.querySelector('[data-record="2"]');
const btnPlay2 : HTMLButtonElement = document.querySelector('[data-play="2"]');
const btnNodeRecord : NodeList = document.querySelectorAll('.btn--record');
const btnPlayAll : HTMLButtonElement = document.querySelector('.button--playAll');
const inputCheck1 : HTMLInputElement = document.querySelector('[data-input="0"]');

const channelPlay:any[] =[[],[],[]];
const recordTimeStampArray: any[]=[[],[],[]];
let isRecording=false;
let currentRecordChannel;


appStart();
function appStart():void{
    document.addEventListener('keydown', readKey);
    btnRecord0.addEventListener('click', pressRecord);
    btnPlay0.addEventListener('click', playChannel);
    btnRecord1.addEventListener('click', pressRecord);
    btnPlay1.addEventListener('click', playChannel);
    btnRecord2.addEventListener('click', pressRecord);
    btnPlay2.addEventListener('click', playChannel);
    btnPlayAll.addEventListener('click', playAll);
}






function pressRecord(e :MouseEvent):void{
    let recordNumber = this.getAttribute("data-record");  
    const recordTimeStamp = e.timeStamp;
    currentRecordChannel = recordNumber;
    

    if(recordTimeStampArray[recordNumber][0] == undefined && recordTimeStampArray[recordNumber][1] == undefined){
          //setting start record
          isRecording=true;
          recordTimeStampArray[recordNumber].push(recordTimeStamp)
          recordAnimation(btnNodeRecord[recordNumber]);
    }else if(recordTimeStampArray[recordNumber][1] == undefined){
         //setting stop record      
         isRecording=false;
         recordTimeStampArray[recordNumber].push(recordTimeStamp)
         recordAnimation(btnNodeRecord[recordNumber]);
         
    }else{
        //channel is already filled
        return;
    }

}



function playAll(){
    


    channelPlay.forEach((channel)=>{    
        channel.forEach(sound => {
            let timeStart = sound.time-recordTimeStampArray[0];
            setTimeout(()=>playSound(sound.key), timeStart)    
        });   
        
    })

    // console.log(channelPlay.length)
    // console.log(channelPlay[0][0].time)

    // for(let i=0;i<=channelPlay.length;i++){
    //     for(let j=0;i<=channelPlay[i].length;i++){
    //         // let timeStart = channelPlay[i][j].time-recordTimeStampArray[0];
    //         // setTimeout(()=>playSound(channelPlay[i][j].key), timeStart)   
    //     }
    // }

}


function playChannel(e :MouseEvent):void{
    let channelNumber = this.getAttribute("data-play"); 

    channelPlay[channelNumber].forEach((sound)=>{       
        let timeStart = sound.time-recordTimeStampArray[channelNumber][0];
        setTimeout(()=>playSound(sound.key), timeStart)    
    })
}



function readKey(e :KeyboardEvent) :void{
    const key = e.key;
    const time = e.timeStamp;
    
    playSound(key);
    animationBlock(key);

    if(isRecording){
        channelPlay[currentRecordChannel].push({key, time});
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




// animation functions
function blockAnimation(el:HTMLDivElement):void{
el.style.transform = 'scale(0.95)';
setTimeout(()=>{
    el.style.transform = 'scale(1)';
},10)
}

function recordAnimation(el):void{
el.classList.toggle('pressedRecordButton');
}



function animationBlock(key: string):void{

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



