const ids = {
  greeting: document.getElementById('greeting'),
  weekday: document.getElementById('weekday'),
  hours: document.getElementById('hours'),
  minutes: document.getElementById('minutes'),
  ampm: document.getElementById('ampm'),
  month: document.getElementById('month'),
  day: document.getElementById('day'),
  year: document.getElementById('year'),
  progressBar: document.getElementById('progress-bar'),
  progressLabel: document.getElementById('progress-label')
};

const pad = (value) => String(value).padStart(2, '0');

function updateClock() {
  const now = new Date();
  const hours24 = now.getHours();
  const minutes = now.getMinutes();
  const hours12 = hours24 % 12 || 12;

  ids.hours.textContent = pad(hours12);
  ids.minutes.textContent = pad(minutes);
  ids.ampm.textContent = hours24 >= 12 ? 'PM' : 'AM';

  ids.weekday.textContent = now
    .toLocaleDateString(undefined, { weekday: 'short' })
    .toUpperCase();

  ids.month.textContent = now
    .toLocaleDateString(undefined, { month: 'short' })
    .toUpperCase();
  ids.day.textContent = pad(now.getDate());
  ids.year.textContent = now.getFullYear();

  if (hours24 < 12) ids.greeting.textContent = 'Good morning';
  else if (hours24 < 18) ids.greeting.textContent = 'Good afternoon';
  else ids.greeting.textContent = 'Good evening';

  const totalSeconds = hours24 * 3600 + minutes * 60 + now.getSeconds();
  const dayPercent = (totalSeconds / 86400) * 100;
  ids.progressBar.style.width = `${dayPercent.toFixed(2)}%`;
  ids.progressLabel.textContent = `${Math.round(dayPercent)}%`;
}

updateClock();
setInterval(updateClock, 1000);
const tick = document.getElementById("tickSound");
const track = document.getElementById("vinylTrack");
const vinyl = document.querySelector(".vinyl");
const toneArm = document.querySelector(".tone-arm");

let isMusicPlaying = false;

window.addEventListener("load", () => {
  tick.volume = 0.3;
  tick.play().catch(() => {
    console.log("Autoplay blocked until interaction");
  });
});

function toggleAudio() {
  if (!isMusicPlaying) {
    tick.pause();
    tick.currentTime = 0;

    track.play();
    vinyl.classList.add("playing");

    isMusicPlaying = true;
  } else {
    track.pause();
    track.currentTime = 0;

    tick.play();
    vinyl.classList.remove("playing");

    isMusicPlaying = false;
  }
}

vinyl.addEventListener("click", toggleAudio);
toneArm.addEventListener("click", toggleAudio);
