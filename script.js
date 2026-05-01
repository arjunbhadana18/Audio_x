// AUDIO ELEMENT
const audio = document.getElementById("audioPlayer");

// BUTTONS & UI
const playBtn = document.querySelector(".play-main");
const progressBar = document.getElementById("progressBar");
const progress = document.getElementById("progress");

const playerSong = document.getElementById("playerSong");
const playerArtist = document.getElementById("playerArtist");
const playerCover = document.getElementById("playerCover");

// SONG SOURCES
const cards = document.querySelectorAll(".card");
const quickCards = document.querySelectorAll(".quick-card");

let currentSong = "";
let isPlaying = false;


// 🎵 FUNCTION TO PLAY SONG
function playSong(song, title, artist, cover) {

    if (currentSong !== song) {
        audio.src = song;
        currentSong = song;
    }

    audio.play();

    // UPDATE UI
    playerSong.innerText = title;
    playerArtist.innerText = artist || "";
    playerCover.src = cover;

    playBtn.innerText = "⏸";
    isPlaying = true;
}


// ▶ CLICK ON TRENDING CARDS
cards.forEach(card => {
    card.addEventListener("click", () => {

        const song = card.dataset.song;
        const title = card.querySelector("h4").innerText;
        const artist = card.querySelector("p").innerText;
        const cover = card.querySelector("img").src;

        playSong(song, title, artist, cover);
    });
});


// ▶ CLICK ON QUICK CARDS
quickCards.forEach(card => {
    card.addEventListener("click", () => {

        const song = card.dataset.song;
        const title = card.querySelector("span").innerText;
        const cover = card.querySelector("img").src;

        playSong(song, title, "", cover);
    });
});


// ▶ PLAY / PAUSE BUTTON
playBtn.addEventListener("click", () => {

    if (!audio.src) return;

    if (isPlaying) {
        audio.pause();
        playBtn.innerText = "▶";
    } else {
        audio.play();
        playBtn.innerText = "⏸";
    }

    isPlaying = !isPlaying;
});


// ⏱ PROGRESS BAR UPDATE
audio.addEventListener("timeupdate", () => {

    if (audio.duration) {
        const percent = (audio.currentTime / audio.duration) * 100;
        progress.style.width = percent + "%";
    }
});


// 🖱 SEEK ON CLICK
progressBar.addEventListener("click", (e) => {

    const width = progressBar.clientWidth;
    const clickX = e.offsetX;

    if (audio.duration) {
        audio.currentTime = (clickX / width) * audio.duration;
    }
});


// 🔄 RESET WHEN SONG ENDS
audio.addEventListener("ended", () => {
    progress.style.width = "0%";
    playBtn.innerText = "▶";
    isPlaying = false;
});

const volumeSlider = document.getElementById("volumeSlider");

// default volume
audio.volume = 1;

// change volume
volumeSlider.addEventListener("input", () => {
    audio.volume = volumeSlider.value;
});

volumeSlider.addEventListener("input", () => {
  audio.volume = volumeSlider.value;

  const icon = document.querySelector(".player-right span");

  if (audio.volume == 0) icon.textContent = "🔇";
  else if (audio.volume < 0.5) icon.textContent = "🔉";
  else icon.textContent = "🔊";
});