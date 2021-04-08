var hihat = document.querySelector('[data-sound="hihat"]');
var perc = document.querySelector('[data-sound="perc"]');
var btn = document.querySelector('.btn--play');
var channelPlay = [];
appStart();
function appStart() {
    document.addEventListener('keydown', readKey);
    btn.addEventListener('click', playChannel);
}
function playChannel() {
    console.log('działa');
}
function readKey(e) {
    var key = e.key;
    var time = e.timeStamp;
    // tylko wybrane klawisze mają być pushowane i odtwarzane
    channelPlay.push(key, time);
    console.log(channelPlay);
    switch (key) {
        case 'a':
            hihat.play();
            hihat.currentTime = 0;
            break;
        case 's':
            perc.play();
            perc.currentTime = 0;
            break;
    }
}
