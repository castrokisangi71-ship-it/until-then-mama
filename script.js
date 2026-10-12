
/* =========================================
   UNTIL WE MEET AGAIN ❤️
   STEP ONE — WEBSITE INTERACTIONS
========================================= */


/* =========================================
   ELEMENTS
========================================= */

const startBtn = document.getElementById("startBtn");

const heroSection = document.getElementById("home");
const storySection = document.getElementById("ourStory");

const memoriesBtn = document.getElementById("memoriesBtn");
const memoriesSection = document.getElementById("memories");

const futureBtn = document.getElementById("futureBtn");
const futureSection = document.getElementById("future");

const goodbyeBtn = document.getElementById("goodbyeBtn");
const goodbyeSection = document.getElementById("goodbye");


/* =========================================
   OPEN OUR STORY
========================================= */

if (startBtn && heroSection && storySection) {

    startBtn.addEventListener("click", () => {

        heroSection.style.transition =
            "opacity 1.2s ease, transform 1.2s ease";

        heroSection.style.opacity = "0";
        heroSection.style.transform = "scale(1.04)";

        setTimeout(() => {

            heroSection.style.display = "none";

            storySection.classList.add("show");

            storySection.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });

        }, 1200);

    });

}


/* =========================================
   CONTINUE TO OUR MEMORIES
========================================= */

if (memoriesBtn && memoriesSection) {

    memoriesBtn.addEventListener("click", () => {

        memoriesSection.scrollIntoView({
            behavior: "smooth",
            block: "start"
        });

    });

}


/* =========================================
   CONTINUE TO OUR FUTURE
========================================= */

if (futureBtn && futureSection) {

    futureBtn.addEventListener("click", () => {

        futureSection.scrollIntoView({
            behavior: "smooth",
            block: "start"
        });

    });

}


/* =========================================
   CONTINUE TO OUR GOODBYE
========================================= */

if (goodbyeBtn && goodbyeSection) {

    goodbyeBtn.addEventListener("click", () => {

        goodbyeSection.scrollIntoView({
            behavior: "smooth",
            block: "start"
        });

    });

}


/* =========================================
   SECTION REVEAL
========================================= */

const sections = [
    memoriesSection,
    futureSection,
    goodbyeSection
].filter(section => section !== null);


const revealObserver = new IntersectionObserver(
    (entries) => {

        entries.forEach((entry) => {

            if (entry.isIntersecting) {

                entry.target.classList.add("visible");

            }

        });

    },
    {
        threshold: 0.15
    }
);


sections.forEach((section) => {

    revealObserver.observe(section);

});

/* =========================================
   MEMORY CARD REVEAL
========================================= */

const memoryCards = document.querySelectorAll(".memory-card");


const memoryObserver = new IntersectionObserver(
    (entries) => {

        entries.forEach((entry) => {

            if (entry.isIntersecting) {

                entry.target.classList.add("visible");

                memoryObserver.unobserve(entry.target);

            }

        });

    },
    {
        threshold: 0.15
    }
);


memoryCards.forEach((card) => {

    memoryObserver.observe(card);

});

// =================================
// OUR LITTLE SOUNDTRACK ❤️
// =================================

const audioPlayer = document.getElementById("audio-player");
const songTitle = document.getElementById("song-title");
const songArtist = document.getElementById("song-artist");
const playPauseBtn = document.getElementById("play-pause");
const prevSongBtn = document.getElementById("prev-song");
const nextSongBtn = document.getElementById("next-song");
const musicStatus = document.getElementById("music-status");
const progressBar = document.getElementById("progress-bar");
const currentTimeDisplay = document.getElementById("current-time");
const durationDisplay = document.getElementById("duration");

const playlist = [
    {
        title: "Song One",
        artist: "Our Memories ❤️",
        src: "music/song1.mp3"
    },
    {
        title: "Song Two",
        artist: "Our Memories ❤️",
        src: "music/song2.mp3"
    },
    {
        title: "Song Three",
        artist: "Our Memories ❤️",
        src: "music/song3.mp3"
    },
    {
        title: "Song Four",
        artist: "Our Memories ❤️",
        src: "music/song4.mp3"
    },
    {
        title: "Song Five",
        artist: "Our Memories ❤️",
        src: "music/song5.mp3"
    },
    {
        title: "Song Six",
        artist: "Our Memories ❤️",
        src: "music/song6.mp3"
    }
];

let currentSongIndex = 0;

function loadSong(index) {
    const song = playlist[index];

    audioPlayer.src = song.src;
    songTitle.textContent = song.title;
    songArtist.textContent = song.artist;
    musicStatus.textContent = "Ready when you are ❤️";
    playPauseBtn.textContent = "▶";
}

function playSong() {
    audioPlayer.play()
        .then(() => {
            playPauseBtn.textContent = "⏸";
            musicStatus.textContent = "Playing a little piece of us ❤️";
        })
        .catch(() => {
            musicStatus.textContent =
                "Couldn't play this song. Check its filename and path.";
        });
}

function pauseSong() {
    audioPlayer.pause();
    playPauseBtn.textContent = "▶";
    musicStatus.textContent = "Paused — press play when you're ready.";
    
function formatTime(seconds) {
    if (!Number.isFinite(seconds) || seconds < 0) {
        return "0:00";
    }

    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);

    return `${minutes}:${String(remainingSeconds).padStart(2, "0")}`;
}

// Update the progress bar and song timestamps.
audioPlayer.addEventListener("loadedmetadata", () => {
    durationDisplay.textContent = formatTime(audioPlayer.duration);
    progressBar.value = 0;
    currentTimeDisplay.textContent = "0:00";
});

audioPlayer.addEventListener("timeupdate", () => {
    if (!Number.isFinite(audioPlayer.duration) || audioPlayer.duration <= 0) {
        return;
    }

    progressBar.value =
        (audioPlayer.currentTime / audioPlayer.duration) * 100;

    currentTimeDisplay.textContent = formatTime(audioPlayer.currentTime);
    durationDisplay.textContent = formatTime(audioPlayer.duration);
});

// Allow the listener to jump to another part of the song.
progressBar.addEventListener("input", () => {
    if (Number.isFinite(audioPlayer.duration) && audioPlayer.duration > 0) {
        audioPlayer.currentTime =
            (Number(progressBar.value) / 100) * audioPlayer.duration;
    }
});

}

playPauseBtn.addEventListener("click", () => {
    if (audioPlayer.paused) {
        playSong();
    } else {
        pauseSong();
    }
});

nextSongBtn.addEventListener("click", () => {
    currentSongIndex = (currentSongIndex + 1) % playlist.length;
    loadSong(currentSongIndex);
    playSong();
});

prevSongBtn.addEventListener("click", () => {
    currentSongIndex =
        (currentSongIndex - 1 + playlist.length) % playlist.length;

    loadSong(currentSongIndex);
    playSong();
});

audioPlayer.addEventListener("ended", () => {
    currentSongIndex = (currentSongIndex + 1) % playlist.length;
    loadSong(currentSongIndex);
    playSong();
});

// Load the first song without autoplaying.
loadSong(currentSongIndex);

const galleryVideos = document.querySelectorAll(".video-card video");

galleryVideos.forEach((video) => {
    video.addEventListener("play", () => {
        galleryVideos.forEach((otherVideo) => {
            if (otherVideo !== video) {
                otherVideo.pause();
            }
        });
    });
});

