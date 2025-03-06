const songs = [
    {title:"songs/Doechii - What It Is.mp3", name:"Doechii - What It Is", photo:"img/doechii.jpg"},
    {title:"songs/bloodline.mp3", name:"Ariana Grande - Bloodline", photo:"img/bloodline.jpg"},
    {title:"songs/Shakira She Wolf.mp3", name:"Shakira - She Wolf", photo:"img/She_Wolf.png"},];

const playBtn = document.querySelector('.playBtn');
const pauseBtn = document.querySelector('.pauseBtn');
const audio = document.querySelector('audio');
const current = document.querySelector('#current-time');
const total = document.querySelector('#total-time');
const songImg = document.querySelector('.song-photo img');
const songName = document.querySelector('#song-title');
const heart = document.querySelector('span')
const thumb = document.querySelector('#range');
const nextBtn = document.querySelector('.nextBtn');
const prevBtn = document.querySelector('.prevBtn');

var songCounter = 0;
var isPlaying = false;

function setSong(n = 0, shouldPlay = false){
    songCounter = (n >= songs.length || n < 0) ? 0 : n;

    const song = songs[songCounter];

    audio.setAttribute('src', song.title);
    audio.setAttribute('type',"audio/mpeg");
    songImg.setAttribute("src", song.photo);
    songName.innerHTML = song.name;
    heart.style.left = "0";
    if(shouldPlay){
        isPlaying = true;
        setPlay();
    }else{
        isPlaying = false;
        playBtn.style.content = "url('playBtn.png')";
    }

}
document.addEventListener('DOMContentLoaded', ()=>{
    setSong();
    audio.addEventListener('loadedmetadata', () => {
        total.innerHTML = formatTime(audio.duration);
    });
});

nextBtn.addEventListener('click', ()=>setSong(songCounter + 1, true));

prevBtn.addEventListener('click',()=>{
    songCounter == 0 ? setSong(songs.length - 1) : setSong(songCounter - 1, true);
});

playBtn.addEventListener('click',playPause);
function playPause(){
    if(isPlaying)
        setPause();
    else
        setPlay();
    isPlaying = !isPlaying;
}
function setPause(){
    playBtn.style.content = "url('playBtn.png')";
    audio.pause();
}
function setPlay(){
    playBtn.style.content = "url('pauseBtn.png')";
    audio.play();
}
audio.addEventListener('timeupdate', ()=>{
    let currentTime = audio.currentTime;
    let totalTime = audio.duration;
    current.innerHTML = formatTime(currentTime);
    total.innerHTML = formatTime(totalTime);

    const progress = (currentTime / totalTime) * 100;
    heart.style.left = `${progress}%`;//fix it
});


//formatting time as mm:ss
function formatTime(time){
    const minutes = Math.floor(time / 60).toString().padStart(2, '0');
    const seconds = Math.floor(time % 60).toString().padStart(2, '0');
    return `${minutes}:${seconds}`;
}
