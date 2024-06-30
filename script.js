//store current song index
let nowMusic = 0;

//select audio source
const music = document.querySelector("#audio");

//select elements to implement behaviours on
const bar = document.querySelector(".bar");
const songName = document.querySelector(".song-name");
const artistName = document.querySelector(".artist-name");
const square = document.querySelector(".square");
const now = document.querySelector(".now");
const period = document.querySelector(".period");
const play = document.querySelector(".play");
const back = document.querySelector(".back");
const next = document.querySelector(".next");

//adding events to the elements
play.addEventListener("click", () => {
  if (play.className.includes(`pause`)) {
    music.play();
  } else {
    music.pause();
  }
  play.classList.toggle("pause");
});

//setup music
const setMusic = (i) => {
  bar.value = 0;
  let song = theMusic[i];
  nowMusic = i;
  music.src = song.path;
  songName.innerHTML = song.name;
  artistName.innerHTML = song.artist;
  square.style.backgroundImage = `url('${song.cover}')`;
  now.innerHTML = "0:00";
  music.addEventListener("loadedmetadata", () => {
    period.innerHTML = formatTime(music.duration);
    bar.max = music.duration;
  });
  music.addEventListener("timeupdate", () => {
    const currentTime = music.currentTime;
    const duration = music.duration;
    const timeLeft = duration - currentTime;
    period.innerHTML = formatTime(timeLeft);
    bar.value = currentTime;
  });
};
setMusic(0);

//format time
const formatTime = (time) => {
  let min = Math.floor(time / 60);
  if (min < 10) {
    min = `0${min}`;
  }
  let sec = Math.floor(time % 60);
  if (sec < 10) {
    sec = `0${sec}`;
  }
  return `${min}:${sec}`;
};

//update time
music.addEventListener("timeupdate", () => {
  const currentTime = music.currentTime;
  now.innerHTML = formatTime(currentTime);
  bar.value = currentTime;
});

//seeking bar
bar.addEventListener("input", () => {
  music.currentTime = bar.value;
});

//to play next song
music.addEventListener("ended", () => {
  if (nowMusic >= theMusic.length - 1) {
    nowMusic = 0;
  } else {
    nowMusic++;
  }
  setMusic(nowMusic);
  playMusic();
});

const playMusic = () => {
  music.play();
  play.classList.remove("pause");
};

//next and previous
next.addEventListener("click", () => {
  if (nowMusic >= theMusic.length - 1) {
    nowMusic = 0;
  } else {
    nowMusic++;
  }
  setMusic(nowMusic);
  playMusic();
});
back.addEventListener("click", () => {
  if (nowMusic <= 0) {
    nowMusic = theMusic.length - 1;
  } else {
    nowMusic--;
  }
  setMusic(nowMusic);
  playMusic();
});
