const songs = [
    {
        title: "Song 1",
        artist: "Artist 1",
        cover: "i1.jpg",   
        file: "Lukrembo - Marshmallow (freetouse.com).mp3"      
    },
    {
        title: "Song 2",
        artist: "Artist 2",
        cover: "i2.jpg",   
        file: "Aylex - City Lights (freetouse.com).mp3"      
    },
    {
        title: "Song 3",
        artist: "Artist 3",
        cover: "i3.jpg",   
        file: "Burgundy - Tell Me (freetouse.com).mp3"      
    },
    {
        title: "Song 4",
        artist: "Artist 4",
        cover: "i4.jpg",   
        file: "Lukrembo - Cloud (freetouse.com).mp3"      
    },
    {
        title: "Song 5",
        artist: "Artist 5",
        cover: "i5.jpg",   
        file: "Sunova - Heroes (freetouse.com).mp3"      
    }
];

let currentSongIndex = 0;
const audio = new Audio();
const playPauseBtn = document.getElementById('playPause');
const prevBtn = document.getElementById('prev');
const nextBtn = document.getElementById('next');
const progress = document.getElementById('progress');
const volumeControl = document.getElementById('volume');
const playlistEl = document.getElementById('playlist');
const coverImg = document.getElementById('cover');
const titleEl = document.getElementById('title');
const artistEl = document.getElementById('artist');
const currentTimeEl = document.getElementById('currentTime');
const durationEl = document.getElementById('duration');

function loadSong(song) {
    titleEl.textContent = song.title;
    artistEl.textContent = song.artist;
    coverImg.src = song.cover;
    audio.src = song.file;
}

function updatePlaylist() {
    playlistEl.innerHTML = '';
    songs.forEach((song, index) => {
        const li = document.createElement('li');
        li.textContent = `${song.title} - ${song.artist}`;
        li.addEventListener('click', () => {
            currentSongIndex = index;
            loadSong(songs[currentSongIndex]);
            playSong();
            updatePlaylist();
        });
        if (index === currentSongIndex) {
            li.classList.add('active');
        }
        playlistEl.appendChild(li);
    });
}

function playSong() {
    audio.play();
    document.getElementById('play-icon').style.display = 'none';
    document.getElementById('pause-icon').style.display = 'inline';
}

function pauseSong() {
    audio.pause();
    document.getElementById('play-icon').style.display = 'inline';
    document.getElementById('pause-icon').style.display = 'none';
}

playPauseBtn.addEventListener('click', () => {
    if (audio.paused) {
        playSong();
    } else {
        pauseSong();
    }
});

nextBtn.addEventListener('click', () => {
    currentSongIndex = (currentSongIndex + 1) % songs.length;
    loadSong(songs[currentSongIndex]);
    playSong();
    updatePlaylist();
});

prevBtn.addEventListener('click', () => {
    currentSongIndex = (currentSongIndex - 1 + songs.length) % songs.length;
    loadSong(songs[currentSongIndex]);
    playSong();
    updatePlaylist();
});

audio.addEventListener('timeupdate', () => {
    const progressPercent = (audio.currentTime / audio.duration) * 100;
    progress.value = progressPercent;

    const minutes = Math.floor(audio.currentTime / 60);
    const seconds = Math.floor(audio.currentTime % 60);
    currentTimeEl.textContent = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;

    if (audio.duration) {
        const durationMinutes = Math.floor(audio.duration / 60);
        const durationSeconds = Math.floor(audio.duration % 60);
        durationEl.textContent = `${durationMinutes}:${durationSeconds < 10 ? '0' : ''}${durationSeconds}`;
    }
});

progress.addEventListener('input', () => {
    audio.currentTime = (progress.value / 100) * audio.duration;
});

volumeControl.addEventListener('input', () => {
    audio.volume = volumeControl.value;
});

audio.addEventListener('ended', () => {
    currentSongIndex = (currentSongIndex + 1) % songs.length;
    loadSong(songs[currentSongIndex]);
    playSong();
    updatePlaylist();
});

loadSong(songs[currentSongIndex]);
updatePlaylist();