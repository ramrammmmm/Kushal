window.addEventListener("load", () => {
  startCountdown(); // Always start countdown first
});

function requestNotification() {
  if ("Notification" in window) {
    Notification.requestPermission().then(p => {
      if (p === "granted") alert("✅ You’ll get notified at midnight!");
    });
  }
  document.getElementById("notify-box").style.display = "none";
}

function startCountdown() {
  const countdownEl = document.getElementById("countdown");
  const target = new Date("July 30, 2025 00:00:00").getTime();

  const timer = setInterval(() => {
    const now = new Date().getTime();
    const diff = target - now;

    if (diff <= 0) {
      clearInterval(timer);
      unlockSurprise();
    } else {
      const d = Math.floor(diff / (1000 * 60 * 60 * 24));
      const h = Math.floor((diff / (1000 * 60 * 60)) % 24);
      const m = Math.floor((diff / (1000 * 60)) % 60);
      const s = Math.floor((diff / 1000) % 60);
      countdownEl.innerHTML = `${d}d ${h}h ${m}m ${s}s`;
    }
  }, 1000);
}

function unlockSurprise() {
  document.getElementById("countdown-screen").classList.add("hidden");
  document.getElementById("birthday-card").classList.remove("hidden");

  // 🔊 Try to autoplay music or wait for touch
  const music = document.getElementById("bg-music");
  const tryPlay = () => {
    music.play().then(() => console.log("✅ Music autoplayed."))
      .catch(() => {
        console.log("⚠️ Autoplay blocked. Waiting for click...");
        document.body.addEventListener("click", playOnce);
        document.body.addEventListener("touchstart", playOnce);
      });
  };
  const playOnce = () => {
    music.play();
    document.body.removeEventListener("click", playOnce);
    document.body.removeEventListener("touchstart", playOnce);
  };
  tryPlay();

  // 🎉 Email notification
  emailjs.send("service_3fua1iy", "template_1l5oewa", {
    to_name: "Kushal",
    message: "🎉 Happy Birthday Kushal! Your surprise card is open!,Click the link now 😏
      https://splendorous-beijinho-74ab3e.netlify.app/",
    to_email: "kushal01krish@gmail.com"
  });

  // 🔔 Web Notification
  if ("Notification" in window && Notification.permission === "granted") {
    new Notification("🎉 Happy Birthday Kushal!", {
      body: "Click to see your surprise 🎁",
      icon: "friend.jpg"
    });
  }

  // 🎆 Fireworks
  launchFireworks();
}

function launchFireworks() {
  const canvas = document.getElementById("fireworks");
  if (!canvas) return;
  const ctx = canvas.getContext("2d");
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  function drawFirework() {
    const x = Math.random() * canvas.width;
    const y = Math.random() * canvas.height;
    for (let i = 0; i < 50; i++) {
      const angle = Math.random() * 2 * Math.PI;
      const radius = Math.random() * 100;
      const x1 = x + radius * Math.cos(angle);
      const y1 = y + radius * Math.sin(angle);
      ctx.beginPath();
      ctx.moveTo(x, y);
      ctx.lineTo(x1, y1);
      ctx.strokeStyle = `hsl(${Math.random() * 360}, 100%, 70%)`;
      ctx.stroke();
    }
  }

  setInterval(() => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawFirework();
  }, 700);
}
