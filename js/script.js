const progressBar = document.getElementById("progress-bar");
const prev = document.getElementById("prev");
const next = document.getElementById("next");
const playSong = document.getElementById("play");
const songTitle = document.getElementById("song-title");
const detailsIcon = document.getElementById("details-icon");
const currentTime = document.getElementById("currentTime");
const fullTime = document.getElementById("full-time");
const songInfo = document.getElementById("song-info");
const songName = document.getElementById("name");
const time = document.getElementById("time");
const size = document.getElementById("size");
const date = document.getElementById("date");
const img = document.querySelector('img')
const volIncrease = document.getElementById('vol-plus')
const volDecrease = document.getElementById('vol-minus')
const audio = document.getElementById('audio')

const file = document.getElementById("file");
file.addEventListener("change", handleAudio, false);
function handleAudio(e) {
  let files = e.target.files;
  let currentSong = 0;
  function playSongs() {
    audio.src = URL.createObjectURL(files[currentSong]);
    playSong.innerHTML = '<i class="fas fa-pause"></i>';//upload song change play button icon
    img.classList.add('img')// upload song auto rotate img icon
    // song info
    songTitle.innerText = files[currentSong].name;
    songName.innerText = files[currentSong].name;
    let num = files[currentSong].size / 1024 / 1024;
    size.innerText = num.toFixed(2) + "MB";
    date.innerText = files[currentSong].lastModifiedDate;
  }
  playSongs();
  // Song play handler
  playSong.addEventListener("click", () => {
    if (audio.paused) {
      audio.play();
      playSong.innerHTML = '<i class="fas fa-pause"></i>';
      img.classList.add('img')
    }else {
      audio.pause();
      playSong.innerHTML = '<i class="fas fa-play"></i>';
      img.classList.remove('img')
    }
  });
  audio.addEventListener("timeupdate", () => {
    // progress bar
    let position = audio.currentTime / audio.duration;
    progressBar.style.width = position * 100 + "%";
    // song running time
    let min = Math.floor(Math.round(audio.currentTime) / 60);
    let sec = Math.round(audio.currentTime) % 60;
    min = min < 10 ? "0" + min : min;
    sec = sec < 10 ? "0" + sec : sec;
    currentTime.innerText = min + ":" + sec; // song current time
    

    // song original time
    let mins = Math.floor(Math.round(audio.duration) / 60);
    let secs = Math.round(audio.duration) % 60;
    mins = mins < 10 ? "0" + mins : mins;
    secs = secs < 10 ? "0" + secs : secs;
    fullTime.innerText = "/" + mins + ":" + secs; // song original time
    time.innerText = mins + ":" + secs; // play song time info
  });
  // Song details panel show/hide handler
  detailsIcon.addEventListener("click", () => {
    songInfo.classList.toggle("show");
  });
  // song ended then auto play
  audio.addEventListener('ended',()=>{
    currentSong++;
    if (currentSong > files.length - 1) {
      currentSong = 0;
    }
    playSongs();
  })
  // next song
  next.addEventListener("click", () => {
    currentSong++;
    if (currentSong > files.length - 1) {
      currentSong = 0;
    }
    playSongs();
    playSong.innerHTML = '<i class="fas fa-pause"></i>';
  });
  // prev song
  prev.addEventListener("click", () => {
    if (currentSong > 0) {
      currentSong--;
    }
    playSongs();
    playSong.innerHTML = '<i class="fas fa-pause"></i>';
  });
  // volume up
  volIncrease.addEventListener('click',()=>{
    if(audio.volume < 1){
      audio.volume += 0.1
    }
  })
  // volume down
  volDecrease.addEventListener('click',()=>{
    if(audio.volume > 1){
      audio.volume -= 0.1
    }
  })

}


