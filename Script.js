const progress = document.getElementById("progress");
const percent = document.getElementById("percent");
const status = document.getElementById("status");
const logs = document.getElementById("logs");
const secretBtn = document.getElementById("secretBtn");
const secret = document.getElementById("secret");

const processBars = [
  document.getElementById("p1"),
  document.getElementById("p2"),
  document.getElementById("p3"),
  document.getElementById("p4"),
  document.getElementById("p5")
];

const processTexts = [
  document.getElementById("p1-text"),
  document.getElementById("p2-text"),
  document.getElementById("p3-text"),
  document.getElementById("p4-text"),
  document.getElementById("p5-text")
];

const processNames = [
  "Initializing system...",
  "Scanning Data...",
  "Analyzing data blocks...",
  "Data encryption...",
  "Finalizing Worm..."
];

let currentProcess = 0;
let processProgress = 0;
let finished = false;

function randomHex() {
  const chars = "0123456789ABCDEF";
  let result = "0x";

  for (let i = 0; i < 24; i++) {
    result += chars[Math.floor(Math.random() * 16)];
  }

  return result;
}

function addLog(message) {
  const line = document.createElement("div");
  line.textContent = message;
  logs.appendChild(line);

  while (logs.children.length > 8) {
    logs.removeChild(logs.firstElementChild);
  }
}

function updateDisplay() {
  // Reset semua bar dahulu
  processBars.forEach((bar, i) => {
    if (!bar) return;

    let amount = 0;

    if (i < currentProcess) {
      amount = 100;
    } else if (i === currentProcess) {
      amount = processProgress;
    }

    bar.style.width = amount + "%";

    if (processTexts[i]) {
      processTexts[i].textContent = amount + "%";
    }
  });

  // Progress keseluruhan: 5 proses
  const overall = Math.floor(
    ((currentProcess + processProgress / 100) / 5) * 100
  );

  if (progress) {
    progress.style.width = overall + "%";
  }

  if (percent) {
    percent.textContent = "Loading... " + overall + "%";
  }

  if (status) {
    status.textContent = finished
      ? "encryp COMPLETE"
      : processNames[currentProcess];
  }
}

function finishSimulation() {
  finished = true;

  if (progress) progress.style.width = "100%";
  if (percent) percent.textContent = "COMPLETE · 100%";
  if (status) status.textContent = " bayar data anda seharga 1,31 BTC.";

  if (secretBtn) secretBtn.hidden = false;

  addLog("[System] enkripsi completed.");
  addLog("[WARNING]  data accessed !.");
}

function runStep() {
  if (finished) return;

  processProgress += 2;

  if (processProgress > 100) {
    processProgress = 100;
  }

  updateDisplay();

  if (processProgress % 10 === 0) {
    addLog("[DATA] " + randomHex());
  }

  if (processProgress >= 100) {
    addLog("[DONE] " + processNames[currentProcess]);

    currentProcess++;
    processProgress = 0;

    if (currentProcess >= 5) {
      finishSimulation();
      return;
    }

    addLog("[SYSTEM] Preparing next process...");
  }
}

// Pastikan elemen ditemukan sebelum memulai
if (
  progress &&
  percent &&
  status &&
  logs &&
  secretBtn &&
  secret &&
  processBars.every(Boolean) &&
  processTexts.every(Boolean)
) {
  logs.textContent = "";

  secretBtn.hidden = true;
  secret.hidden = true;

  addLog("[system] Starting 01010100...");
  updateDisplay();

  // 50 langkah per proses × 5 proses.
  // Interval 100 ms = sekitar 25 detik.
  const timer = setInterval(() => {
    runStep();

    if (finished) {
      clearInterval(timer);
    }
  }, 100);

  secretBtn.addEventListener("click", () => {
    secret.hidden = false;
    secretBtn.textContent = "PRANK REVEALED!";
    secretBtn.disabled = true;
  });
} else {
  console.error(
    "Elemen tidak ditemukan. Periksa ID HTML p1–p5, progress, percent, status, logs, secretBtn, dan secret."
  );
}
// 24-hour countdown for visual demo only
let remainingSeconds = 24 * 60 * 60;
const timerDisplay = document.getElementById("timer");

function updateTimer() {
  if (!timerDisplay) return;

  const hours = Math.floor(remainingSeconds / 3600);
  const minutes = Math.floor((remainingSeconds % 3600) / 60);
  const seconds = remainingSeconds % 60;

  timerDisplay.textContent =
    String(hours).padStart(2, "0") + ":" +
    String(minutes).padStart(2, "0") + ":" +
    String(seconds).padStart(2, "0");

  if (remainingSeconds > 0) {
    remainingSeconds--;
  } else {
    timerDisplay.textContent = "00:00:00";
  }
}

updateTimer();
setInterval(updateTimer, 1000);
// Repeating beep sound for visual demo
let soundOn = true;
let audioContext = null;

const soundBtn = document.getElementById("soundBtn");

function playBeep() {
  if (!soundOn) return;

  try {
    audioContext ??= new (
      window.AudioContext || window.webkitAudioContext
    )();

    if (audioContext.state === "suspended") {
      audioContext.resume();
    }

    const oscillator = audioContext.createOscillator();
    const gain = audioContext.createGain();

    oscillator.type = "square";
    oscillator.frequency.value = 800;
    gain.gain.value = 0.035;

    oscillator.connect(gain);
    gain.connect(audioContext.destination);

    oscillator.start();
    oscillator.stop(audioContext.currentTime + 0.1);
  } catch (error) {
    console.log("Audio tidak tersedia:", error);
  }
}

// Repeat every 0,5 seconds
const soundInterval = setInterval(playBeep, 100);

soundBtn?.addEventListener("click", () => {
  soundOn = !soundOn;
  soundBtn.textContent = soundOn
    ? "🔊 SOUND: ON"
    : "🔇 SOUND: OFF";

  if (soundOn) playBeep();
});
