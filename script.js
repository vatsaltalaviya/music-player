console.log("welcome to javascript");
const librarycontainer = document.querySelector(".library-container")
const poster = document.querySelector("#thumbnail")
const playbtn = document.querySelector("#play")
const forward = document.querySelector("#forward")
const backward = document.querySelector("#backward")
const timer = document.querySelector("#timer")
const songtitle = document.querySelector("#track")
const seekSlider = document.getElementById('seekSlider');
const volumeSlider = document.querySelector('.volume-slider');
var currentSong = 0
let audio = new Audio()
var songs = ["8 ASLE.mp3","ANIMAL HUA MAIN.mp3","ANIMAL PEHLE BHI MAIN.mp3","Closer - The Chainsmokers.mp3","DILJIT DOSANJH LALKAARA.mp3","DUA LIPA HOUDINI.mp3","Excuses - AP Dhillon.mp3","Harleys In Hawaii - Katy Perry.mp3","SOFTLY KARAN AUJLA.mp3"];


function SecondstoMinutes(seconds) {
    if (isNaN(seconds) || seconds < 0) {
        return "00:00";
    }

    const minutes = Math.floor(seconds / 60);
    const remainingseconds = Math.floor(seconds % 60);
    console.log(minutes , remainingseconds);
    const formatedminutes = String(minutes).padStart(2, '0');
    const formatedseconds = String(remainingseconds).padStart(2, '0');
    return `${formatedminutes} : ${formatedseconds}`;
}

const playmusic = (track) => {
    audio.src ="./songs/"+track;
    audio.play()
    playbtn.src = "pause.svg"

}
// async function getsong() {
//     let a = await fetch("http://127.0.0.1:5501/songs/");
//     let response = await a.text();
//     let div = document.createElement("div")
//     div.innerHTML = response;
//     let as = div.getElementsByTagName("a")
//     for (let index = 0; index < as.length; index++) {
//         const element = as[index];
//         // console.log(element.href);
//         if (element.href.endsWith(".mp3")) {
//             songs.push(element.href.split("/songs/")[1])
//         }
//     }
//     return songs
// }
function mainfunc() {
    // let songs = await getsong()
    let songUl = document.querySelector(".library-container")
    songs.forEach((e, id) => {
        console.log(e);
        songUl.innerHTML += ` <div class= info id=${id} >
        <img src=./svgs/music-2-fill.svg>
        <div id=songname>
        <h2>${e.replace(".mp3", "")}</h2>
        </div>
        <button><img  src="./svgs/play-line.svg" alt=""></button>
        </div>`

    })

    librarycontainer.addEventListener("click", (e) => {
        currentSong = e.target.id;
        audio.src="./songs/"+songs[currentSong];
        audio.play()
        flag = 1;
        playbtn.innerHTML = "<img  src=./svgs/pause-line.svg >"
        songtitle.innerHTML = songs[currentSong].replace(".mp3", "")
    })
}
var flag = 0;
playbtn.addEventListener("click", function () {
    if (flag == 0) {
        console.log("play")
        playbtn.innerHTML = "<img  src=./svgs/pause-line.svg >"
        audio.play();
        flag = 1
    }
    else {
        playbtn.innerHTML = "<img  src=./svgs/play-line.svg>"
        console.log("pause")
        audio.pause();
        flag = 0
    }
})

// event for forward and backward button
forward.addEventListener("click", function () {
    if (currentSong < songs.length - 1) {
    
        currentSong++;
        playmusic(songs[currentSong])
        songtitle.innerHTML = songs[currentSong].replace(".mp3", "")
        audio.play()
    } 
})
backward.addEventListener("click", function () {
    if (currentSong >= 0) {
       
        currentSong--
        playmusic(songs[currentSong])
        songtitle.innerHTML = songs[currentSong].replace(".mp3", "")
        audio.play()
    } 
})

//event for update the current song time 
audio.addEventListener("timeupdate", function () {
    timer.innerHTML = `${SecondstoMinutes(audio.currentTime)}/${SecondstoMinutes(audio.duration)}`
    const currentTime = audio.currentTime;
  const duration = audio.duration;
  const progress = (currentTime / duration) * 100;
  seekSlider.value = progress;
})
seekSlider.addEventListener('input', function() {
    const seekTime = (audio.duration * (seekSlider.value / 100));
    audio.currentTime = seekTime;
  });
  volumeSlider.addEventListener('input', function() {
    const volumeValue = this.value / 100;
    audio.volume = volumeValue;
});
document.querySelector("#menubtn").addEventListener("click",function(){
    document.querySelector(".left").style.left = "0%";
})
document.querySelector("#close").addEventListener("click",function(){
    document.querySelector(".left").style.left = "-110%";
})

mainfunc()