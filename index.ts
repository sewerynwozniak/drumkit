const hihat : HTMLAudioElement = document.querySelector('[data-sound="hihat"]');
const perc : HTMLAudioElement = document.querySelector('[data-sound="perc"]');
const btn : HTMLButtonElement = document.querySelector('.btn--play');
const channelPlay:any[] =[];

appStart();
function appStart():void{
    document.addEventListener('keydown', readKey);
    btn.addEventListener('click', playChannel);
}


function playChannel():void{
    console.log('działa')
}


function readKey(e :KeyboardEvent) :void{
    const key = e.key;
    const time = e.timeStamp;
    // tylko wybrane klawisze mają być pushowane i odtwarzane
    channelPlay.push(key, time);
    console.log(channelPlay)

    switch(key){
        
        case 'a':
            hihat.play();
            hihat.currentTime=0;
            break;
        case 's':
            perc.play();
            perc.currentTime=0;
            break;
    }
  
}